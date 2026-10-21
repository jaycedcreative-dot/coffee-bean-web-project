//alert("Ready")
// Pricing Data Structure
        const pricingData = {
            monthly: {
                starter: { price: "$9.99", period: "/month" },
                pro: { price: "$24.99", period: "/month" },
                vip: { price: "$49.99", period: "/month" }
            },
            yearly: {
                starter: { price: "$89.99", period: "/year" },
                pro: { price: "$229.99", period: "/year" },
                vip: { price: "$469.99", period: "/year" }
            }
        };


    const toggleEl=document.getElementById("billingToggle");
    toggleEl.addEventListener('change', ()=>{
        //alert("You Chnage The Switch :" + toggleEl.checked)
        const cycle=toggleEl.checked?'yearly':'monthly';

        //Starter Card
        document.getElementById("priceStarter").textContent=
            pricingData[cycle].starter.price;
        document.getElementById("periodStarter").textContent=
            pricingData[cycle].starter.period;

            //Pro card
        document.getElementById("pricePro").textContent=
            pricingData[cycle].pro.price;
        document.getElementById("periodPro").textContent=
            pricingData[cycle].pro.period;

        //Vip Card
        document.getElementById("priceVIP").textContent=
            pricingData[cycle].vip.price;
        document.getElementById("periodVIP").textContent=
            pricingData[cycle].vip.period;
        
    });

        // Toastify xwhen you click Claim Btn
    const claimBtn = document.querySelector(".claim-btn");

    claimBtn.addEventListener("click", () => {
        Toastify({
            text: "🎁 30% discount claimed successfully!",
            duration: 3000,
            gravity: "top",
            position: "right",
            close: true,
            stopOnFocus: true
    }).showToast();

    });
        /* Showing Toastify message when chosing an event */
    document.querySelectorAll(".plan-btn").forEach(button => { button.addEventListener("click", () => {
    const planName = button.textContent.trim();

        Toastify({
            text: `☕️ ${planName} selected successfully!`,
            duration: 3000,
            gravity: "top",
            position: "right",
            close: true,
            stopOnFocus: true
    }).showToast();

    });
        
});
