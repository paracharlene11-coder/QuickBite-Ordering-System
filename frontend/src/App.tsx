import { useMemo, useState } from 'react'
import { foods } from './data'

type Page = 'home' | 'register' | 'login' | 'dashboard' | 'cart'
type Food = typeof foods[number]
type CartItem = { food: Food; quantity: number }

const categories = ['All', ...Array.from(new Set(foods.map(food => food.category)))]
const money = (amount: number) => `₱${amount.toFixed(2)}`

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [user, setUser] = useState<{ name: string } | null>(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('recommended')
  const [selectedFood, setSelectedFood] = useState<Food | null>(null)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('quickbite_cart') || '[]') as CartItem[] }
    catch { return [] }
  })
  const [notice, setNotice] = useState('')

  const filteredFoods = useMemo(() => {
    let result = foods.filter(food => {
      const matchesCategory = activeCategory === 'All' || food.category === activeCategory
      const term = search.trim().toLowerCase()
      const matchesSearch = !term || `${food.name} ${food.category} ${food.description}`.toLowerCase().includes(term)
      return matchesCategory && matchesSearch
    })
    if (sort === 'price-low') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'price-high') result = [...result].sort((a, b) => b.price - a.price)
    if (sort === 'name') result = [...result].sort((a, b) => a.name.localeCompare(b.name))
    return result
  }, [activeCategory, search, sort])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.food.price * item.quantity, 0)

  function saveCart(next: CartItem[]) {
    setCart(next)
    localStorage.setItem('quickbite_cart', JSON.stringify(next))
  }
  function addToCart(food: Food) {
    const existing = cart.find(item => item.food.id === food.id)
    saveCart(existing
      ? cart.map(item => item.food.id === food.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...cart, { food, quantity: 1 }])
    setNotice(`${food.name} added to your cart.`)
    setSelectedFood(null)
  }
  function changeQuantity(id: number, amount: number) {
    const next = cart.map(item => item.food.id === id ? { ...item, quantity: item.quantity + amount } : item)
      .filter(item => item.quantity > 0)
    saveCart(next)
  }
  function removeFromCart(id: number) {
    saveCart(cart.filter(item => item.food.id !== id))
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage('')
    if (password.length < 8) { setMessage('Password must contain at least 8 characters.'); return }
    try {
      const endpoint = page === 'register' ? 'register' : 'login'
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/${endpoint}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(page === 'register' ? { name, email, password } : { email, password })
      })
      const data = await response.json()
      if (!response.ok) { setMessage(data.message || 'Unable to continue.'); return }
      localStorage.setItem('quickbite_token', data.token)
      setUser(data.user)
      setPage('dashboard')
    } catch { setMessage('Cannot connect to the server. Start the backend and try again.') }
  }
  function logout() {
    localStorage.removeItem('quickbite_token')
    setUser(null)
    setPage('home')
  }

  const showDashboard = () => { setPage('dashboard'); setNotice('') }
  const menu = <section className="section menu-section" id="menu">
    <div className="section-title menu-heading">
      <div><span className="eyebrow">MADE TO MAKE YOU HAPPY</span><h2>What are you craving?</h2><p className="muted">Choose a meal and make it yours.</p></div>
      <label className="search-box"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search food..." aria-label="Search food" /></label>
    </div>
    <div className="category-tabs" aria-label="Food categories">
      {categories.map(category => <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}
    </div>
    <div className="menu-tools"><span>{filteredFoods.length} menu item{filteredFoods.length === 1 ? '' : 's'}</span><label>Sort by <select value={sort} onChange={e => setSort(e.target.value)}><option value="recommended">Recommended</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name</option></select></label></div>
    {filteredFoods.length ? <div className="foods">{filteredFoods.map(food => <article className="food" key={food.id}>
      <button className="food-image-button" onClick={() => setNotice(`${food.name} selected. Food details will be available in the next update.`)} aria-label={`View ${food.name}`}><img src={food.image} alt={food.name} /></button>
      <div><small>{food.category}</small><h3>{food.name}</h3><p>{food.description}</p><div className="food-bottom"><b>{money(food.price)}</b></div></div>
    </article>)}</div> : <div className="empty-results"><b>No meals found</b><p>Try another search or choose a different category.</p><button onClick={() => { setSearch(''); setActiveCategory('All') }}>Clear filters</button></div>}
  </section>

  return <div className="app">
    <div className="topbar">Fresh food, made simple · Order your favorites today</div>
    <header className="navbar">
      <a className="brand" href="#home" onClick={() => setPage('home')}><b>Q</b> Quick<span>Bite</span></a>
      <nav><button onClick={() => setPage('home')}>Home</button><button onClick={showDashboard}>Menu</button><a href="#about">About</a></nav>
      <div className="nav-actions">
        {user ? <><button onClick={showDashboard}>Dashboard</button><button onClick={logout}>Log out</button></> : <><button onClick={() => setPage('login')}>Log in</button><button className="btn small" onClick={() => setPage('register')}>Sign up</button></>}
        
      </div>
    </header>
    {user && <div className="signed">Welcome, {user.name}<button onClick={logout}>Log out</button></div>}
    {notice && <div className="notice" role="status">{notice}<button onClick={() => setNotice('')}>×</button></div>}

    {page === 'home' && <><section className="hero" id="home"><div><span className="eyebrow">GOOD FOOD. GOOD MOOD.</span><h1>Your next favorite meal is <em>just a bite away.</em></h1><p>Freshly prepared favorites, delivered with care. Find something delicious for every craving.</p><button className="btn" onClick={showDashboard}>Explore menu →</button></div><div className="hero-image"><img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1100" alt="Fresh cheeseburger"/><div className="float-note"><b>Freshly made</b><small>Made for your cravings</small></div></div></section><section className="promo"><div><b>QUICKBITE SPECIAL</b><h2>A little treat makes every day better.</h2><p>Discover tasty picks made for your lunch break.</p></div><button onClick={showDashboard}>See what's cooking →</button></section>{menu}<footer id="about"><div><a className="brand footbrand" href="#home"><b>Q</b> Quick<span>Bite</span></a><p>Good food, good mood, delivered with care.</p></div><div><strong>Explore</strong><a href="#home">Home</a><button onClick={showDashboard}>Menu</button><a href="#about">About us</a></div><div><strong>Contact</strong><span>hello@quickbite.local</span><span>Open daily · 9 AM – 9 PM</span></div><small>© 2026 QuickBite. Made for good food moments.</small></footer></>}

    {page === 'dashboard' && <main className="dashboard">
      <div className="dashboard-welcome"><div><span className="eyebrow">CUSTOMER DASHBOARD</span><h1>{user ? `Hello, ${user.name.split(' ')[0]}!` : 'Welcome to QuickBite!'}</h1><p>Find your next favorite meal from our kitchen.</p></div><div className="dashboard-stat"><span>Items in cart</span><b>{cartCount}</b><button onClick={() => setPage('cart')}>View cart →</button></div></div>
      <div className="dashboard-banner"><div><span>QUICKBITE PICKS</span><h2>Good food makes a good day.</h2><p>Explore freshly prepared meals for every craving.</p><button className="btn" onClick={() => document.getElementById('customer-menu')?.scrollIntoView({ behavior: 'smooth' })}>Browse meals</button></div><img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=900" alt="Fresh meal bowl" /></div>
      <div id="customer-menu">{menu}</div>
    </main>}

    {false && page === 'cart' && <main className="cart-page"><div className="page-heading"><span className="eyebrow">YOUR ORDER</span><h1>Shopping cart</h1><p>Review your items before checkout.</p></div>{cart.length ? <div className="cart-layout"><section className="cart-items">{cart.map(item => <article className="cart-item" key={item.food.id}><img src={item.food.image} alt={item.food.name}/><div className="cart-item-info"><small>{item.food.category}</small><h3>{item.food.name}</h3><b>{money(item.food.price)}</b></div><div className="quantity-control"><b>{item.quantity}</b></div><strong>{money(item.food.price * item.quantity)}</strong></article>)}</section><aside className="order-summary"><h2>Order summary</h2><div><span>Subtotal</span><b>{money(subtotal)}</b></div><div><span>Delivery fee</span><b>Calculated at checkout</b></div><div className="summary-total"><span>Total</span><strong>{money(subtotal)}</strong></div><button className="btn checkout-button" onClick={() => setNotice('Cart is ready. Checkout and payment will be added in a later milestone.')}>Continue to checkout</button><button className="continue-link" onClick={showDashboard}>← Continue shopping</button></aside></div> : <div className="empty-cart"><div className="empty-cart-icon">🛒</div><h2>Your cart is empty</h2><p>Looks like you haven't added any meals yet.</p><button className="btn" onClick={showDashboard}>Explore menu</button></div>}</main>}

    {(page === 'register' || page === 'login') && <main className="auth-wrap"><section className="auth-card"><button className="back" onClick={() => setPage('home')}>← Back to home</button><span className="eyebrow">{page === 'register' ? 'JOIN QUICKBITE' : 'WELCOME BACK'}</span><h1>{page === 'register' ? 'Create your account' : 'Log in to QuickBite'}</h1><p className="muted">{page === 'register' ? 'Save your favorites and make ordering easier.' : 'Sign in to continue to QuickBite.'}</p><form onSubmit={submit}>{page === 'register' && <label>Full name<input value={name} onChange={e => setName(e.target.value)} required minLength={2} placeholder="Your name"/></label>}<label>Email address<input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com"/></label><label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} placeholder="At least 8 characters"/></label><small className="muted">Password must contain at least 8 characters.</small><button className="btn submit" type="submit">{page === 'register' ? 'Create account' : 'Log in'}</button>{message && <p className="message">{message}</p>}</form><p className="switch">{page === 'register' ? 'Already have an account?' : "Don't have an account?"} <button onClick={() => { setPage(page === 'register' ? 'login' : 'register'); setMessage('') }}>{page === 'register' ? 'Log in' : 'Sign up'}</button></p></section></main>}

    {false && selectedFood && <div className="modal-backdrop" role="presentation" onClick={() => setSelectedFood(null)}><section className="food-modal" role="dialog" aria-modal="true" aria-label={`${selectedFood.name} details`} onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setSelectedFood(null)}>×</button><img src={selectedFood.image} alt={selectedFood.name}/><div><small>{selectedFood.category}</small><h2>{selectedFood.name}</h2><p>{selectedFood.description}</p><strong>{money(selectedFood.price)}</strong></div></section></div>}
  </div>
}
