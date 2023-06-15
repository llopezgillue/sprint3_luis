// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
const products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]
// Array with products (objects) added directly with push(). Products in this array are repeated.
let cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
let cart = [];

let total = 0;

// Exercise 1


function buy(id) {

    for (let i = 0; i <= products.length - 1; i++) {

        if (i === (id - 1)) {

            cartList.push(products[i])
        }
    }
    //console.log("products", products[id - 1])
    //console.log("cartList", cartList)

    document.getElementById("count_product").innerHTML = cartList.length;


}

// 1. Loop for to the array products to get the item to add to cart
// 2. Add found product to the cartList array


// Exercise 2
function cleanCart() {

    cartList.splice(0, cartList.length)
    cart.splice(0, cart.lenght)

    document.getElementById("count_product").innerHTML = cartList.length
    document.getElementById("cart_list").innerHTML = ""
    document.getElementById("total_price").innerHTML = "0"

}

// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array

    total = 0

    for (let i = 0; i < cartList.length; i++) {
        const product = cartList[i];
        total += product.price;
    }

    document.getElementById("total_price").innerHTML = total.toFixed(2);
}

// Exercise 4
function generateCart() {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.

    cart = []

    for (let i = 0; i < cartList.length; i++) {

        const productForChose = cartList[i];
        const productChosed = cart.findIndex((product) => product.id === productForChose.id)

        if (productChosed === -1) {

            productForChose.quantity = 1;
            productForChose.subtotal = productForChose.price;
            cart.push(productForChose)
            console.log(productChosed)
        }
        else {
            cart[productChosed].quantity += 1;
            cart[productChosed].subtotal += productChosed.price

        }
    }
}


// Exercise 5
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"

    total = 0;

    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];

        if (product.id === 1 && product.quantity >= 3) {
            product.subtotalWithDiscount = product.quantity * 10;
        } else if (product.id === 3 && product.quantity >= 10) {
            product.subtotalWithDiscount = product.quantity * product.price * 0.66;
        } else {
            product.subtotalWithDiscount = product.quantity * product.price;
        }

        total += product.subtotalWithDiscount;
    }

    document.getElementById("total_price").innerHTML = total.toFixed(2);
}


// Exercise 6
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom


    applyPromotionsCart()

    let printedCart = []

    for (let i = 0; i < cart.length; i++) {

        printedCart.push(
            `<tr>
            <th>${cart[i].name}</th>
            <td>${cart[i].price}</td> 
            <td>${cart[i].quantity}</td>
            <td>${cart[i].subtotalWithDiscount.toFixed(2)}</td>
            <td><a type="button" onclick="removeFromCart(${cart[i].id})">
            <i class="fa fa-trash" aria-hidden="true"></i></a></td>
            </tr>`);

    }

    document.getElementById("cart_list").innerHTML = printedCart.join('')

}

// ** Nivell II **

// Exercise 7
function addToCart(id) {
    // Refactor previous code in order to simplify it 
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.


    const product = products.find((product) => product.id === id)
    if (product) {
        const productIndex = cart.findIndex((productInCart) => productInCart.id === product.id)

        if (productIndex === -1) {
            product.quantity = 1
            cart.push(product)
        } else {
            cart[productIndex].quantity += 1
        }

        cartList.push(product)
        calculateTotal(cartList)
        document.getElementById("count_product").innerHTML = cartList.length
    }
}



// Exercise 8
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array


    const cartPosition = cart.findIndex((item) => item.id === id)
    const cartListPosition = cartList.findIndex((item) => item.id === id)

    if (cartPosition !== -1 && cartListPosition !== -1) {
        if (cart[cartPosition].quantity > 1) {
            cart[cartPosition].quantity -= 1
        } else {
            cart.splice(cartPosition, 1)
        }
        cartList.splice(cartListPosition, 1)
    }
    calculateTotal();
    printCart();
    document.getElementById("count_product").innerHTML = cartList.length

    console.log(cartList)
    console.log(cart)

}

function open_modal() {
    console.log("Open Modal");
    generateCart();
    printCart();
}

window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".fixed-navbar")
    if (window.pageYOffset > 0) {
        navbar.classList.add("fixed-top")

    } else {
        navbar.classList.remove("fixed-top")
    }

})
