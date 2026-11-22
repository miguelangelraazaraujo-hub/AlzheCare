# Implementación Lighthouse y adaptación PWA

**Rama:** `LightHouse`  
**Ámbito:** mejoras de rendimiento percibido, compatibilidad de pruebas y capacidades PWA del frontend de AlzheCare.

## 1. Objetivo

Esta rama reúne las mejoras realizadas durante la revisión con Lighthouse y la adaptación del frontend para ofrecer una experiencia básica de aplicación web progresiva (PWA).

## 2. Cambios realizados

### Adaptación PWA

- `public/manifest.webmanifest`: define los metadatos de la aplicación, el modo de visualización y los iconos.
- `public/sw.js`: implementa el almacenamiento en caché de recursos y una respuesta alternativa para la navegación cuando no hay conexión. Las peticiones a `/api/` quedan excluidas.
- `index.html`: incorpora el manifiesto, la descripción, el color del tema y el icono para dispositivos Apple.
- `src/main.jsx`: registra el Service Worker cuando la aplicación se ejecuta en producción.

### Skeleton loaders

Se añadieron indicadores visuales de carga en:

- `PublicHome.jsx`: contenido del artículo destacado.
- `CategoriesSection.jsx`: tarjetas de categorías.
- `ArticleList.jsx`: listado de artículos.

También se incorporaron estilos adaptables y soporte para `prefers-reduced-motion`.

### Configuración CORS

En `CorsConfig.java` se añadió el origen `http://localhost:4173`, manteniendo `http://localhost:5173`. Esto permite que el frontend ejecutado mediante Vite Preview se comunique con el backend durante las pruebas.

## 3. Ejecución y comprobación

Desde el directorio `frontend`:

```bash
npm run build
npm run preview
```

Abrir `http://localhost:4173` y comprobar:

1. Que la aplicación carga correctamente.
2. En DevTools → Application → Manifest, que el manifiesto se reconoce y muestra sus iconos.
3. En DevTools → Application → Service Workers, que el Service Worker está activo.
4. En DevTools → Application → Cache Storage, que aparecen los recursos almacenados.
5. En DevTools → Network, activar el modo Offline y comprobar las rutas `/publico`, `/publico/categorias` y `/bienvenida`.

## 4. Estado de las verificaciones

- Manifiesto reconocido correctamente.
- Service Worker activo (`activated and running`).
- Recursos presentes en Cache Storage y comprobados.
- Las tres rutas indicadas se probaron sin conexión.
- La instalación desde el navegador no se verificó.
- Las pruebas se realizaron en entorno local. El despliegue de producción debe utilizar HTTPS.

## 5. Observaciones

La caché permite recuperar los recursos de la interfaz que se hayan almacenado previamente, pero no proporciona funcionamiento offline de las operaciones que dependen del backend. Las peticiones `/api/` no se almacenan.

La configuración CORS incluida contempla los orígenes locales de desarrollo y previsualización. Para producción debe autorizarse el dominio HTTPS definitivo del frontend.

Las mejoras de contraste, recursos bloqueantes y cabeceras de seguridad identificadas durante la auditoría quedan como tareas pendientes, no como cambios implementados en esta rama.