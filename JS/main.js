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
    
    // Validación de formulario de contacto
    const formulario = document.getElementById('contacto-form');
    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Crear mensaje de WhatsApp
            const texto = `Hola, soy ${nombre}. Mi email es ${email}. Mi mensaje: ${mensaje}`;
            const urlWhatsApp = `https://wa.me/5493516560696?text=${encodeURIComponent(texto)}`;
            
            // Abrir WhatsApp
            window.open(urlWhatsApp, '_blank');
            
            // Limpiar formulario
            formulario.reset();
            
            alert('Gracias por tu mensaje. Serás redirigido a WhatsApp para enviar tu consulta.');
        });
    }

});

