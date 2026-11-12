import {useState} from 'react'
import {foods} from './data'
type Page='home'|'register'|'login'
export default function App(){
 const [page,setPage]=useState<Page>('home');
 const [name,setName]=useState(''),[email,setEmail]=useState(''),[password,setPassword]=useState('');
 const [message,setMessage]=useState(''),[user,setUser]=useState<{name:string}|null>(null);
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();setMessage('');
  if(password.length<8){setMessage('Password must contain at least 8 characters.');return;}

  setMessage('Form validation passed. Backend authentication will be connected in a later version.');

 }
 function logout(){localStorage.removeItem('quickbite_token');setUser(null);setPage('home')}
 return <div className="app">
<div className="topbar">Fresh food, made simple · Order your favorites today</div><header className="navbar"><a className="brand" href="#home"><b>Q</b> Quick<span>Bite</span></a><nav><a href="#home">Home</a><a href="#menu">Menu</a><a href="#about">About</a></nav><div className="nav-actions"><button onClick={()=>setPage('login')}>Log in</button><button className="btn small" onClick={()=>setPage('register')}>Sign up</button></div></header>{page==='home'&&<><section className="hero" id="home"><div><span className="eyebrow">GOOD FOOD. GOOD MOOD.</span><h1>Your next favorite meal is <em>just a bite away.</em></h1><p>Freshly prepared favorites, delivered with care. Find something delicious for every craving.</p><a className="btn" href="#menu">Explore menu →</a></div><div className="hero-image"><img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1100" alt="Fresh cheeseburger"/><div className="float-note"><b>Freshly made</b><small>Made for your cravings</small></div></div></section><section className="promo"><div><b>QUICKBITE SPECIAL</b><h2>A little treat makes every day better.</h2><p>Discover tasty picks made for your lunch break.</p></div><a href="#menu">See what's cooking →</a></section><section className="section" id="menu"><div className="section-title"><div><span className="eyebrow">MADE TO MAKE YOU HAPPY</span><h2>What are you craving?</h2></div></div><div className="categories">{['Burgers','Chicken','Pasta','Drinks'].map((x,i)=><a href="#featured" className="category" key={x}><span>{['🍔','🍗','🍝','🥤'][i]}</span><b>{x}</b><small>Explore →</small></a>)}</div></section><section className="section" id="featured"><span className="eyebrow">CUSTOMER FAVORITES</span><h2>Popular right now</h2><div className="foods">{foods.map(f=><article className="food" key={f.id}><img src={f.image} alt={f.name}/><div><small>{f.category}</small><h3>{f.name}</h3><p>{f.description}</p><b>₱{f.price.toFixed(2)}</b></div></article>)}</div></section><footer id="about"><div><a className="brand footbrand" href="#home"><b>Q</b> Quick<span>Bite</span></a><p>Good food, good mood, delivered with care.</p></div><div><strong>Explore</strong><a href="#home">Home</a><a href="#menu">Menu</a><a href="#about">About us</a></div><div><strong>Contact</strong><span>hello@quickbite.local</span><span>Open daily · 9 AM – 9 PM</span></div><small>© 2026 QuickBite. Made for good food moments.</small></footer></>}
</div>}
