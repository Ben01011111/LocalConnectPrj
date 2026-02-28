export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,800;1,9..144,300&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #F5F2EC; --surface: #FFFDF8; --surface2: #F0EDE5;
    --border: #E2DDD3; --text: #1A1714; --muted: #7A6F60;
    --accent: #2D5F3F; --accent-l: #EAF2EC;
    --amber: #C8873A; --amber-l: #FDF3E7;
    --danger: #C0392B; --info: #2563EB; --info-l: #EFF6FF;
    --r: 12px; --rs: 8px;
    --shadow: 0 2px 12px rgba(26,23,20,.07);
    --shadow-md: 0 4px 24px rgba(26,23,20,.11);
  }
  body { font-family:'DM Sans',sans-serif; background:var(--bg); color:var(--text); min-height:100vh; }
  ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:var(--bg)} ::-webkit-scrollbar-thumb{background:var(--border);border-radius:99px}
  input,select,textarea{font-family:'DM Sans',sans-serif;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
  @keyframes toastIn{from{opacity:0;transform:translateY(60px)}to{opacity:1;transform:translateY(0)}}
  @keyframes toastOut{to{opacity:0;transform:translateY(60px)}}
  .fade-up{animation:fadeUp .3s ease both}
  .fade-up-1{animation:fadeUp .35s .05s ease both}
  .fade-up-2{animation:fadeUp .35s .1s ease both}
  .fade-up-3{animation:fadeUp .35s .15s ease both}
  .fade-up-4{animation:fadeUp .35s .2s ease both}
`;
