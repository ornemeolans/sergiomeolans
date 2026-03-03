document.addEventListener('DOMContentLoaded', () => {
    // 1. Carga Dinámica de Productos
    const contenedor = document.getElementById('contenedor-productos');
    if (contenedor) {
        fetch('../productos.json')
            .then(res => res.json())
            .then(data => {
                data.forEach(prod => {
                    contenedor.innerHTML += `
                        <div class="col-12 col-md-6 col-lg-4">
                            <article class="card h-100 producto-card shadow-sm">
                                <div class="overflow-hidden">
                                    <img src="${prod.imagen}" class="card-img-top" alt="Soguería Sergio Meolans: ${prod.nombre}">
                                </div>
                                <div class="card-body text-center">
                                    <h3 class="h5 card-title text-uppercase">${prod.nombre}</h3>
                                    <p class="card-text small text-muted">${prod.description || prod.descripcion}</p>
                                </div>
                            </article>
                        </div>`;
                });
            });
    }

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
});