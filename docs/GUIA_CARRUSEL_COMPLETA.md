# 🎠 GUÍA COMPLETA DEL CARRUSEL - IMPLEMENTACIÓN Y FUNCIONAMIENTO

**Última actualización:** 14 de noviembre de 2025

---

## 📖 Índice

1. [Estructura HTML](#estructura-html)
2. [Estilos CSS](#estilos-css)
3. [JavaScript](#javascript)
4. [Funcionalidades](#funcionalidades)
5. [Responsive Design](#responsive-design)
6. [Troubleshooting](#troubleshooting)

---

## 🏗️ Estructura HTML

### Contenedor Principal
```html
<section class="accesos-rapidos">
  <div class="carousel-container">
    <!-- Slides -->
    <!-- Botones integrados -->
    <!-- Barra de progreso -->
  </div>
</section>
```

### Slides
Cada slide contiene:
- `<div class="carousel-slide">` - Contenedor del slide
- `<img>` - Imagen (clickeable)
- `<div class="carousel-text">` - Texto overlay
- `<a class="carousel-btn">` - Botón (oculto visualmente)

### Botones Integrados
```html
<button class="carousel-btn-prev">❮</button>
<button class="carousel-btn-next">❯</button>
```
- Posicionados absolutamente dentro del carrusel
- Izquierda y derecha, centrados verticalmente
- Semi-transparentes con hover interactivo

### Barra de Progreso
```html
<div class="carousel-progress">
  <div class="progress-bar" style="width: 25%;"></div>
  <div class="progress-bar"></div>
  <div class="progress-bar"></div>
  <div class="progress-bar"></div>
</div>
```
- 4 barras para 4 slides
- Ubicada en la parte inferior interior
- La activa se resalta en color accent

---

## 🎨 Estilos CSS

### Contenedor (`.carousel-container`)
```css
position: relative;          /* Para absolute positioning */
overflow: hidden;            /* Oculta el desbordamiento */
border-radius: 12px;         /* Esquinas redondeadas */
background: #0f161c;         /* Fondo oscuro */
height: 400px;               /* Altura */
width: 100%;                 /* Ancho completo */
```

### Slides (`.carousel-slide`)
```css
display: none;               /* Ocultos por defecto */
position: relative;
height: 100%;
width: 100%;

/* Activos se muestran */
.carousel-slide.active {
  display: block;
  animation: fadeIn 0.5s ease-in-out;
}
```

### Imagen (`.carousel-slide img`)
```css
width: 100%;
height: 100%;
object-fit: cover;           /* Mantiene proporción */
filter: brightness(70%);     /* Oscurece la imagen */
cursor: pointer;             /* Indica clickeable */
border-radius: 12px;

/* Hover: Zoom + Brillo */
&:hover {
  filter: brightness(85%);
  transform: scale(1.1);
  transition: 0.3s ease;
}
```

### Botones Integrados
```css
.carousel-btn-prev,
.carousel-btn-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(42, 150, 212, 0.2);
  border: 1px solid rgba(42, 150, 212, 0.5);
  color: var(--accent-color);
  font-size: 1.8rem;
  padding: 10px 14px;
  border-radius: 6px;
  z-index: 10;
}

.carousel-btn-prev { left: 15px; }
.carousel-btn-next { right: 15px; }

/* Hover effect */
&:hover {
  background: rgba(42, 150, 212, 0.4);
  border-color: var(--accent-color);
  transform: translateY(-50%) scale(1.1);
}
```

### Barra de Progreso
```css
.carousel-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 3px;
  display: flex;
  gap: 2px;
  border-radius: 12px;
  overflow: hidden;
}

.progress-bar {
  flex: 1;
  background: rgba(42, 150, 212, 0.3);
  height: 100%;
  border-radius: 2px;
  transition: background 0.3s ease;
}

.progress-bar.active {
  background: var(--accent-color);  /* Cyan */
}
```

---

## ⚙️ JavaScript

### Inicialización
```javascript
const slides = document.querySelectorAll('.carousel-slide');
const nextBtn = document.querySelector('.carousel-btn-next');
const prevBtn = document.querySelector('.carousel-btn-prev');
const progressBars = document.querySelectorAll('.progress-bar');

let currentIndex = 0;
```

### Función Principal: `showSlide(index)`
```javascript
function showSlide(index) {
  // Mostrar slide activo
  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === index);
  });
  
  // Actualizar barra de progreso
  progressBars.forEach((bar, idx) => {
    bar.classList.toggle('active', idx === index);
  });
}
```

### Event Listeners
```javascript
// Botón siguiente
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
});

// Botón anterior
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
});

// Auto-advance cada 6 segundos
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}, 6000);
```

### Click en Imagen
```javascript
slides.forEach(slide => {
  const img = slide.querySelector('img');
  const link = slide.querySelector('a');
  
  if (img && link) {
    img.addEventListener('click', () => {
      window.location.href = link.href;
    });
  }
});
```

---

## ✨ Funcionalidades

### 1. **Navegación Manual**
- ✅ Botón anterior (❮) - Slide anterior
- ✅ Botón siguiente (❯) - Slide siguiente
- ✅ Ciclo continuo - Vuelve al inicio después del último

### 2. **Navegación por Click**
- ✅ Click en imagen navega a URL del slide
- ✅ Cursor cambia a pointer para indicar interacción

### 3. **Auto-Advance**
- ✅ Cambio automático cada 6 segundos
- ✅ Ininterrumpido (ciclo continuo)

### 4. **Indicadores Visuales**
- ✅ Barra de progreso sincronizada
- ✅ Zoom en hover (10%)
- ✅ Brillo aumentado en hover (70% → 85%)

---

## 📱 Responsive Design

### Desktop (> 1200px)
- Altura carrusel: 400px
- Botones: 1.8rem, padding 10px 14px
- Posición botones: left/right 15px

### Tablet (768px - 1200px)
- Altura carrusel: 300px
- Botones: 1.5rem, padding 8px 10px
- Posición botones: left/right 10px

### Mobile (< 480px)
- Altura carrusel: 200px
- Botones: 1.2rem, padding 6px 8px
- Posición botones: left/right 8px

---

## 🐛 Troubleshooting

### Problema: Los botones no aparecen
**Solución:** Verificar que `.carousel-container` tenga `position: relative`

### Problema: La imagen no hace zoom
**Solución:** Asegurar que `transform: scale(1.1)` esté en `.carousel-slide img:hover`

### Problema: La barra de progreso no se actualiza
**Solución:** Verificar que se esté añadiendo la clase `active` a los progress-bars

### Problema: El click en imagen no navega
**Solución:** Verificar que exista un `<a>` dentro de cada slide con la clase `carousel-btn`

### Problema: Los slides no avanzan automáticamente
**Solución:** Verificar que el `setInterval` esté dentro del `DOMContentLoaded` event

---

## 📝 Notas Importantes

- **Tiempo de auto-advance:** 6 segundos (modificable en el código)
- **Cantidad de slides:** 4 (agregar más slides y progress-bars si es necesario)
- **Colores:** Usa variables CSS (--accent-color, --primary-color, etc.)
- **Animaciones:** Todas tienen transiciones suaves de 0.3s

