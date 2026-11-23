# SmartLab Monitor — Ionic React + TypeScript + Tailwind CSS

Proyecto desarrollado para el módulo profesional **Desarrollo de Interfaces (Código 0488)** — 2.º CFGS Desarrollo de Aplicaciones Multiplataforma (DAM).

---

## 🎯 Trazabilidad Curricular y Resultados de Aprendizaje

- **RA 1 — Confección de interfaces de usuario:** Arquitectura basada en flujo unidireccional de datos, separación de lógica de negocio y componentes desacoplados (`KpiCard.tsx`, `IncidentItem.tsx`).
- **RA 2 — Generación de interfaces declarativas:** Construcción declarativa mediante JSX y maquetación responsiva con clases utilitarias de Tailwind CSS y CSS Custom Properties para el Shadow DOM de Ionic.
- **RA 3 — Creación de componentes visuales:** Integración de controles híbridos nativos (`IonItemSliding`, `IonModal`, `IonSearchbar`, `IonSegment`, `IonRefresher`, `IonFab`), tipado estricto en TypeScript sin uso de `any` y persistencia con sincronización reactiva (`useIncidentsStorage.ts`).
- **RA 4 — Usabilidad y Accesibilidad (WCAG 2.2 AA):**
  - Diseño *Mobile-First* y completamente adaptativo a Tablet y Escritorio (RWD).
  - Áreas táctiles mínimas conformes a especificación ($\ge 44 \times 44\text{ px}$).
  - Contraste de color certificado $\ge 4.5:1$.
  - Navegación por teclado y atributos accesibles (`aria-label`, `labelPlacement="stacked"`).
- **RA 7 — Distribución y Despliegue:**
  - Configuración optimizada para Vercel con reglas de enrutamiento SPA (`vercel.json`).
  - Empaquetado multietapa mediante Dockerfile (`node:22-alpine` + `nginx:1.27-alpine`).

---

## 🧱 Estructura del Proyecto

```text
smartlab-ionic-tw/
├── src/
│   ├── components/
│   │   ├── KpiCard.tsx           # Componente modularizado para tarjeta de métrica KPI
│   │   └── IncidentItem.tsx      # Fila interactiva deslizable (IonItemSliding + Swipe Actions)
│   ├── hooks/
│   │   └── useIncidentsStorage.ts# Custom Hook con persistencia automática en localStorage
│   ├── pages/
│   │   ├── Home.tsx              # Vista principal RWD con métricas, filtros, listado y modal
│   │   └── IncidentDetail.tsx    # Ficha técnica detallada (/incident/:id) con edición
│   ├── theme/
│   │   └── variables.css         # Directivas Tailwind, tokens cromáticos y estilos de accesibilidad
│   ├── types/
│   │   └── incident.ts           # Interfaces de dominio (Incident, Priority, Status, Filter)
│   ├── App.tsx                   # Configuración del IonRouterOutlet y rutas
│   └── main.tsx                  # Punto de entrada de la aplicación React
├── vercel.json                   # Configuración de reescritura de rutas para despliegue en Vercel
├── Dockerfile                    # Contenedor de producción multietapa
├── nginx.conf                    # Configuración Nginx para servir la SPA
├── tailwind.config.js            # Configuración ESM de Tailwind CSS v3.4
└── package.json                  # Dependencias y scripts de construcción
```

---

## 💻 Puesta en Marcha Local

### Requisitos Previos
- Node.js $\ge 20$ LTS
- npm $\ge 10$

### 1. Instalación de dependencias
```bash
npm install
```

### 2. Ejecución en modo desarrollo (Vite)
```bash
npm run dev
```
La aplicación estará accesible en: `http://localhost:5173/`

### 3. Compilación de producción
```bash
npm run build
```
Genera los binarios optimizados en la carpeta `dist/`.

---

## 📱 Adaptabilidad RWD (Responsive Web Design)

La interfaz se adapta fluidamente a todos los dispositivos:
- **Mobile (360×800 px):** Rejilla KPI en 2 columnas, barra de búsqueda y filtros apilados verticalmente, gestos táctiles *Pull-to-Refresh* y deslizamiento lateral en incidencias (*Swipe Actions*), botón de acción flotante (FAB) fijo en la esquina inferior.
- **Tablet (768×1024 px):** Rejilla KPI de 4 columnas distribuidas proporcionalmente, barra de búsqueda y filtros alineados horizontalmente, modal en ventana flotante centrada con elevación.
- **Desktop (1280×800 px o superior):** Contenedor centralizado con ancho máximo optimizado (`max-w-6xl`), botones de acción rápida en cabecera y visualización ergonómica de listados e información técnica.

---

## 🚀 Despliegue en Vercel

El proyecto incluye el archivo `vercel.json` con la directiva `rewrites` hacia `index.html` para garantizar que la navegación directa y las recargas en rutas como `/incident/INC-101` funcionen sin generar errores 404 HTTP.

### Opción 1: Despliegue mediante Vercel CLI (Recomendado por Terminal)

1. Abrir terminal en la carpeta del proyecto:
   ```bash
   cd c:\Users\Daniel\Desktop\DI\smartlab-ionic-tw
   ```
2. Ejecutar el asistente de Vercel:
   ```bash
   npx vercel
   ```
3. Seguir los pasos interactivos:
   - Iniciar sesión en tu cuenta de Vercel (si no estás autenticado).
   - Confirmar el directorio raíz (`./`).
   - El framework detectará automáticamente **Vite**.
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Para desplegar directamente a producción:
   ```bash
   npx vercel --prod
   ```

### Opción 2: Despliegue mediante GitHub y Vercel Dashboard

1. Repositorio en GitHub:
   ```bash
   https://github.com/danidaroca/smartlab-ionic-tw.git
   ```
2. Accede a [vercel.com](https://vercel.com) e inicia sesión con GitHub.
3. Haz clic en **"Add New..."** -> **"Project"**.
4. Selecciona tu repositorio `smartlab-ionic-tw` e importa el proyecto.
5. Vercel configurará automáticamente el framework preset como **Vite** y el directorio de salida en `dist`.
6. Haz clic en **"Deploy"**. En menos de un minuto tendrás tu URL pública de producción (ej. `https://smartlab-ionic-tw.vercel.app`).

---

## 🐳 Despliegue en Contenedor Docker (RA 7)

Para verificar el empaquetado contenedorizado:

```bash
# Construir la imagen Docker
docker build -t smartlab-ionic-tw:1.0 .

# Ejecutar el contenedor en el puerto local 8080
docker run -d -p 8080:80 --name smartlab-container smartlab-ionic-tw:1.0
```
La aplicación estará disponible en `http://localhost:8080/`.
