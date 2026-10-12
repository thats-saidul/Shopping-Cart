
const products = [
    {
        id: 1,
        name: "Laptop",
        category: "Electronics",
        price: 65000,
        stock: 10,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Wireless Mouse",
        category: "Accessories",
        price: 850,
        stock: 50,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Mechanical Keyboard",
        category: "Accessories",
        price: 3200,
        stock: 25,
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Monitor 24 inch",
        category: "Electronics",
        price: 14500,
        stock: 15,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "USB-C Hub",
        category: "Accessories",
        price: 1800,
        stock: 30,
        image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Headphones",
        category: "Audio",
        price: 2500,
        stock: 20,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "Webcam",
        category: "Electronics",
        price: 4200,
        stock: 12,
        image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        name: "USB Flash Drive 64GB",
        category: "Storage",
        price: 750,
        stock: 40,
        image: "https://images.unsplash.com/photo-1618410320928-25228d811631?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 9,
        name: "External SSD 1TB",
        category: "Storage",
        price: 11500,
        stock: 8,
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 10,
        name: "Laptop Stand",
        category: "Accessories",
        price: 1600,
        stock: 18,
        image: "/laptopstand.jpg"
    }
];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const paymentSlip = document.getElementById("payment-slip");
const slipDetails = document.getElementById("slip-details");
const customerFormSection = document.getElementById("customer-form-section");
const customerNameInput = document.getElementById("customer-name");
const customerPhoneInput = document.getElementById("customer-phone");
const printSlipBtn = document.getElementById("print-slip-btn");

let cart = [];
let baseSlipHTML = "";




function displayProducts() {
    productList.innerHTML = "";

    products.forEach(product => {
        productList.innerHTML += `
            <div class="product-card">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-image"
                >

                <div class="product-info">

                    <h3>${product.name}</h3>

                    <p class="category">
                        Category: ${product.category}
                    </p>

                    <p class="price">
                        Price: ৳${product.price.toLocaleString("en-US")}
                    </p>

                    <p class="stock">
                        Stock: ${product.stock}
                    </p>

                    <label class="select-product">
    <input
        type="checkbox"
        class="product-checkbox"
        value="${product.id}"
        onchange="toggleCart(${product.id}, this.checked)"
    >
    Select Product
                    </label>

                </div>
            </div>
        `;
    });
}

displayProducts();
displayProducts();

function toggleCart(productId, isSelected) {
    const selectedProduct = products.find(product => {
        return product.id === productId;
    });

    if (!selectedProduct) {
        return;
    }

    if (isSelected) {
        const alreadyInCart = cart.some(product => {
            return product.id === productId;
        });

        if (!alreadyInCart) {
            cart.push(selectedProduct);
        }
    } else {
        cart = cart.filter(product => {
            return product.id !== productId;
        });
    }

    displayCart();
}



    //cart ee je item gula ache segulo show korbe 
   // displayCart();
//;




function displayCart() {

    // Clear previous cart display
    cartItems.innerHTML = "";

    // Handle empty cart
    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "0";
        return;
    }

    let total = 0;

    cart.forEach(product => {

        // Add product price to total
        total += product.price;

        cartItems.innerHTML += `
            <div class="cart-item">

                <div class="cart-product-info">
                    <h4>${product.name}</h4>

                    <p>
                        Price: ৳${product.price.toLocaleString("en-US")}
                    </p>
                </div>

                <button class="remove-btn" onclick="removeFromCart(${product.id})">
                    Remove
                </button>

            </div>
        `;
    });

    // Update total price
    cartTotal.textContent = total.toLocaleString("en-US");

}



function removeFromCart(productId) {
    cart = cart.filter(product => {
        return product.id !== productId;
    });

        // Update cart display and total
        displayCart();
    };


function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Please select a product first.");
        return;
    }

    paymentSlip.hidden = true;
    customerFormSection.hidden = false;

    customerNameInput.value = "";
    customerPhoneInput.value = "";

    customerFormSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    customerNameInput.focus();
}



function generatePaymentSlip() {
    const customerName = customerNameInput.value.trim();
    const customerPhone = customerPhoneInput.value.trim();

    // Validate name
    if (
        customerName.length < 2 ||
        !/^[\p{L}\p{M} .'-]+$/u.test(customerName)
    ) {
        alert("Please enter a valid name.");
        customerNameInput.focus();
        return;
    }

    // Validate phone number
    if (!/^\d{11}$/.test(customerPhone)) {
        alert("Phone number must contain exactly 11 digits.");
        customerPhoneInput.focus();
        return;
    }

    const orderId = "ORD-" + Date.now();
    const orderDate = new Date().toLocaleString("en-BD");

    let total = 0;

    cart.forEach(product => {
        total += product.price;
    });

    let slipHTML = `
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Date:</strong> ${orderDate}</p>
        <hr>
        <h3>Purchased Products</h3>
        <ul>
    `;

    cart.forEach(product => {
        slipHTML += `
            <li>
                ${product.name} —
                ৳${product.price.toLocaleString("en-US")}
            </li>
        `;
    });

    slipHTML += `
        </ul>
        <hr>
        <h3>Total: ৳${total.toLocaleString("en-US")}</h3>
        <p>Thank you for shopping with us!</p>
    `;

    baseSlipHTML = slipHTML;
    slipDetails.innerHTML = baseSlipHTML;

    customerFormSection.hidden = true;
    paymentSlip.hidden = false;

    paymentSlip.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


function printSlip() {
    window.print();
}


