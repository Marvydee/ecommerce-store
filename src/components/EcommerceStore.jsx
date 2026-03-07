import { useState, useEffect, useCallback } from "react";
import {
  ShoppingBag,
  Plus,
  Minus,
  X,
  Truck,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
  Heart,
  ArrowUpRight,
} from "lucide-react";
import styles from "../styles";
import SkeletonCard from "./Skeleton";
import StarRating from "./Rating";
import SIZES from "../utils/sizes";

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function EcommerceStore() {
  // All products fetched from the API
  const [products, setProducts] = useState([]);
  // Currently active category filter ("all" or a category string)
  const [category, setCategory] = useState("all");
  // List of unique category strings extracted from the API data
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  // The product currently open in the detail modal (null = modal closed)
  const [selected, setSelected] = useState(null);
  // Cart is an array of { product, qty, size } objects
  const [cart, setCart] = useState([]);
  // Whether the cart drawer is visible
  const [cartOpen, setCartOpen] = useState(false);
  // Selected size inside the modal
  const [size, setSize] = useState("M");
  // Quantity inside the modal
  const [qty, setQty] = useState(1);
  // Shows "Added!" feedback on the button briefly
  const [added, setAdded] = useState(false);
  // Wishlist is a Set of product IDs
  const [wishlist, setWishlist] = useState(new Set());

  // ── FETCH PRODUCTS ────────────────────────────────────────────────────────
  // useCallback memoizes this function so it doesn't re-create on every render
  const fetchProducts = useCallback(async (cat) => {
    setLoading(true);
    try {
      // If category is "all", hit the base endpoint; otherwise filter by category
      const url =
        cat === "all"
          ? "https://fakestoreapi.com/products"
          : `https://fakestoreapi.com/products/category/${encodeURIComponent(cat)}`;
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── FETCH CATEGORIES ──────────────────────────────────────────────────────
  // Runs once on mount — gets the list of available categories from the API
  useEffect(() => {
    async function getCategories() {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const data = await res.json();
        setCategories(data); // e.g. ["electronics", "jewelery", "men's clothing", ...]
      } catch (err) {
        console.error(err);
      }
    }
    getCategories();
    fetchProducts("all"); // also load all products immediately
  }, [fetchProducts]);

  // ── CATEGORY CHANGE ───────────────────────────────────────────────────────
  function handleCategory(cat) {
    setCategory(cat);
    fetchProducts(cat);
  }

  // ── CART ACTIONS ─────────────────────────────────────────────────────────
  function addToCart() {
    setCart((prev) => {
      // Check if the same product + size combo already exists in the cart
      const existing = prev.find(
        (i) => i.product.id === selected.id && i.size === size,
      );
      if (existing) {
        // If it does, just bump the quantity
        return prev.map((i) =>
          i.product.id === selected.id && i.size === size
            ? { ...i, qty: i.qty + qty }
            : i,
        );
      }
      // Otherwise add a new cart entry
      return [...prev, { product: selected, qty, size }];
    });
    // Show "Added!" for 1.5 seconds then revert the button
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function removeFromCart(productId, size) {
    setCart((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.size === size)),
    );
  }

  // Total number of items in cart (sum of all quantities)
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  // Total price
  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  // Toggle a product in the wishlist Set
  function toggleWishlist(e, id) {
    e.stopPropagation(); // prevent opening the modal when clicking the heart
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  // Reset qty/size when a new product is opened
  function openModal(product) {
    setSelected(product);
    setQty(1);
    setSize("M");
    setAdded(false);
  }

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{styles}</style>

      {/* Announcement bar */}
      <div className="topbar">
        Free shipping on orders over $50 · Easy 30-day returns
      </div>

      {/* Nav */}
      <nav>
        <div className="nav-brand">
          M<span>.</span>Divine
        </div>
        <div className="nav-right">
          <button className="cart-btn" onClick={() => setCartOpen(true)}>
            <ShoppingBag size={15} />
            Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </nav>

      <div className="container">
        {/* Category filters */}
        <div className="filter-bar">
          <span className="filter-label">
            <SlidersHorizontal size={13} /> Filter
          </span>
          {/* "All" chip */}
          <button
            className={`filter-chip ${category === "all" ? "active" : ""}`}
            onClick={() => handleCategory("all")}
          >
            All
          </button>
          {/* One chip per category returned from the API */}
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-chip ${category === cat ? "active" : ""}`}
              onClick={() => handleCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Section heading */}
        <div className="section-heading">
          <h2>
            {category === "all" ? (
              <>
                The <em>Collection</em>
              </>
            ) : (
              <>{category}</>
            )}
          </h2>
          {!loading && (
            <span className="count-tag">{products.length} pieces</span>
          )}
        </div>

        {/* Product grid — skeletons while loading, cards when done */}
        <div className="products-grid">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : products.map((product) => (
                <div
                  className="product-card"
                  key={product.id}
                  onClick={() => openModal(product)}
                >
                  {/* Wishlist heart button */}
                  <button
                    className={`wishlist-btn ${wishlist.has(product.id) ? "wishlisted" : ""}`}
                    onClick={(e) => toggleWishlist(e, product.id)}
                  >
                    <Heart
                      size={14}
                      fill={wishlist.has(product.id) ? "currentColor" : "none"}
                    />
                  </button>

                  <div className="card-img-wrap">
                    <img
                      className="card-img"
                      src={product.image}
                      alt={product.title}
                    />
                    {/* Quick-add strip shown on hover */}
                    <div className="card-overlay">
                      <ShoppingBag size={13} /> Quick View
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="card-category">{product.category}</div>
                    <div className="card-title">{product.title}</div>
                    <div className="card-footer">
                      <div className="card-price">
                        ${product.price.toFixed(2)}
                      </div>
                      <div className="card-rating">
                        <StarRating rating={product.rating.rate} />
                        <span>({product.rating.count})</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* ── PRODUCT MODAL ── */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          {/* stopPropagation prevents closing when clicking inside the modal */}
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>
              <X size={16} />
            </button>

            {/* Left: product image */}
            <div className="modal-img-side">
              <img src={selected.image} alt={selected.title} />
            </div>

            {/* Right: product details */}
            <div className="modal-info">
              <div className="modal-category">{selected.category}</div>
              <h2 className="modal-title">{selected.title}</h2>

              <div className="rating-row">
                <StarRating rating={selected.rating.rate} />
                <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                  {selected.rating.rate} · {selected.rating.count} reviews
                </span>
              </div>

              <div className="modal-price">${selected.price.toFixed(2)}</div>
              <p className="modal-desc">{selected.description}</p>

              {/* Size selector — only for clothing categories */}
              {selected.category.includes("clothing") && (
                <div>
                  <div className="size-label">
                    Size — <strong>{size}</strong>
                  </div>
                  <div className="sizes">
                    {SIZES.map((s) => (
                      <button
                        key={s}
                        className={`size-btn ${size === s ? "selected" : ""}`}
                        onClick={() => setSize(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + Add to cart */}
              <div className="add-row">
                <div className="qty-ctrl">
                  <button
                    className="qty-btn"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="qty-num">{qty}</span>
                  <button
                    className="qty-btn"
                    onClick={() => setQty((q) => q + 1)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  className={`add-btn ${added ? "added" : ""}`}
                  onClick={addToCart}
                >
                  <ShoppingBag size={15} />
                  {added ? "Added to Cart!" : "Add to Cart"}
                </button>
              </div>

              {/* Trust badges */}
              <div className="trust-badges">
                {[
                  {
                    icon: <Truck size={14} />,
                    text: "Free shipping on orders over $50",
                  },
                  {
                    icon: <RotateCcw size={14} />,
                    text: "Free 30-day returns",
                  },
                  { icon: <ShieldCheck size={14} />, text: "Secure checkout" },
                ].map((b) => (
                  <div className="badge-item" key={b.text}>
                    {b.icon} {b.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CART DRAWER ── */}
      {cartOpen && (
        <>
          <div className="cart-backdrop" onClick={() => setCartOpen(false)} />
          <div className="cart-drawer">
            <div className="drawer-header">
              <h3>Your Bag</h3>
              <button
                className="drawer-close"
                onClick={() => setCartOpen(false)}
              >
                <X size={15} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <ShoppingBag size={48} />
                <p>
                  Your bag is empty.
                  <br />
                  Browse the collection and add something you love.
                </p>
              </div>
            ) : (
              <>
                <div className="drawer-items">
                  {cart.map((item, i) => (
                    <div
                      className="drawer-item"
                      key={`${item.product.id}-${item.size}-${i}`}
                    >
                      <div className="di-img">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                        />
                      </div>
                      <div>
                        <div className="di-name">{item.product.title}</div>
                        <div className="di-price">
                          {/* Show size only for clothing */}
                          {item.product.category.includes("clothing") &&
                            `Size: ${item.size} · `}
                          Qty: {item.qty} · $
                          {(item.product.price * item.qty).toFixed(2)}
                        </div>
                      </div>
                      <button
                        className="di-remove"
                        onClick={() =>
                          removeFromCart(item.product.id, item.size)
                        }
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="drawer-footer">
                  <div className="drawer-total">
                    <span>Total</span>
                    <strong>${cartTotal.toFixed(2)}</strong>
                  </div>
                  <button className="checkout-btn">
                    Proceed to Checkout <ArrowUpRight size={15} />
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
