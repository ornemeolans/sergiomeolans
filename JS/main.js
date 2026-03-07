/**
 * Sergio Meolans - Soguería de Autor
 * Lógica de Carga y Micro-interacciones
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ============================================
    // OBSERVADOR DE ELEMENTOS PARA ANIMACIONES
    // ============================================
    const observarElementos = () => {
        const elementos = document.querySelectorAll('.reveal, .producto-card, .fade-in-up');
        
        if (elementos.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        elementos.forEach(el => observer.observe(el));
    };

    // ============================================
    // CARGA DE PRODUCTOS DESDE JSON CON FILTRO
    // ============================================
    const cargarProductos = async (categoria = 'todos') => {
        const contenedor = document.getElementById("contenedor-productos");
        if (!contenedor) return;

        try {
            const response = await fetch("../productos.json");
            
            if (!response.ok) {
                throw new Error('Error al cargar productos');
            }
            
            const productos = await response.json();

            if (productos.length === 0) {
                contenedor.innerHTML = "<p class='text-center'>No hay productos disponibles en este momento.</p>";
                return;
            }

            // Filtrar productos si hay una categoría seleccionada
            const productosFiltrados = categoria === 'todos' 
                ? productos 
                : productos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());

            contenedor.innerHTML = productosFiltrados.map((producto, index) => `
                <div class="producto-card" style="transition-delay: ${index * 0.1}s">
                    <div class="img-wrapper">
                        <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy" onerror="this.src='../ASSETS/IMG/logo.png'">
                    </div>
                    <div class="card-info">
                        <span class="categoria">${producto.categoria}</span>
                        <h3>${producto.nombre}</h3>
                        <p class="small text-muted">${producto.descripcion}</p>
                        <span class="precio">${producto.precio}</span>
                    </div>
                </div>
            `).join("");

            // Iniciar observador después de cargar productos
            observarElementos();
            
        } catch (error) {
            console.error("Error cargando el catálogo:", error);
            contenedor.innerHTML = "<p class='text-center py-5'>No se pudo cargar el catálogo en este momento. Por favor, intenta más tarde.</p>";
        }
    };

    // ============================================
    // GENERAR BOTONES DE FILTRO
    // ============================================
    const generarFiltros = async () => {
        const filtroContenedor = document.getElementById("filtro-categorias");
        if (!filtroContenedor) return;

        try {
            const response = await fetch("../productos.json");
            const productos = await response.json();

            // Obtener categorías únicas
            const categorias = ['todos', ...new Set(productos.map(p => p.categoria))];

            filtroContenedor.innerHTML = categorias.map(cat => `
                <button class="btn btn-filter ${cat === 'todos' ? 'active' : ''}" 
                        data-categoria="${cat}">
                    ${cat === 'todos' ? 'Todos' : cat}
                </button>
            `).join("");

            // Agregar eventos a los botones
            document.querySelectorAll('.btn-filter').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    // Actualizar clase active
                    document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    
                    // Cargar productos filtrados
                    const categoria = e.target.dataset.categoria;
                    cargarProductos(categoria);
                });
            });

        } catch (error) {
            console.error("Error al cargar categorías:", error);
        }
    };

    // ============================================
    // INICIALIZAR
    // ============================================
    
    // Cargar productos si existe el contenedor
    cargarProductos();
    
    // Generar filtros si existe el contenedor
    generarFiltros();
    
    // Activar animaciones de reveal
    observarElementos();
    
    // ============================================
    // FORMULARIO DE CONTACTO CON FORMSPREE
    // ============================================
    const formulario = document.getElementById('contacto-form');
    if (formulario) {
        formulario.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = formulario.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Enviando...';
            submitBtn.disabled = true;

            try {
                const formData = new FormData(formulario);
                const response = await fetch(formulario.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Mostrar SweetAlert de éxito con colores de la página
                    Swal.fire({
                        icon: 'success',
                        title: '¡Mensaje enviado!',
                        text: 'Tu mensaje ha sido enviado correctamente. Te responderé a la brevedad.',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#a67b5b',
                        background: '#fdfcf9',
                        color: '#3e362e',
                        customClass: {
                            confirmButton: 'btn-swal-custom'
                        },
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            formulario.reset();
                            // Redireccionar a la página de inicio
                            window.location.href = '../index.html';
                        }
                    });
                } else {
                    throw new Error('Error en el envío');
                }
            } catch (error) {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente.',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#a67b5b',
                    background: '#fdfcf9',
                    color: '#3e362e'
                });
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

});

