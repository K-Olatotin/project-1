document.addEventListener('DOMContentLoaded', function() {
    const cart = [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartHeading = document.querySelector('.cart h2');
    
    const buttons = document.querySelectorAll('.btn');

    function updateCart() {
        cartItemsContainer.innerHTML = ''; 
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your added items will appear here</p>';
            cartHeading.textContent = 'Your Cart (0)';
        } else {
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <p><strong>${item.name}</strong> - $${item.price} (x${item.quantity})</p>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
            cartHeading.textContent = `Your Cart (${cart.length})`;
        }
    }

    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCart();
    }

    buttons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const product = button.parentElement;
            const productName = product.querySelector('h2').textContent;
            const productPrice = parseFloat(product.querySelector('p').textContent.substring(1));
            addToCart(productName, productPrice);
        });
    });

    updateCart();
});