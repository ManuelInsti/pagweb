let carrito = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);

        const producto = carrito.find(p => p.id === id);
        if (producto) {
            producto.quantity += 1;
        } else {
            carrito.push({ id, name, price, quantity: 1 });
        }

        actualizarCarrito();
    });
});
function actualizarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    carritoItems.innerHTML = '';
    let total = 0;

    carrito.forEach(producto => {
        const item = document.createElement('div');
        item.innerHTML = `
            <span>${producto.name} - $${producto.price} x ${producto.quantity}</span>
            <button class="remove-item" data-id="${producto.id}">Eliminar</button>
        `;
        carritoItems.appendChild(item);
        total += producto.price * producto.quantity;
    });
    document.getElementById('total').textContent = total;
    document.getElementById('cart-count').textContent = carrito.reduce((sum, p) => sum + p.quantity, 0);

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.dataset.id;
            carrito = carrito.filter(p => p.id !== id);
            actualizarCarrito();
        });
    });
}
new Swiper('.myswiper-1', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});