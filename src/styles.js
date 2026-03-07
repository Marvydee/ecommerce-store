const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Archivo:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream:   #f5f0e8;
    --cream2:  #ede8df;
    --ink:     #0f0e0c;
    --ink2:    #2a2825;
    --muted:   #9a9187;
    --border:  #d6cfc4;
    --accent:  #c8102e;
    --gold:    #b8962e;
    --white:   #ffffff;
    --serif:   'Cormorant Garamond', serif;
    --sans:    'Archivo', sans-serif;
  }

  html { scroll-behavior: smooth; }
  body {
    font-family: var(--sans);
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
  }

  /* ── TOPBAR ── */
  .topbar {
    background: var(--ink);
    color: var(--cream);
    text-align: center;
    padding: 0.55rem;
    font-size: 0.72rem;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  /* ── NAV ── */
  nav {
    background: var(--cream);
    border-bottom: 1px solid var(--border);
    padding: 1.25rem 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky; top: 0; z-index: 50;
  }
  .nav-brand {
    font-family: var(--serif);
    font-size: 1.9rem;
    font-weight: 600;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--ink);
  }
  .nav-brand span { color: var(--accent); }
  .nav-right { display: flex; align-items: center; gap: 1.5rem; }
  .cart-btn {
    display: flex; align-items: center; gap: 0.5rem;
    background: var(--ink);
    color: var(--cream);
    border: none;
    padding: 0.6rem 1.25rem;
    font-family: var(--sans);
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s;
    position: relative;
  }
  .cart-btn:hover { background: var(--ink2); }
  .cart-badge {
    position: absolute; top: -6px; right: -6px;
    background: var(--accent);
    color: white;
    width: 18px; height: 18px;
    border-radius: 50%;
    font-size: 0.65rem;
    font-weight: 600;
    display: flex; align-items: center; justify-content: center;
  }

  /* ── LAYOUT ── */
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 3rem;
  }

  /* ── FILTER BAR ── */
  .filter-bar {
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 3rem;
  }
  .filter-label {
    display: flex; align-items: center; gap: 0.4rem;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: var(--muted);
    margin-right: 0.5rem;
  }
  .filter-chip {
    border: 1px solid var(--border);
    background: none;
    padding: 0.4rem 1rem;
    font-family: var(--sans);
    font-size: 0.75rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--muted);
    cursor: pointer;
    transition: all 0.15s;
  }
  .filter-chip:hover { border-color: var(--ink); color: var(--ink); }
  .filter-chip.active {
    background: var(--ink);
    color: var(--cream);
    border-color: var(--ink);
  }

  /* ── SECTION HEADING ── */
  .section-heading {
    margin-bottom: 2.5rem;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
  .section-heading h2 {
    font-family: var(--serif);
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 300;
    letter-spacing: 1px;
    line-height: 1.1;
  }
  .section-heading h2 em { font-style: italic; color: var(--muted); }
  .count-tag {
    font-size: 0.75rem;
    color: var(--muted);
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  /* ── PRODUCT GRID ── */
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 2px; /* editorial tight gap */
    margin-bottom: 6rem;
  }

  /* ── PRODUCT CARD ── */
  .product-card {
    background: var(--white);
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease;
    animation: fadeUp 0.4s ease both;
  }
  .product-card:hover { transform: translateY(-4px); }
  .product-card:hover .card-overlay { opacity: 1; }
  .product-card:hover .card-img { transform: scale(1.04); }

  /* Staggered animation delays so cards appear one by one */
  .product-card:nth-child(1)  { animation-delay: 0.05s; }
  .product-card:nth-child(2)  { animation-delay: 0.10s; }
  .product-card:nth-child(3)  { animation-delay: 0.15s; }
  .product-card:nth-child(4)  { animation-delay: 0.20s; }
  .product-card:nth-child(5)  { animation-delay: 0.25s; }
  .product-card:nth-child(6)  { animation-delay: 0.30s; }
  .product-card:nth-child(7)  { animation-delay: 0.35s; }
  .product-card:nth-child(8)  { animation-delay: 0.40s; }

  .card-img-wrap {
    aspect-ratio: 3/4;
    overflow: hidden;
    background: var(--cream2);
    display: flex; align-items: center; justify-content: center;
    padding: 2rem;
  }
  .card-img {
    width: 100%; height: 100%;
    object-fit: contain;
    transition: transform 0.5s ease;
  }

  /* Quick-add overlay that appears on hover */
  .card-overlay {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    background: var(--ink);
    color: var(--cream);
    padding: 0.85rem;
    opacity: 0;
    transition: opacity 0.2s;
    display: flex; align-items: center; justify-content: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    /* sits above the body area, only over image */
    top: auto;
  }
  .card-body { padding: 1rem 1.25rem 1.25rem; }

  .card-category {
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--muted);
    margin-bottom: 0.3rem;
  }
  .card-title {
    font-family: var(--serif);
    font-size: 1.05rem;
    font-weight: 400;
    line-height: 1.35;
    margin-bottom: 0.6rem;
    /* clamp to 2 lines */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card-price {
    font-family: var(--serif);
    font-size: 1.3rem;
    font-weight: 600;
  }
  .card-rating {
    display: flex; align-items: center; gap: 0.25rem;
    font-size: 0.72rem; color: var(--muted);
  }
  .card-rating svg { color: var(--gold); }

  /* wishlist button on card */
  .wishlist-btn {
    position: absolute; top: 0.75rem; right: 0.75rem;
    background: white;
    border: 1px solid var(--border);
    width: 32px; height: 32px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s;
    color: var(--muted);
  }
  .product-card:hover .wishlist-btn { opacity: 1; }
  .wishlist-btn.wishlisted { opacity: 1; color: var(--accent); border-color: var(--accent); }

  /* ── SKELETON LOADER ── */
  .skeleton {
    background: linear-gradient(90deg, var(--cream2) 25%, var(--cream) 50%, var(--cream2) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
    border-radius: 0;
  }
  @keyframes shimmer {
    from { background-position: 200% 0; }
    to   { background-position: -200% 0; }
  }
  .skeleton-card {
    background: var(--white);
    animation: fadeUp 0.3s ease both;
  }
  .skel-img  { aspect-ratio: 3/4; }
  .skel-body { padding: 1rem 1.25rem 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; }
  .skel-line { height: 14px; }
  .skel-line.short { width: 50%; }
  .skel-line.med   { width: 75%; }

  /* ── MODAL OVERLAY ── */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(15,14,12,0.6);
    backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center;
    padding: 1.5rem;
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .modal {
    background: var(--white);
    width: 100%; max-width: 860px;
    max-height: 90vh;
    overflow-y: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    animation: slideUp 0.3s ease;
    position: relative;
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .modal-close {
    position: absolute; top: 1rem; right: 1rem;
    background: var(--ink); color: var(--cream);
    border: none; width: 34px; height: 34px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; z-index: 1;
    transition: background 0.15s;
  }
  .modal-close:hover { background: var(--accent); }

  .modal-img-side {
    background: var(--cream2);
    display: flex; align-items: center; justify-content: center;
    padding: 3rem 2rem;
    min-height: 420px;
  }
  .modal-img-side img {
    width: 100%; max-height: 360px;
    object-fit: contain;
    transition: transform 0.4s ease;
  }
  .modal-img-side:hover img { transform: scale(1.05); }

  .modal-info {
    padding: 2.5rem 2rem;
    display: flex; flex-direction: column; gap: 1.25rem;
    overflow-y: auto;
  }
  .modal-category {
    font-size: 0.7rem; text-transform: uppercase;
    letter-spacing: 2.5px; color: var(--muted);
  }
  .modal-title {
    font-family: var(--serif);
    font-size: 1.7rem; font-weight: 400;
    line-height: 1.3;
  }

  /* Star rating row */
  .rating-row {
    display: flex; align-items: center; gap: 0.5rem;
    font-size: 0.8rem; color: var(--muted);
  }
  .stars { display: flex; gap: 1px; }
  .stars svg { color: var(--gold); }

  .modal-price {
    font-family: var(--serif);
    font-size: 2.2rem; font-weight: 600;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 0.75rem 0;
  }

  .modal-desc {
    font-size: 0.85rem; color: var(--muted);
    line-height: 1.8;
  }

  /* Size selector */
  .size-label {
    font-size: 0.72rem; text-transform: uppercase;
    letter-spacing: 1.5px; color: var(--muted); margin-bottom: 0.5rem;
  }
  .sizes { display: flex; gap: 0.4rem; flex-wrap: wrap; }
  .size-btn {
    width: 40px; height: 40px;
    border: 1px solid var(--border);
    background: none;
    font-family: var(--sans);
    font-size: 0.78rem;
    cursor: pointer;
    transition: all 0.15s;
    color: var(--ink);
  }
  .size-btn:hover { border-color: var(--ink); }
  .size-btn.selected { background: var(--ink); color: var(--cream); border-color: var(--ink); }

  /* Qty + Add to cart */
  .add-row {
    display: flex; gap: 0.75rem; align-items: stretch;
  }
  .qty-ctrl {
    display: flex; align-items: center;
    border: 1px solid var(--border);
  }
  .qty-btn {
    width: 38px; height: 100%;
    background: none; border: none;
    cursor: pointer; color: var(--ink);
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s;
  }
  .qty-btn:hover { background: var(--cream2); }
  .qty-num {
    min-width: 36px; text-align: center;
    font-size: 0.9rem; font-weight: 500;
  }
  .add-btn {
    flex: 1;
    background: var(--ink); color: var(--cream);
    border: none;
    font-family: var(--sans);
    font-size: 0.78rem; font-weight: 500;
    letter-spacing: 2px; text-transform: uppercase;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
    padding: 0 1.5rem;
    transition: background 0.15s;
    min-height: 48px;
  }
  .add-btn:hover { background: var(--accent); }
  .add-btn.added { background: #1a6b2a; }

  /* Trust badges */
  .trust-badges {
    display: flex; flex-direction: column; gap: 0.5rem;
    border-top: 1px solid var(--border); padding-top: 1rem;
  }
  .badge-item {
    display: flex; align-items: center; gap: 0.6rem;
    font-size: 0.75rem; color: var(--muted);
  }
  .badge-item svg { color: var(--ink); flex-shrink: 0; }

  /* ── CART DRAWER ── */
  .cart-backdrop {
    position: fixed; inset: 0; z-index: 300;
    background: rgba(15,14,12,0.5);
    animation: fadeIn 0.2s ease;
  }
  .cart-drawer {
    position: fixed; top: 0; right: 0; bottom: 0;
    width: 100%; max-width: 420px;
    background: var(--white);
    z-index: 301;
    display: flex; flex-direction: column;
    animation: slideInRight 0.3s ease;
    overflow: hidden;
  }
  @keyframes slideInRight {
    from { transform: translateX(100%); }
    to   { transform: translateX(0); }
  }

  .drawer-header {
    padding: 1.5rem 1.75rem;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .drawer-header h3 {
    font-family: var(--serif);
    font-size: 1.5rem; font-weight: 400;
    letter-spacing: 1px;
  }
  .drawer-close {
    background: none; border: 1px solid var(--border);
    width: 32px; height: 32px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--muted); transition: all 0.15s;
  }
  .drawer-close:hover { border-color: var(--ink); color: var(--ink); }

  .drawer-items {
    flex: 1; overflow-y: auto;
    padding: 1.25rem 1.75rem;
    display: flex; flex-direction: column; gap: 1rem;
  }

  .drawer-item {
    display: grid; grid-template-columns: 64px 1fr auto;
    gap: 1rem; align-items: center;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border);
  }
  .di-img {
    width: 64px; height: 64px;
    background: var(--cream2);
    display: flex; align-items: center; justify-content: center;
    padding: 0.4rem;
  }
  .di-img img { width: 100%; height: 100%; object-fit: contain; }
  .di-name {
    font-family: var(--serif); font-size: 0.95rem;
    line-height: 1.3; margin-bottom: 0.25rem;
    display: -webkit-box; -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; overflow: hidden;
  }
  .di-price { font-size: 0.8rem; color: var(--muted); }
  .di-remove {
    background: none; border: none; cursor: pointer;
    color: var(--muted); transition: color 0.15s;
  }
  .di-remove:hover { color: var(--accent); }

  .drawer-footer {
    padding: 1.25rem 1.75rem;
    border-top: 1px solid var(--border);
  }
  .drawer-total {
    display: flex; justify-content: space-between; align-items: baseline;
    margin-bottom: 1rem;
  }
  .drawer-total span { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1.5px; color: var(--muted); }
  .drawer-total strong {
    font-family: var(--serif); font-size: 1.6rem; font-weight: 600;
  }
  .checkout-btn {
    width: 100%;
    background: var(--ink); color: var(--cream);
    border: none; padding: 1rem;
    font-family: var(--sans); font-size: 0.78rem;
    font-weight: 500; letter-spacing: 2px; text-transform: uppercase;
    cursor: pointer; display: flex; align-items: center;
    justify-content: center; gap: 0.5rem;
    transition: background 0.15s;
  }
  .checkout-btn:hover { background: var(--accent); }
  .empty-cart {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 0.75rem; color: var(--muted); text-align: center; padding: 2rem;
  }
  .empty-cart svg { opacity: 0.3; }
  .empty-cart p { font-size: 0.85rem; line-height: 1.6; }

  /* ── LOADING STATE ── */
  .loading-center {
    display: flex; align-items: center; justify-content: center;
    gap: 0.75rem; padding: 6rem 0;
    color: var(--muted); font-size: 0.85rem;
    text-transform: uppercase; letter-spacing: 1.5px;
  }
  .loading-center svg { animation: spin 1s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 700px) {
    nav { padding: 1rem 1.25rem; }
    .container { padding: 0 1.25rem; }
    .modal { grid-template-columns: 1fr; }
    .modal-img-side { min-height: 260px; padding: 2rem; }
    .products-grid { grid-template-columns: 1fr 1fr; gap: 2px; }
  }
`;

export default styles;
