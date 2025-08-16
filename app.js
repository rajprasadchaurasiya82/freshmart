// Paste this into app.js
// Sample product data (replace with real data or integrate with backend)
alert("welcome to freshmart");
const PRODUCTS = [
  {id:1,name:'Organic Bananas (1kg)',price:79,category:'Fruits',img:'organic banana.jpeg'},
  {id:2,name:'Red Apples (6 pcs)',price:189,category:'Fruits',img:'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=60'},
  {id:3,name:'Whole Milk (1L)',price:59,category:'Dairy',img:'milk.jpg'},
  {id:4,name:'Multigrain Bread',price:49,category:'Bakery',img:'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=800&q=60'},
  {id:5,name:'Broccoli (250g)',price:69,category:'Vegetables',img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=60'},
  {id:6,name:'Paneer (200g)',price:99,category:'Dairy',img:'paneer.jpg'},
  {id:7,name:'Olive Oil (500ml)',price:399,category:'Pantry',img:'olive oil.webp'},
  {id:8,name:'Fresh Strawberries (box)',price:149,category:'Fruits',img:'Strawberry.jpg'}
];

const productsGrid = document.getElementById('productsGrid');
const resultsCount = document.getElementById('resultsCount');
const cartCount = document.getElementById('cartCount');

let CART = {};

function renderProducts(list){
  productsGrid.innerHTML = '';
  list.forEach(p=>{
    const card = document.createElement('div'); card.className='product';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" />
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-weight:700">${p.name}</div>
          <div class="muted" style="font-size:13px">${p.category}</div>
        </div>
        <div class="price">₹${p.price}</div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="qty">
          <button onclick="changeQty(${p.id}, -1)">-</button>
          <div id="qty-${p.id}">0</div>
          <button onclick="changeQty(${p.id}, 1)">+</button>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-primary" onclick="addToCart(${p.id})">Add</button>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });
  resultsCount.textContent = list.length;
}

function changeQty(id,delta){
  const el = document.getElementById('qty-'+id);
  let val = parseInt(el.textContent);
  val = Math.max(0, val + delta);
  el.textContent = val;
}

function addToCart(id){
  const qtyEl = document.getElementById('qty-'+id);
  const qty = parseInt(qtyEl.textContent) || 1;
  if(qty <= 0) return alert('Please choose quantity');
  CART[id] = (CART[id]||0) + qty;
  qtyEl.textContent = 0;
  updateCartUI();
}

function updateCartUI(){
  const totalItems = Object.values(CART).reduce((a,b)=>a+b,0);
  cartCount.textContent = totalItems;
  cartCount.style.fontWeight = 800;
}

// Search & category filter
document.getElementById('searchInput').addEventListener('input', e=>{
  const q = e.target.value.toLowerCase().trim();
  const filtered = PRODUCTS.filter(p=>p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  renderProducts(filtered);
});

// clicking categories filters
document.querySelectorAll('.cat').forEach(node=>{
  node.addEventListener('click', ()=>{
    const cat = node.dataset.cat;
    const filtered = PRODUCTS.filter(p=>p.category.toLowerCase().includes(cat.toLowerCase()));
    renderProducts(filtered);
  });
});

// scroll helpers
function scrollToSection(id){
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
}

// initial render
renderProducts(PRODUCTS);

// small keyboard shortcuts for dev testing
window.addEventListener('keydown', e=>{
  if(e.key === '/') { document.getElementById('searchInput').focus(); e.preventDefault(); }
});
