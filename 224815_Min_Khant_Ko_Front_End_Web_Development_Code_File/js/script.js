const hamBtn=document.getElementById("hamburgerBtn");
const navMenu=document.getElementById("navMenu");
    //Click Event upon Hamburger Button
if(hamBtn){
    hamBtn.addEventListener('click',(event)=>{
        //alert("Hello");
        navMenu.classList.toggle('active');
    });
}
    //Toastify plugin : to show the message on UI
function myNotiToast(message,type='info'){
    Toastify({
        text: message,
        duration: 1500,/*1000ms */
        gravity:"top",
        position:"right",
        className:`toast-custom toast-${type}`,
    }).showToast();
}

//shopping cart badge show the no of items in the shopping cart array
//shopping cart array exist at LOCAL STORAGE
const cartBadge=document.getElementById("cartBadge");
const cartToggleBtn=document.getElementById("cartToggleBtn");
    //when user click the cart badge ---> go to shopping cart page
cartToggleBtn.addEventListener('click',()=>{
    window.location.href="cart.html"
});
function updateBadgeUI(){
    let totalItems=0;
    //get json object array from local storage
    const localShopcart=localStorage.getItem('bean_cart');
    if(localShopcart){
        let myCart=JSON.parse(localShopcart);
        for(const item of myCart)
            totalItems += (item.qty || 0);
    }
    if (cartBadge){
        cartBadge.textContent=totalItems;
    }
}
document.addEventListener('DOMContentLoaded',updateBadgeUI);
updateBadgeUI();