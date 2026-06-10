import Link from "next/link";

const iconStyle = { width: "18px", height: "18px", verticalAlign: "middle" };

function HomeIcon() { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={iconStyle}><path d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79V20Z"/></svg>; }
function ArchiveIcon() { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={iconStyle}><path d="M3 10h18v10.004c0 .55-.446.996-.996.996H3.996A.996.996 0 0 1 3 20.004V10Zm0-6h18v4H3V4Z"/></svg>; }
function FolderIcon() { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={iconStyle}><path d="M12.414 5H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2Z"/></svg>; }
function TagIcon() { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={iconStyle}><path d="M10.9 2.1a1 1 0 0 0-.66-.1L3.01 3.44A1 1 0 0 0 2.1 4.4l1.56 7.45a1 1 0 0 0 .29.55l8.96 9.54a1 1 0 0 0 1.43.01l6.9-7.1a1 1 0 0 0-.02-1.42L11.8 2.58a1 1 0 0 0-.9-.48ZM5.7 6.3a1.5 1.5 0 1 1 2.12-2.12A1.5 1.5 0 0 1 5.7 6.3Z"/></svg>; }
function EditIcon() { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={iconStyle}><path d="M15.728 9.686a1 1 0 0 0-1.414-1.414l-4.242 4.242a1 1 0 0 0 1.414 1.414l4.242-4.242Z"/><path d="M16.788 2.322a1 1 0 0 1 .704.328l3.858 3.858a1 1 0 0 1-.002 1.416l-3.869 3.87a1 1 0 0 1-.704.293H11.48l3.289-3.288a2 2 0 0 0-1.356-3.414H7.688l3.166-3.166A1 1 0 0 1 11.586 2h4.62l.582.322Z" opacity=".5"/><path d="M2 19.778V21a1 1 0 0 0 .92.998l4.073.022A1 1 0 0 0 8 21.02v-.004l.005-3.534a1 1 0 0 0-.293-.707L3.434 12.5a1 1 0 0 0-1.414 1.414L5.12 17.01a1 1 0 0 1 0 1.414l-2.12 2.121a1 1 0 0 1-.707.293H2.097A1 1 0 0 1 2 19.78Z"/></svg>; }

export default function Sidebar() {
  const navItems = [
    { href: "/", icon: HomeIcon, title: "首页" },
    { href: "/archives/", icon: ArchiveIcon, title: "归档" },
    { href: "/categories/", icon: FolderIcon, title: "分类" },
    { href: "/tags/", icon: TagIcon, title: "标签" },
    { href: "/admin", icon: EditIcon, title: "写文章" },
  ];

  const socialItems = [
    { href: "https://github.com/mengling02", icon: "github", title: "GitHub", color: "#6e5494" },
    { href: "https://music.163.com/#/user/home?id=547325865", icon: "music", title: "网易云音乐", color: "#C20C0C" },
    { href: "https://space.bilibili.com/401797301", icon: "bilibili", title: "哔哩哔哩", color: "#FF8EB3" },
    { href: "mailto:1770043597@qq.com", icon: "mail", title: "邮箱", color: "#8E71C1" },
  ];

  return (
    <aside className="sidebar">
      <a href="/" className="site-author-avatar">
        <img src="/images/avatar.jpg" alt="南有乔木" className="site-avatar" />
      </a>
      <div className="site-author-name">
        <a href="/about/">南有乔木</a>
      </div>
      <div className="site-name">上天一定会眷顾努力的孩子</div>
      <div className="site-description">
        平平淡淡，普普通通，为了自己的美好生活而努力。
        是一只对生活与未来怀揣着梦想的程序猿，也是一枚想要收到果壳录取通知书的准研究生
      </div>

      {/* Navigation buttons */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} title={item.title} className="hty-icon-button">
              <Icon />
            </Link>
          );
        })}
      </nav>

      <hr style={{ width: "100%", border: "none", borderTop: "1px solid rgba(0,0,0,0.06)", margin: "0.5rem 0" }} />

      {/* Social links */}
      <nav className="sidebar-nav">
        {socialItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            title={item.title}
            target="_blank"
            rel="noopener noreferrer"
            className="hty-icon-button"
            style={{ color: item.color }}
          >
            {item.icon === "github" && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
                <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.025 2.75-1.025.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10Z"/>
              </svg>
            )}
            {item.icon === "music" && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm4.5 14h-1.5V9.5l-6 1.25v4.75h-1.5V8.5l7.5-1.75v9.25Z"/>
              </svg>
            )}
            {item.icon === "bilibili" && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
                <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.267.573-.4.92-.4.347 0 .653.133.92.4L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.267.573-.4.92-.4.347 0 .662.133.947.4l.027.027c.267.267.4.569.4.907 0 .338-.133.64-.4.907l-1.174 1.12ZM7.087 12.28a.872.872 0 0 0-.64.267.872.872 0 0 0-.267.64c0 .249.089.462.267.64s.391.267.64.267.462-.089.64-.267.267-.391.267-.64-.089-.462-.267-.64a.872.872 0 0 0-.64-.267Zm9.826 0a.872.872 0 0 0-.64.267.872.872 0 0 0-.267.64c0 .249.089.462.267.64s.391.267.64.267.462-.089.64-.267.267-.391.267-.64-.089-.462-.267-.64a.872.872 0 0 0-.64-.267Z"/>
              </svg>
            )}
            {item.icon === "mail" && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
                <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm9.06 8.683L5.648 6.238 4.353 7.762l7.72 6.555 7.581-6.56-1.308-1.513-6.285 5.439Z"/>
              </svg>
            )}
          </a>
        ))}
      </nav>

      <div style={{ marginTop: "auto", fontSize: "0.7rem", color: "#999", paddingTop: "1rem" }}>
        <a href="/" style={{ color: "inherit", textDecoration: "none" }}>南有乔木</a>
      </div>
    </aside>
  );
}
