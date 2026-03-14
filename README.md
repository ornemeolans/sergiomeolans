# Sergio Meolans Soguería Criolla 🐎

Este proyecto es el sitio web oficial y catálogo digital de **Sergio Meolans Soguería**, un emprendimiento dedicado al arte de la soguería criolla y marroquinería artesanal en Córdoba, Argentina. El sitio combina una estética tradicional con una experiencia de usuario moderna.

## 🌟 Sobre el Proyecto
La web tiene como objetivo principal mostrar el proceso artesanal y la calidad de los productos fabricados a mano, permitiendo a los clientes explorar el catálogo y conocer la historia detrás de cada pieza.

### Secciones principales:
- **Catálogo de Productos**: Visualización detallada de artículos como cintos, cuchillos, agendas y accesorios de cuero.
- **Proceso de Producción**: Una sección dedicada a explicar las técnicas tradicionales y materiales utilizados en la soguería.
- **Mi Historia**: Trayectoria de Sergio Meolans en el oficio artesanal.
- **Contacto**: Vínculos directos para consultas personalizadas y ubicación.

## 🛠️ Tecnologías y Herramientas
El sitio fue desarrollado utilizando un flujo de trabajo moderno para asegurar escalabilidad y mantenibilidad:

- **HTML5 & JavaScript**: Lógica para la carga dinámica de productos desde archivos JSON.
- **SASS / SCSS**: Arquitectura de estilos avanzada utilizando variables, mixins y parciales para un diseño coherente y fácil de actualizar.
- **Bootstrap**: Implementación de componentes responsivos y grillas.
- **JSON**: Gestión de datos de productos para facilitar la actualización del inventario sin modificar el código base.
- **Netlify**: Configuración de despliegue continuo para la plataforma.

## 📂 Estructura del Repositorio
```text
/
├── ASSETS/         # Imágenes de productos (WebP optimizado) y logotipos
├── CSS/            # Estilos compilados
├── JS/             # Scripts para el manejo del DOM y filtrado de productos
├── PAGES/          # Vistas secundarias (Productos, Historia, Producción)
├── SCSS/           # Código fuente de estilos (SASS) con parciales y variables
├── productos.json  # Base de datos local de artículos
└── index.html      # Página principal
