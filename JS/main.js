// Carga dinámica de productos y Micro-interacciones
const cargarProductos = async () => {
    // Buscamos el ID exacto que definimos en el HTML
    const contenedor = document.getElementById("contenedor-productos");
    
    // Si no estamos en la página de productos, salimos de la función
    if (!contenedor) return;

    try {
        const response = await fetch("../productos.json");
        if (!response.ok) throw new Error("No se pudo cargar el archivo JSON");
        
        const productos = await response.json();

        contenedor.innerHTML = ""; 

        productos.forEach((producto, index) => {
            const card = document.createElement("div");
            card.className = "producto-card reveal";
            card.style.transitionDelay = `${index * 0.1}s`;

            card.innerHTML = `
                <div class="img-wrapper">
                    <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
                </div>
                <div class="card-info">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcion}</p>
                    <span class="precio">${producto.precio}</span>
                </div>
            `;
            contenedor.appendChild(card);
        });
        
        // Disparar la observación de scroll para los nuevos elementos
        observarElementos();
        
    } catch (error) {
        console.error("Error técnico detectado:", error);
        contenedor.innerHTML = `<div class="error-msg">Error al cargar el catálogo. Por favor, intenta de nuevo más tarde.</div>`;
    }
};

document.addEventListener("DOMContentLoaded", cargarProductos);

document.addEventListener("DOMContentLoaded", cargarProductos);

    // 2. Validación de Formulario (Contacto)
    const form = document.getElementById('contacto-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;

            if (!nombre || !email) {
                e.preventDefault();
                alert("Por favor, completa los campos obligatorios para contactar a Sergio.");
            }
        });
    }


// Lógica de Scroll Reveal con Intersection Observer
const observarElementos = () => {
    const elementos = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15 // Se activa cuando el 15% del elemento es visible
    });

    elementos.forEach(el => observer.observe(el));
};

document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
    observarElementos();
});