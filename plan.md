# Plan de Trabajo: Unificación de Smorfia Web y Móvil

Este documento describe el plan de trabajo para mejorar y unificar las aplicaciones web y móvil de Smorfia.

## Objetivos

1.  **Unificación Visual y Funcional:** Lograr que la experiencia de usuario (UI/UX) sea idéntica en la plataforma web y en la aplicación móvil.
2.  **Mejora de Código:** Refactorizar el código para que sea más mantenible, escalable y profesional.
3.  **Fuente de Datos Única:** Asegurar que ambas aplicaciones consuman la misma información para garantizar la consistencia.

---

## Tareas Completadas

### Fase 1: Mejora y Refactorización de la App Web

-   [x] **Análisis Inicial:** Se revisó el `index.html` original para entender su funcionamiento.
-   [x] **Mejoras de UI/UX:**
    -   [x] Se eliminó el triángulo sobre la ruleta.
    -   [x] Se amplió la paleta de colores del mosaico de números.
    -   [x] Se corrigió el desborde de texto en el mosaico.
    -   [x] Se aseguró que la grilla de resultados de "Dame 6/8" sea siempre simétrica.
    -   [x] Se añadió una sección de "Detalles del Número" para enriquecer el resultado de la ruleta.
-   [x] **Refactorización de Código:**
    -   [x] Se separó el código monolítico de `index.html` en tres archivos: `index.html` (estructura), `style.css` (estilos) y `script.js` (lógica).
-   [x] **Centralización de Datos:**
    -   [x] Se extrajeron los datos de la Smorfia a un archivo `smorfiaData.js` para ser usado como fuente única de verdad.

### Fase 2: Unificación con la App Móvil (React Native)



-   [x] **Análisis de la App Móvil:** Se revisaron los archivos `App.tsx`, `HomeScreen.tsx`, `smorfiaData.ts` y `styles.ts`.

-   [x] **Sincronización de Datos:**

    -   [x] Se actualizó `smorfiaData.ts` con los datos consistentes y unificados de la versión web.

-   [x] **Sincronización de Estilos:**

    -   [x] Se actualizó la paleta de colores en `src/styles.ts`.

-   [x] **Rediseño de la Pantalla Principal (`HomeScreen.tsx`):**

    -   [x] Se reescribió por completo el componente para replicar la nueva interfaz web.

    -   [x] Se eliminó el modal y la barra de búsqueda.

    -   [x] Se implementó la nueva lógica para "Girar Ruleta" y "Dame 6/8".

    -   [x] Se diseñó el nuevo mosaico de números coloridos.

    -   [x] Se eliminaron los bordes redondeados y se ajustaron los estilos para cumplir con el diseño minimalista.



### Fase 3: Cambio de Requisitos - Foco en Definiciones



-   [x] **Eliminación de la Ruleta:** Se eliminó la funcionalidad y la interfaz de la ruleta tanto en la versión web como en la móvil, por no aportar valor al producto final.

-   [x] **Nueva Funcionalidad "DAME 1":** Se reemplazó el botón "Girar Ruleta" por "DAME 1".

-   [x] **Integración de Definiciones (Placeholder):**

    -   [x] Se implementó una función de ejemplo que simula una llamada a un modelo de IA (Gemini) para generar una definición ampliada del significado del número obtenido.

    -   [x] Se integró la visualización de esta definición en la interfaz de ambas aplicaciones.



---



## Próximos Pasos y Mejoras Futuras (Actualizado)



-   [ ] **Conectar Definiciones a una API Real:** Reemplazar la función de ejemplo `getGeminiDefinition` con una llamada real a una API de un modelo generativo para obtener definiciones dinámicas.

-   [ ] **Optimización de Componentes:**

    -   Revisar el rendimiento de las `FlatList` en la app móvil, especialmente la del mosaico principal. Considerar optimizaciones como `memo` para los `GridItem`.

-   [ ] **Pruebas y QA:**

    -   Realizar pruebas funcionales en ambas plataformas para asegurar que todo funcione como se espera.

-   [ ] **Limpieza de Código no Utilizado:**

    -   Eliminar el componente `DetailScreen.tsx` y su referencia en el navegador de `App.tsx`.

    -   Eliminar el componente `SearchBar.tsx`.
