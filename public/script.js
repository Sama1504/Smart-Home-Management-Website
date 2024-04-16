const devices = {
    light: 'off',
    thermostat: 22,
    'door-lock': 'locked'
};

function toggleDevice(button) {
    const device = button.dataset.device;
    if (device === 'light') {
        devices[device] = devices[device] === 'on' ? 'off' : 'on';
    } else if (device === 'door-lock') {
        devices[device] = devices[device] === 'locked' ? 'unlocked' : 'locked';
    }
    updateDeviceStatus(device, button);
}

function updateTemp(button) {
    const device = button.dataset.device;
    const change = parseInt(button.dataset.change);
    devices[device] += change;
    updateDeviceStatus(device, button);
}

function updateDeviceStatus(device, button) {
    if (device === 'light') {
        button.textContent = devices.light === 'on' ? 'On' : 'Off';
    } else if (device === 'thermostat') {
        const tempDisplay = button.parentElement.querySelector('.temp-display');
        tempDisplay.textContent = `${devices.thermostat}°C`;
    } else if (device === 'door-lock') {
        button.textContent = devices['door-lock'] === 'locked' ? 'Locked' : 'Unlocked';
    }
}

// Add event listeners for device control buttons
document.querySelectorAll('[data-device]').forEach((deviceElement) => {
    const device = deviceElement.dataset.device;
    deviceElement.querySelector('button').addEventListener('click', () => {
        if (device === 'thermostat') {
            updateTemp(deviceElement.querySelector('button'));
        } else {
            toggleDevice(deviceElement.querySelector('button'));
        }
    });
});

// Navbar burger functionality
document.addEventListener('DOMContentLoaded', () => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {
                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        });
    }
});

function addToCart(productName) {
    var cart = JSON.parse(localStorage.getItem('cart')) || {};
    cart[productName] = cart[productName] ? cart[productName] + 1 : 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart: ' + productName);
}

// Function to load cart items from localStorage
function loadCartItems() {
    var cartItems = JSON.parse(localStorage.getItem('cart'));
    if (cartItems) {
        var cartContainer = document.getElementById('cart-items');
        Object.keys(cartItems).forEach(function (key) {
            var cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${key} - $${cartItems[key]}</p>
                <div class="quantity">
                    <button onclick="decreaseQuantity(this)">-</button>
                    <input type="text" value="${cartItems[key]}" readonly>
                    <button onclick="increaseQuantity(this)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(this)">Remove</button>
            `;
            cartContainer.appendChild(cartItem);
        });
    }
}

// Function to save cart items to localStorage
function saveCartItems(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to initialize cart
function initCart() {
    var cart = localStorage.getItem('cart');
    if (!cart) {
        localStorage.setItem('cart', JSON.stringify({}));
    }
    loadCartItems();
}

// Initialize cart on page load
initCart();

// Function to handle checkout
function checkout() {
    // Implement checkout functionality
    alert("Redirecting to checkout page...");
}

// Function to increase quantity
function increaseQuantity(button) {
    var input = button.previousElementSibling;
    var value = parseInt(input.value);
    input.value = value + 1;
    updateCart(button);
}

// Function to decrease quantity
function decreaseQuantity(button) {
    var input = button.nextElementSibling;
    var value = parseInt(input.value);
    if (value > 1) {
        input.value = value - 1;
        updateCart(button);
    }
}

// Function to remove item from cart
function removeFromCart(button) {
    var cartItem = button.parentElement;
    var itemName = cartItem.getElementsByTagName("p")[0].textContent.split(" - ")[0];
    var cart = JSON.parse(localStorage.getItem('cart'));
    delete cart[itemName];
    saveCartItems(cart);
    cartItem.remove();
}

// Function to update cart data
function updateCart(button) {
    var cartItem = button.parentElement.parentElement;
    var itemName = cartItem.getElementsByTagName("p")[0].textContent.split(" - ")[0];
    var quantityInput = cartItem.getElementsByClassName("quantity")[0].getElementsByTagName("input")[0];
    var cart = JSON.parse(localStorage.getItem('cart'));
    cart[itemName] = parseInt(quantityInput.value);
    saveCartItems(cart);
}
// Debugging code
try {
    // Add event listener for "Add to Cart" buttons
    document.querySelectorAll('.button.is-primary.is-outlined').forEach(button => {
        button.addEventListener('click', function() {
            var productName = this.parentNode.querySelector('.title.is-4').innerText;
            addToCart(productName);
        });
    });
} catch (error) {
    logErrors(error);
}
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Perform validation and login logic here
    // Example: send data to server for authentication
    console.log('Login clicked');
});

