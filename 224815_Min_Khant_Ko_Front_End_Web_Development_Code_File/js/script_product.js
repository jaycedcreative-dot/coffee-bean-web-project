 const products = [
    { id: 1, name: "Espresso",
         category: "Coffee",
          price: 3.50, desc: "Rich, concentrated shot with a dense caramel-colored crema.",
           tooltip: "Tasting Notes: Dark Chocolate & Caramel",
            image: "images/Espresso.jpg" },
    { id: 2, name: "Americano", category: "Coffee", price: 4.00, desc: "Espresso shots diluted with hot water for a smooth, rich flavor.", tooltip: "Recommended: Hot or Over Ice", image: "images/Americano.jpg" },
    { id: 3, name: "Latte", category: "Coffee", price: 4.75, desc: "Espresso blended with steamed milk and a light layer of foam.", tooltip: "Options: Whole, Oat, or Almond Milk", image: "images/Latte.jpg" },
    { id: 4, name: "Cappuccino", category: "Coffee", price: 4.75, desc: "Equal parts espresso, steamed milk, and thick milk foam.", tooltip: "Topped with fresh cocoa powder", image: "images/Cappuccino.jpg" },
    { id: 5, name: "Mocha", category: "Coffee", price: 5.25, desc: "Espresso mixed with rich chocolate syrup and steamed milk.", tooltip: "Topped with whipped cream", image: "images/Mocha.jpg" },
    { id: 6, name: "Flat White", category: "Coffee", price: 4.85, desc: "Smooth micro-foamed milk poured over a double shot of espresso.", tooltip: "Origin: Australia & New Zealand", image: "images/FlatWhite.jpg" },
    { id: 7, name: "Cold Brew", category: "Coffee", price: 5.00, desc: "Steeped for 18 hours in cold water for a sweet, smooth flavor.", tooltip: "Low acidity & high caffeine strength", image: "images/ColdBrew.jpg" },
    { id: 11, name: "Matcha Latte", category: "Non-Coffee", price: 5.50, desc: "Japanese ceremonial grade matcha whisked with steamed milk.", tooltip: "Bestseller item!", image: "images/Matcha.jpg" },
    { id: 11, name: "Iced Lemon Tea", category: "Non-Coffee", price: 4.25, desc: "Refreshing black tea infused with fresh lemon juice and honey.", tooltip: "Served cold & ultra refreshing", image: "images/LemonTea.jpg" },
    { id: 31, name: "Ethiopia Yirgacheffe", category: "Coffee Beans", price: 18.50, desc: "Light roast with elegant floral jasmine aroma, bright citrus acidity, and sweet peach notes.", tooltip: "Best for Pour-Over & Drip Brew", image: "images/CoffeeBeans1.jpg" },
    { id: 32, name: "Colombia Supremo", category: "Coffee Beans", price: 16.00, desc: "Medium roast delivering a smooth body with rich caramel sweetness and a subtle nutty finish.", tooltip: "Balanced all-day espresso & drip", image: "images/CoffeeBeans2.jpg" },
    { id: 33, name: "House Signature Blend", category: "Coffee Beans", price: 15.25, desc: "Dark roast blend featuring deep dark chocolate undertones, low acidity, and a creamy texture.", tooltip: "Perfect for Milk-based Espressos", image: "images/CoffeeBeans3.jpg" },
    { id: 34, name: "Sumatra Mandheling", category: "Coffee Beans", price: 17.75, desc: "Full-bodied dark roast with bold earthy flavors, herbal complexity, and a long spicy finish.", tooltip: "Rich & intense low-acid coffee", image: "images/CoffeeBeans4.jpg" },
    { id: 41, name: "Affogato", category: "Desert", price: 4.75, desc: "A scoop of rich vanilla bean gelato drowned in a hot espresso shot.", tooltip: "Dessert & Coffee in one", image: "images/Affogato.jpg" }
  ];

  const catContainer=document.getElementById("categoryContainer");
  const prodGrid=document.getElementById("productGrid");
let activeCategory= "All";
let shopCart= JSON.parse(localStorage.getItem("bean_cart")) || []; //store the product when user click add to cart

/*when user enter the value into searchbox*/
  searchInput.addEventListener("input",applyFilters);

  function applyFilters(){
    //alert("Great Job");
    const searchTerm=searchInput.value.toLowerCase().trim();
      let searchProd=[];
      for(const prod of products){
        if((prod.name.toLowerCase().includes(searchTerm) ||
            prod.desc.toLowerCase().includes(searchTerm))
            &&
              (activeCategory=="All" ||prod.category==activeCategory)
            )
            searchProd.push(prod);
      }
        renderProducts(searchProd);
  }

    /* Render Category Button*/
    /* <div class="category-container" id="categoryContainer" */
    function renderCategoryButtons(){
      const categories=["All"];
        /* Get one product for each loop */
        for (const p of products){
          if(!categories.includes(p.category))
            categories.push(p.category);
        }
        catContainer.innerHTML="";
        categories.forEach(cat=>{
            const btn=document.createElement("button");
            /* button */
            btn.className=`category-btn ${cat===activeCategory?'active': ''}`;
            btn.textContent=cat;
            btn.addEventListener("click",()=>{
              /* this function appear when user click category button */
              activeCategory=cat; /* change the active category is the clicking button */
              renderCategoryButtons(); /* active style change to clicking button */
              applyFilters(); //search result effect for active category
            });
            catContainer.appendChild(btn);
        });
    }

  

  function renderProducts(items){
    prodGrid.innerHTML="";
    if(items.length==0){
      prodGrid.innerHTML=`<div class="no-results">
                            No Product Found</div>`;
      return;
    }
    items.forEach(product =>{
      //alert(product.name)
      const card=document.createElement("article");
        //<article> </article>
      card.className="product-card";
        //<article class="product-card">
      card.innerHTML=`
        <div class="product-image-container">
          <a href="${product.image}"
              class="coffee-lightbox"
              data-gallery="coffee-gallery"
              data-title="${product.name}">
            <img class="product-image" src="${product.image}"
            alt="${product.name}" loading="lazy">
          </a>
        </div>

        <div class="product-details">
          
            <div class="category">${product.category}</div>
              <div class="product-title-wrapper">
                <h2 class="product-name">${product.name}</h2>
                <div class="tooltip-container" tabindex="0">
                  <span class="info-icon">i</span>
                  <span class="tooltip-text">${product.tooltip}</span>
                </div>
              </div>
                
              <p class="product-desc">${product.desc}</p>
          
              <div class="product-price">${product.price.toFixed(2)}</div>
                <button class="buy-btn" onclick="addToCart(${product.id})">
                  Add to cart</button>
              
        </div>
      
      `;
    prodGrid.appendChild(card);
    });
    GLightbox({
      selector: '.coffee-lightbox',
      closeButton: true,
      touchNavigation: true,
      loop: true
    });
    
  }

  /* add to cart function */
  function addToCart(pid){
    //alert("Hey Hey")
    const selProd=products.find(p=> p.id===pid);
    
    //check the selProduct exist in the shopping cart
    const existItem=shopCart.find(it=> it.id==pid);

    if(existItem){
      existItem.qty = (existItem.qty || existItem.quantity || 0) +1;
      existItem.quantity = existItem.qty;
    }else
      /*item not yest exist in cart */
      shopCart.push({...selProd, qty:1, quantity: 1}); /* add quantity extra key */

      myNotiToast(`Added ${selProd.name} to cart!`);
      updateCartUI();

      localStorage.setItem("bean_cart",JSON.stringify(shopCart));
  }
  function updateCartUI(){
    let totalItems=0;
    for(const item of shopCart){
      totalItems+=item.quantity;
    }
    cartBadge.textContent=totalItems;
  }

  function myNotiToast(message, type='info'){
    Toastify({
      text: message,
      duration: 900,
      gravity: "top",
      position: "right",
      className: `toast-cudtom toast-${type}`
    }).showToast();
  }

cartBadge.addEventListener('click',function(){
  window.location.href="cart.html";
});
document.addEventListener("DOMContentLoaded", () =>{
  renderCategoryButtons();
  renderProducts(products);
  updateCartUI();
});