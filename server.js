const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const baseDir = __dirname;
const port = 18080;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
};

// Helper: read request body as JSON
function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try { resolve(JSON.parse(body)); }
      catch (e) { reject(new Error('Invalid JSON')); }
    });
  });
}

// Helper: send JSON response
function sendJson(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

// Helper: parse front-matter from markdown
function parseFrontMatter(text) {
  const match = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: text };

  const meta = {};
  const fm = match[1];
  // Parse simple YAML key: value lines
  fm.split('\n').forEach(line => {
    const kv = line.match(/^\s*(\w+)\s*:\s*(.+)$/);
    if (kv) {
      let val = kv[2].trim();
      // Handle arrays: [a, b, c]
      if (val.startsWith('[') && val.endsWith(']')) {
        val = val.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
      } else {
        val = val.replace(/^["']|["']$/g, '');
      }
      meta[kv[1]] = val;
    }
  });
  return { meta, body: match[2].trim() };
}

// Get all posts from _posts directory
function getAllPosts() {
  const postsDir = path.join(baseDir, '_posts');
  if (!fs.existsSync(postsDir)) return [];

  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  return files.map(f => {
    const fullPath = path.join(postsDir, f);
    const content = fs.readFileSync(fullPath, 'utf-8');
    const { meta } = parseFrontMatter(content);
    const slug = f.replace(/\.md$/, '');
    const stats = fs.statSync(fullPath);
    return {
      slug,
      title: meta.title || slug,
      tags: Array.isArray(meta.tags) ? meta.tags : (meta.tags ? meta.tags.split(',').map(t => t.trim()) : []),
      date: meta.date || stats.mtime.toISOString().split('T')[0],
      excerpt: content.replace(/^---[\s\S]*?---\s*\n/, '').slice(0, 200).replace(/\n/g, ' ') + '...'
    };
  }).sort((a, b) => b.date.localeCompare(a.date));
}

http.createServer(async (req, res) => {
  let decodedUrl = decodeURI(req.url);
  const parsed = url.parse(decodedUrl);
  const pathname = parsed.pathname;

  // === API Routes ===
  if (pathname === '/api/posts' && req.method === 'GET') {
    const posts = getAllPosts();
    sendJson(res, 200, posts);
    return;
  }

  if (pathname === '/api/posts' && req.method === 'POST') {
    try {
      const data = await readJsonBody(req);
      let title = data.title || 'untitled';
      const tags = data.tags || [];
      const content = data.content || '';
      const slug = data.slug || title.toLowerCase()
        .replace(/[^\w\s\u4e00-\u9fff-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .trim() || 'post-' + Date.now();

      const dateStr = new Date().toISOString().split('T')[0];
      const tagStr = Array.isArray(tags) ? '[' + tags.map(t => '"' + t + '"').join(', ') + ']' : '[]';
      const frontMatter = '---\ntitle: "' + title + '"\ndate: ' + dateStr + '\ntags: ' + tagStr + '\n---\n\n';
      const fileContent = frontMatter + content;
      const filePath = path.join(baseDir, '_posts', slug + '.md');

      // Check if already exists
      const isUpdate = fs.existsSync(filePath);
      fs.writeFileSync(filePath, fileContent, 'utf-8');

      sendJson(res, isUpdate ? 200 : 201, {
        slug,
        title,
        tags: Array.isArray(tags) ? tags : [],
        date: dateStr,
        message: isUpdate ? '文章已更新' : '文章已发布'
      });
    } catch (e) {
      sendJson(res, 400, { error: e.message });
    }
    return;
  }

  // DELETE /api/posts/:slug
  const deleteMatch = pathname.match(/^\/api\/posts\/(.+)$/);
  if (deleteMatch && req.method === 'DELETE') {
    const slug = deleteMatch[1];
    const filePath = path.join(baseDir, '_posts', slug + '.md');
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      sendJson(res, 200, { message: '文章已删除', slug });
    } else {
      sendJson(res, 404, { error: '���²�����' });
    }
    return;
  }

  // GET /api/posts/:slug
  if (deleteMatch && req.method === 'GET') {
    const slug = deleteMatch[1];
    const filePath = path.join(baseDir, '_posts', slug + '.md');
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const { meta, body } = parseFrontMatter(content);
      sendJson(res, 200, {
        slug,
        title: meta.title || slug,
        tags: Array.isArray(meta.tags) ? meta.tags : (meta.tags ? meta.tags.split(',').map(t => t.trim()) : []),
        date: meta.date || '',
        body
      });
    } else {
      sendJson(res, 404, { error: '���²�����' });
    }
    return;
  }

  // === Static files ===
  let filePath = path.join(baseDir, pathname === '/' ? 'index.html' : pathname);
  let ext = path.extname(filePath).toLowerCase();
  if (!ext) {
    filePath = path.join(filePath, 'index.html');
    ext = '.html';
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<!DOCTYPE html><html><body style="font-family:sans-serif;padding:2rem"><h2>404</h2><p>页面未找到</p></body></html>');
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, () => {
  console.log('Server running at http://localhost:' + port);
});
