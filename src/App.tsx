import { useState } from "react";
import {
  ArrowRight, ArrowUpRight, Bike, Check, ChefHat, ChevronDown,
  Clock3, Flame, Heart, Menu, Minus, Plus, Search, ShieldCheck,
  ShoppingBag, Star, Utensils, X
} from "lucide-react";

type ModalMode = "login" | "register" | null;

const categories = [
  { name: "Burgers", icon: "🍔", count: "12 items" },
  { name: "Pizza", icon: "🍕", count: "08 items" },
  { name: "Chicken", icon: "🍗", count: "10 items" },
  { name: "Drinks", icon: "🥤", count: "15 items" },
];

const dishes = [
  {
    name: "Crispy Chicken Burger",
    category: "Burgers",
    price: "₱149",
    rating: "4.9",
    time: "15–20 min",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
    tag: "BEST SELLER",
  },
  {
    name: "Classic Pepperoni Pizza",
    category: "Pizza",
    price: "₱289",
    rating: "4.8",
    time: "20–25 min",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85",
    tag: "POPULAR",
  },
  {
    name: "Golden Fried Chicken",
    category: "Chicken",
    price: "₱179",
    rating: "4.9",
    time: "18–25 min",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=85",
    tag: "CRISPY FAVORITE",
  },
];

function App() {
  const [modal, setModal] = useState<ModalMode>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [notice, setNotice] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [liked, setLiked] = useState<string[]>([]);

  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory = activeCategory === "All" || dish.category === activeCategory;
    const matchesSearch = dish.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openModal = (mode: ModalMode) => {
    setNotice("");
    setModal(mode);
    setMobileMenu(false);
  };

  const handleAuthSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice(
      modal === "register"
        ? "Your demo account form is valid. Backend registration will be connected in the next phase."
        : "Demo login form submitted. Backend authentication will be connected in the next phase."
    );
  };

  const handleBrowse = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleLike = (name: string) => {
    setLiked((old) => old.includes(name) ? old.filter((item) => item !== name) : [...old, name]);
  };

  return (
    <div className="app-shell">
      <div className="announcement">
        <span className="announcement-dot" />
        Freshly prepared meals, delivered to your door.
        <a href="#menu">Explore menu <ArrowUpRight size={13} /></a>
      </div>

      <header className="site-header">
        <a className="brand" href="#home" aria-label="QuickBite home">
          <span className="brand-mark"><Utensils size={21} strokeWidth={2.5} /></span>
          <span>quick<span className="brand-orange">bite</span><small>GOOD FOOD. GOOD MOOD.</small></span>
        </a>

        <nav className={`nav-links ${mobileMenu ? "nav-open" : ""}`}>
          <a href="#home" onClick={() => setMobileMenu(false)}>Home</a>
          <a href="#categories" onClick={() => setMobileMenu(false)}>Categories</a>
          <a href="#menu" onClick={() => setMobileMenu(false)}>Our menu</a>
          <a href="#why-us" onClick={() => setMobileMenu(false)}>Why QuickBite</a>
          <div className="mobile-actions">
            <button className="btn btn-ghost" onClick={() => openModal("login")}>Log in</button>
            <button className="btn btn-primary" onClick={() => openModal("register")}>Create account</button>
          </div>
        </nav>

        <div className="header-actions">
          <button className="cart-button" aria-label="Cart" onClick={() => setNotice(`You have ${cartCount} item(s) in your demo cart.`)}>
            <ShoppingBag size={19} />
            <span>Cart</span>
            <b>{cartCount}</b>
          </button>
          <button className="btn btn-ghost desktop-only" onClick={() => openModal("login")}>Log in</button>
          <button className="btn btn-primary desktop-only" onClick={() => openModal("register")}>Get started <ArrowUpRight size={16}/></button>
          <button className="menu-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-icon"><Flame size={14}/></span> YOUR CRAVINGS, OUR PRIORITY</div>
            <h1>Good food.<br/><span>Great mood.</span><br/>Delivered.</h1>
            <p className="hero-description">From your favorite comfort food to exciting new flavors — get the meals you love, made fresh and delivered with care.</p>
            <div className="hero-buttons">
              <button className="btn btn-primary btn-large" onClick={handleBrowse}>Explore our menu <ArrowRight size={18}/></button>
              <button className="btn btn-outline btn-large" onClick={() => openModal("register")}>Create an account</button>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack">
                <img src="https://i.pravatar.cc/80?img=12" alt="Customer"/>
                <img src="https://i.pravatar.cc/80?img=32" alt="Customer"/>
                <img src="https://i.pravatar.cc/80?img=47" alt="Customer"/>
                <span>+</span>
              </div>
              <div><strong>2,500+</strong><small>happy food lovers</small></div>
              <div className="proof-divider"/>
              <div className="rating-proof"><span><Star size={14} fill="currentColor"/> 4.9/5</span><small>customer rating</small></div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-frame">
              <img className="hero-food" src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1300&q=90" alt="Juicy burger with fresh ingredients"/>
            </div>
            <div className="floating-card delivery-card">
              <span className="float-icon"><Bike size={19}/></span>
              <span><strong>Fast delivery</strong><small>At your doorstep</small></span>
              <Check className="float-check" size={17}/>
            </div>
            <div className="floating-card fresh-card">
              <span className="fresh-emoji">🥬</span>
              <span><strong>Fresh ingredients</strong><small>Made with care</small></span>
            </div>
            <div className="hero-sticker"><span>MADE</span><strong>FRESH</strong><span>WITH LOVE ♥</span></div>
            <div className="hero-blob"/>
          </div>
        </section>

        <section className="benefits-strip">
          <div className="benefit"><span><Bike size={19}/></span><div><strong>Quick delivery</strong><small>Fast and reliable</small></div></div>
          <div className="benefit"><span><ChefHat size={19}/></span><div><strong>Freshly prepared</strong><small>Quality in every bite</small></div></div>
          <div className="benefit"><span><ShieldCheck size={19}/></span><div><strong>Secure ordering</strong><small>Your details stay safe</small></div></div>
          <div className="benefit"><span><Heart size={19}/></span><div><strong>Made for you</strong><small>Food worth sharing</small></div></div>
        </section>

        <section className="categories-section section-wrap" id="categories">
          <div className="section-heading">
            <div><div className="eyebrow">WHAT ARE YOU CRAVING?</div><h2>Explore our <span>categories</span></h2></div>
            <button className="text-link" onClick={handleBrowse}>View all menu <ArrowUpRight size={16}/></button>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <button className={`category-card ${activeCategory === category.name ? "category-active" : ""}`} key={category.name} onClick={() => { setActiveCategory(category.name); handleBrowse(); }}>
                <span className="category-emoji">{category.icon}</span>
                <strong>{category.name}</strong>
                <small>{category.count}</small>
                <span className="category-arrow"><ArrowUpRight size={15}/></span>
              </button>
            ))}
          </div>
        </section>

        <section className="menu-section" id="menu">
          <div className="section-wrap">
            <div className="section-heading menu-heading">
              <div><div className="eyebrow">FRESH FROM OUR KITCHEN</div><h2>Popular <span>right now</span></h2><p className="section-subtitle">A few crowd favorites we think you'll love.</p></div>
              <div className="menu-tools">
                <label className="search-box"><Search size={17}/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search meals..." aria-label="Search meals"/></label>
                <div className="filter-select"><select value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)} aria-label="Filter category"><option>All</option>{categories.map(c => <option key={c.name}>{c.name}</option>)}</select><ChevronDown size={15}/></div>
              </div>
            </div>
            <div className="food-grid">
              {filteredDishes.map((dish) => (
                <article className="food-card" key={dish.name}>
                  <div className="food-image-wrap">
                    <img src={dish.image.includes("images.unsplash.com") ? dish.image : "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85"} alt={dish.name}/>
                    <span className="food-tag">{dish.tag}</span>
                    <button className={`like-button ${liked.includes(dish.name) ? "liked" : ""}`} onClick={() => toggleLike(dish.name)} aria-label="Add to favorites"><Heart size={17} fill={liked.includes(dish.name) ? "currentColor" : "none"}/></button>
                  </div>
                  <div className="food-info">
                    <div className="food-meta"><span><Star size={13} fill="currentColor"/> {dish.rating}</span><span><Clock3 size={13}/> {dish.time}</span></div>
                    <h3>{dish.name}</h3>
                    <div className="food-bottom"><strong>{dish.price}</strong><button onClick={() => { setCartCount((n) => n + 1); setNotice(`${dish.name} added to your demo cart.`); }}><Plus size={17}/> Add</button></div>
                  </div>
                </article>
              ))}
              {filteredDishes.length === 0 && <div className="empty-state">No meals found. Try another search or category.</div>}
            </div>
            <div className="menu-bottom"><button className="btn btn-outline" onClick={() => { setActiveCategory("All"); setSearch(""); }}>Show all meals <ArrowRight size={16}/></button></div>
          </div>
        </section>

        <section className="why-section section-wrap" id="why-us">
          <div className="why-image"><img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1100&q=85" alt="Freshly cooked food on a table"/><div className="why-badge"><strong>100%</strong><span>GOODNESS<br/>IN EVERY BITE</span></div></div>
          <div className="why-copy"><div className="eyebrow">A LITTLE MORE THAN JUST FOOD</div><h2>Made fresh.<br/><span>Delivered happy.</span></h2><p>We believe great meals bring people together. That's why every QuickBite order is prepared with care, packed with flavor, and delivered with a smile.</p><div className="why-points"><div><Check size={17}/> Carefully selected ingredients</div><div><Check size={17}/> Easy and convenient ordering</div><div><Check size={17}/> Updates as your order moves</div></div><button className="btn btn-primary" onClick={() => openModal("register")}>Order with QuickBite <ArrowRight size={17}/></button></div>
        </section>

        <section className="cta-section section-wrap">
          <div className="cta-content"><div className="eyebrow light-eyebrow">YOUR NEXT FAVORITE MEAL IS WAITING</div><h2>Hungry? Let's make<br/>something <em>delicious.</em></h2><p>Join QuickBite and make your next meal the easiest part of your day.</p><button className="btn btn-white btn-large" onClick={() => openModal("register")}>Get started today <ArrowRight size={17}/></button></div>
          <div className="cta-art">🍔</div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <a className="brand footer-brand" href="#home"><span className="brand-mark"><Utensils size={21}/></span><span>quick<span className="brand-orange">bite</span><small>GOOD FOOD. GOOD MOOD.</small></span></a>
          <p>Good food brings people together.<br/>We'll bring it right to you.</p>
          <div className="footer-links"><a href="#home">Home</a><a href="#categories">Categories</a><a href="#menu">Our menu</a><a href="#why-us">About us</a><button onClick={() => openModal("login")}>Log in</button></div>
        </div>
        <div className="footer-bottom"><span>© 2025 QuickBite. All rights reserved.</span><span>Made with <Heart size={13} fill="currentColor"/> for food lovers.</span></div>
      </footer>

      {notice && <div className="toast-message" role="status"><Check size={17}/><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Dismiss"><X size={15}/></button></div>}

      {modal && <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setModal(null); }}>
        <div className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
          <button className="modal-close" onClick={() => setModal(null)} aria-label="Close"><X size={19}/></button>
          <div className="modal-logo"><span className="brand-mark"><Utensils size={20}/></span></div>
          <div className="eyebrow">WELCOME TO QUICKBITE</div>
          <h2 id="auth-title">{modal === "register" ? "Create your account" : "Welcome back"}</h2>
          <p>{modal === "register" ? "Join us and get your favorite meals with ease." : "Log in to continue to your QuickBite experience."}</p>
          <form onSubmit={handleAuthSubmit}>
            {modal === "register" && <label>Full name<input value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder="Enter your full name"/></label>}
            <label>Email address<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com"/></label>
            <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} placeholder="At least 6 characters"/></label>
            <button className="btn btn-primary auth-submit" type="submit">{modal === "register" ? "Create account" : "Log in"} <ArrowRight size={17}/></button>
          </form>
          {notice && <div className="form-notice"><Check size={15}/>{notice}</div>}
          <div className="switch-auth">{modal === "register" ? "Already have an account?" : "New to QuickBite?"} <button onClick={() => openModal(modal === "register" ? "login" : "register")}>{modal === "register" ? "Log in" : "Create account"}</button></div>
          <small className="demo-note">Opening-page demo only — authentication will connect to the backend in a later phase.</small>
        </div>
      </div>}
    </div>
  );
}

export default App;