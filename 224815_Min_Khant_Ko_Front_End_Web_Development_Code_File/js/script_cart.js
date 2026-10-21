let shopCart = [];
const itemContainer = document.getElementById("cartItemsContainer");
const grandTotalEl = document.getElementById("grandTotalAmount");
const cartFooterEl = document.getElementById("cartFooter");
const btnClearAll = document.getElementById("btnClearAll");
const btnCheckout = document.getElementById("btnCheckout")

function renderCart(){
 shopCart = JSON.parse(localStorage.getItem("bean_cart")) || [];
 showAllItem();  
}

function showAllItem(){
  itemContainer.innerHTML ="";
      /* "Your shopping cart is empty will" show when there is no item
        in  Cart*/
    if (shopCart.length === 0){
      itemContainer.innerHTML =`
      <div class="empty-cart-card">
        <p>Your shopping cart is empty.</p>
      </div>`;
      //When there is no selected item
      if (cartFooterEl) cartFooterEl.style.display = "none";

    return;
    }
        //When the selected items arrives to the cart
    if (cartFooterEl) cartFooterEl.style.display = "block";

    let grandTotal = 0;
    shopCart.forEach((item) =>{
      const currentQty = item.qty || item.quantity || 1;
      const itemTotal = item.price * currentQty;
      grandTotal += itemTotal;

      const itemEl  = document.createElement("div");
      itemEl.className ="cart-card";
      itemEl.innerHTML =`
      <div class="cart-top-row">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
            <h4 class="cart-item-name">${item.name}</h4>
              <span class="cart-item-unit-price">
                $${item.price.toFixed(2)} each</span>
          </div>
        </div>

        <div class="cart-bottom-row">
          <div class="cart-qty-controls">
            <button class="qty-btn" onclick="updateQty(${item.id}, -1)"
              ${currentQty <= 1? "disabled" : ""}> - </button>
            <span class="qty-val">${currentQty}</span>
              <button class="qty-btn" onclick="updateQty(${item.id}, 1)"> + 
                </button>
          </div>
          <div class="cart-right-group">
            <span class="cart-subtotal">$${itemTotal.toFixed(2)}</span>
              <button class="btn-danger-sm" onclick="removeItem(${item.id})"
                 title="Remove Item">&times;
              </button>
            </div>
        </div>
      `;
      itemContainer.appendChild(itemEl);
    });
     if (grandTotalEl){
      grandTotalEl.innerText= `$${grandTotal.toFixed(2)}`;
     }
}
  /* Adding and Removing Items */
function updateQty(id, change) {
  const item = shopCart.find((i) => i.id ===id);
    if (item) {
      if (item.qty !== undefined) item.qty += change;
      if (item.quantity !== undefined) item.quantity +=change;

      const currentQty = item.qty || item.quantity;
      if (currentQty <=0){
        shopCart = shopCart.filter((i) => i.id !== id);
      }
      saveCartAndRefresh();
    }
}   /* Removing Items */
function removeItem(id){
  shopCart = shopCart.filter((item) => item.id !== id);
  saveCartAndRefresh();
  
  if (typeof myNotiToast === "function"){
    myNotiToast("Item removed from cart.", "danger");
  }
  updateBadgeUI();
  renderCart();
}

function checkout(){
  if (shopCart.length === 0){
    if (typeof myNotiToast === "function"){
      myNotiToast("You cart is empty!", "danger");
    } 
    return;
  }
  shopCart= [];
  localStorage.removeItem("bean_cart");
  if(typeof myNotiToast === "function"){
    myNotiToast("Order Precoessed Successfullly!", "success");
  }
    updateBadgeUI();
    renderCart();
}

function saveCartAndRefresh(){
  localStorage.setItem("bean_cart", JSON.stringify(shopCart));
  updateBadgeUI();
  renderCart();
}

function updateBadgeUI(){
  const cartBadge = document.getElementById("cartBadge");
  if (cartBadge){
    let totalItems = shopCart.reduce((total, item) =>{
      return total + (item.qty || item.quantity || 1);
    }, 0);
    cartBadge.innerText = totalItems;
  }
}

function clearCart() {
  if (shopCart.length === 0) return;
  shopCart = [];
  localStorage.removeItem("bean_cart");
  saveCartAndRefresh();
}

document.addEventListener("DOMContentLoaded", () =>  {
      renderCart();
      
    });