# 博客部署脚本
# 用法: 在 PowerShell 中运行此脚本
# 前置条件: Git 已安装并配置

param(
  [string]$CommitMessage = "feat: 更新博客内容"
)

$RepoPath = Get-Location
Write-Host "=== 博客部署 ===" -ForegroundColor Cyan

# 检查 Git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Host "❌ 未安装 Git，请先安装 Git: https://git-scm.com" -ForegroundColor Red
  exit 1
}

# 检查是否有未提交的更改
$Status = git status --porcelain
if (-not $Status) {
  Write-Host "✅ 没有新的更改需要提交" -ForegroundColor Green
  $HasChanges = $false
} else {
  Write-Host "📝 发现以下更改:" -ForegroundColor Yellow
  Write-Host $Status
  $HasChanges = $true
}

if ($HasChanges) {
  # 添加所有文件
  git add -A
  Write-Host "📦 暂存更改完成" -ForegroundColor Green

  # 提交
  git commit -m $CommitMessage
  Write-Host "💾 提交完成" -ForegroundColor Green

  # 推送到 GitHub
  git push origin main
  Write-Host "🚀 推送完成！GitHub Actions 将自动部署到 Pages" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== 部署流程已触发 ===" -ForegroundColor Cyan
Write-Host "博客地址: https://mengling02.github.io" -ForegroundColor Cyan
Write-Host "管理后台: https://mengling02.github.io/admin.html" -ForegroundColor Cyan
Write-Host ""

# 启动本地管理服务器（可选）
$Response = Read-Host "是否启动本地管理服务器？(y/n)"
if ($Response -eq "y") {
  Write-Host "启动本地管理服务器: http://localhost:3000" -ForegroundColor Cyan
  Write-Host "管理后台: http://localhost:3000/admin.html" -ForegroundColor Cyan
  node server.js
}
