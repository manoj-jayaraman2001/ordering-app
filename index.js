import { menuArray } from "./data.js";

const addedItems = []
const menuEl = document.getElementById('food-menu')
const ordersEl = document.getElementById('order')
const paymentModal = document.getElementById('payment-modal')

renderItems()



document.addEventListener('click',(e)=>{
    if(e.target.matches('.add-btn') || e.target.matches('.plus')) renderOrderItems(e)
})
function renderItems(){
    let getHtml = ``
    menuArray.forEach((item)=>{
        getHtml += `
            <div class = 'food'>
                <div class="emoji">${item.emoji}</div>
                    
                <div class="food-desc">
                    <h1>${item.name}</h1>
                    <p>${item.ingredients.join(',')}</p>
                    <h2>$ ${item.price}</h2>
                </div>
                <div class="add-btn" data-name = 'plus' data-id = ${item.id}>
                    <p class = 'plus' data-name = 'plus' data-id = ${item.id}>+</p>
                </div>
            </div>

        `
    })
    menuEl.innerHTML = getHtml
}

function renderOrderItems(e){
    const ordersList = document.getElementById('orders-list')
    addedItems.push(menuArray.filter((item) => {
        return (item.id == e.target.dataset.id)
    })[0])

    let itemsHtml = ``

    addedItems.forEach((item)=>{
        itemsHtml += `
                    <div class="order-item">
                        <h2 id="item1">${item.name}</h2>
                        <p class="remove" data-id="${item.id}">remove</p>
                        <p class="price">$ ${item.price}</p>
                    </div>
        `
    })

    ordersList.innerHTML = itemsHtml

    
    totalPrice()

    if(addedItems.length){
        ordersEl.style.display = 'inline';
    }
    
    const placeOrderBtn = document.getElementById('place-order')
    placeOrderBtn.addEventListener('click',()=>{
        paymentModal.style.display = 'inline'
        Pay()
    
})


}



function Pay(){
    const paymentForm = document.getElementById('payment-form')
    const msg = document.getElementById('msg')
    paymentForm.addEventListener('submit',(e)=>{
        e.preventDefault()

        msg.style.display = 'flex'
        paymentModal.style.display = 'none';
    })
}

function totalPrice(){
    let total_price = 0
    let sum = addedItems.forEach((item) =>{total_price+=item.price})
    let total = `
                    
                <h2>Total Price:</h2>
                <p class = 'price'>$ ${total_price}</p>
                    
    `
    document.getElementById('total-price').innerHTML = total;
}