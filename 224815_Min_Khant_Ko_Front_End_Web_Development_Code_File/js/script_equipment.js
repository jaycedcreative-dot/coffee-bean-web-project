 const equipments = [
    { id: 101, name: "Espresso Machine",
         category: "Machine",
          price: 450.50, desc: "Professional dual-boiler espresso machine with precise PID temperature control.",
           tooltip: "Includes portafilter, tamper & 1-year warranty",
            image: "images/EspressoMachine.jpg" },
    { id: 102, name: "Gooseneck Kettle", category: "Brewers", price: 65.00, desc: "Electric pour-over kettle with exact temperature setting and hold feature.", tooltip: "Ergonomic handle & precision pour spout", image: "images/GooseneckKettle.jpg" },
    { id: 103, name: "French Press 8-Cup", category: "Brewers", price: 35.00, desc: "Heat-resistant borosilicate glass server with 4-level filtration system.", tooltip: "Dishwasher safe & BPA free materials", image: "images/FrenchPress8-Cup.jpg" },
    { id: 104, name: "Burr Coffee Grinder", category: "Grinders", price: 125.00, desc:  "Stainless steel conical burr grinder with 30 precise grind settings.", tooltip:  "Uniform particle size for perfect extraction", image: "images/BurrCoffeeGrinder.jpg" },
    { id: 105, name: "Precision Digital Scale", category: "Accessories", price: 28.85, desc: "High-precision coffee scale with built-in timer and auto-tare function.", tooltip: "Accurate to 0.1g with silicone mat", image: "images/PrecisionDigitalScale.jpg" },
    { id: 106, name: "Stainless Steel Milk Pitcher", category: "Accessories", price: 18.00, desc: "600ml froth pitcher designed for creating silky latte art microfoam.", tooltip: "Internal measurement markings included", image: "images/StainlessSteelMilkPitcher.jpg" }
    
  ];

  const catContainer=document.getElementById("categoryContainer");
  const equipmentGrid=document.getElementById("equipmentGrid");
let activeCategory= "All";
let shopCart= JSON.parse(localStorage.getItem("bean_cart")) || []; //store the product when user click add to cart

/*when user enter the value into searchbox*/
  searchInput.addEventListener("input",applyFilters);

  function applyFilters(){
    //alert("Great Job");
    const searchTerm=searchInput.value.toLowerCase().trim();
      let searchProd=[];
      for(const item of equipments){
        if((item.name.toLowerCase().includes(searchTerm) ||
            item.desc.toLowerCase().includes(searchTerm))
            &&
              (activeCategory=="All" ||item.category==activeCategory)
            )
            searchProd.push(item);
      }
        renderEquipments(searchProd);
  }

    /* Render Category Button*/
    /* <div class="category-container" id="categoryContainer" */
    function renderCategoryButtons(){
      const categories=["All"];
        /* Get one product for each loop */
        for (const item of equipments){
          if(!categories.includes(item.category))
            categories.push(item.category);
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

  

  function renderEquipments(items){
    equipmentGrid.innerHTML="";
    if(items.length==0){
      equipmentGrid.innerHTML=`<div class="no-results">
                            No Equipment Found</div>`;
      return;
    }
    items.forEach(item =>{
      //alert(product.name)
      const card=document.createElement("article");
        //<article> </article>
      card.className="product-card"; // same class name because we will use the same css
        //<article class="product-card">
      card.innerHTML=`
        <div class="product-image-container">
          <img class="product-image" src="${item.image}"
          alt="${item.name}" loading="lazy">
        </div>

        <div class="product-details">
          
            <div class="category">${item.category}</div>
              <div class="product-title-wrapper">
                <h2 class="product-name">${item.name}</h2>
                <div class="tooltip-container" tabindex="0">
                  <span class="info-icon">i</span>
                  <span class="tooltip-text">${item.tooltip}</span>
                </div>
              </div>
                
              <p class="product-desc">${item.desc}</p>
          
              <div class="product-price">${item.price.toFixed(2)}</div>
                <button class="buy-btn" onclick="addToCart(${item.id})">
                  Add to cart</button>
              
        </div>
      
      `;
    equipmentGrid.appendChild(card);
    });
  }

  /* add to cart function */
  function addToCart(pid){
    //alert("Hey Hey")
    const selProd=equipments.find(p=> p.id===pid);
    
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
  renderEquipments(equipments);
  updateCartUI();
});