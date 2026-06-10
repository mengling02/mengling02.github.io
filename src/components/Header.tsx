export default function MobileHeader() {
  return (
    <>
      <div className="mobile-header-bar">
        <a href="/" className="mobile-logo">南有乔木</a>
        <a href="/admin" className="mobile-write">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        </a>
      </div>
      <style>{`
        .mobile-header-bar { display: none; }
        @media screen and (max-width: 768px) {
          .mobile-header-bar {
            display: flex; align-items: center; justify-content: space-between;
            position: sticky; top: 0; z-index: 100;
            background: rgba(255,255,255,0.9); backdrop-filter: blur(10px);
            padding: 0.8rem 1rem; border-bottom: 1px solid #eee;
          }
          .mobile-logo { font-weight: 700; font-size: 1rem; color: #333; text-decoration: none; }
          .mobile-write { color: var(--hty-primary-color); }
        }
      `}</style>
    </>
  );
}
