import os
import base64
import subprocess
import shutil

BASE_DIR = r"C:\Users\Daniel\Desktop\DI\smartlab-ionic-tw"
DOCS_IMG_DIR = os.path.join(BASE_DIR, "docs", "images")
OUTPUT_HTML_PROJECT = os.path.join(BASE_DIR, "Entrega_React_Tailwind_RWD_Daniel_Daroca.html")
OUTPUT_PDF_PROJECT = os.path.join(BASE_DIR, "Entrega_React_Tailwind_RWD_Daniel_Daroca.pdf")
OUTPUT_HTML_DI = r"C:\Users\Daniel\Desktop\DI\Entrega_React_Tailwind_RWD_Daniel_Daroca.html"
OUTPUT_PDF_DI = r"C:\Users\Daniel\Desktop\DI\Entrega_React_Tailwind_RWD_Daniel_Daroca.pdf"

def get_b64(filename):
    p = os.path.join(DOCS_IMG_DIR, filename)
    if os.path.exists(p):
        with open(p, "rb") as f:
            return "data:image/png;base64," + base64.b64encode(f.read()).decode("utf-8")
    return ""

img_desktop = get_b64("01_home_desktop.png")
img_tablet = get_b64("08_rwd_tablet_home.png")
img_mobile = get_b64("07_rwd_mobile_home.png")
img_detail = get_b64("02_incident_detail.png")
img_edit_toast = get_b64("03_incident_edit_toast.png")
img_modal = get_b64("04_modal_creation.png")
img_vercel_home = get_b64("05_vercel_production_home.png")
img_mobile_detail = get_b64("09_rwd_mobile_detail.png")

raw_html = """<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Entrega React + Tailwind CSS RWD - Daniel Daroca</title>
  <style>
    @page {
      size: A4;
      margin: 16mm 14mm 18mm 14mm;
      @bottom-right {
        content: counter(page);
      }
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      line-height: 1.55;
      font-size: 10.5pt;
      margin: 0;
      padding: 0;
      background-color: #ffffff;
    }

    .page-break {
      page-break-after: always;
      break-after: page;
    }

    /* Portada */
    .cover-page {
      min-height: 88vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 2px solid #cbd5e1;
      border-radius: 14px;
      padding: 40px;
      box-sizing: border-box;
      background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    }

    .cover-header {
      border-bottom: 3px solid #2563eb;
      padding-bottom: 20px;
    }

    .cover-header .institution {
      font-size: 12pt;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 1.2px;
    }

    .cover-header .module {
      font-size: 19pt;
      font-weight: 800;
      color: #1d4ed8;
      margin-top: 6px;
    }

    .cover-body {
      margin-top: 30px;
    }

    .cover-body .badge {
      display: inline-block;
      background-color: #2563eb;
      color: white;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 9.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 16px;
    }

    .cover-body h1 {
      font-size: 25pt;
      line-height: 1.25;
      color: #0f172a;
      margin: 0 0 16px 0;
    }

    .cover-body .subtitle {
      font-size: 12.5pt;
      color: #475569;
      line-height: 1.45;
    }

    .cover-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 20px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      font-size: 9.5pt;
    }

    .cover-footer div strong {
      display: block;
      color: #64748b;
      font-size: 8.5pt;
      text-transform: uppercase;
      margin-bottom: 3px;
    }

    .cover-footer div span, .cover-footer div a {
      font-size: 10pt;
      font-weight: 600;
      color: #0f172a;
      text-decoration: none;
    }

    /* Encabezados */
    h2 {
      font-size: 15pt;
      color: #1d4ed8;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 6px;
      margin-top: 24px;
      margin-bottom: 12px;
    }

    h3 {
      font-size: 12pt;
      color: #0f172a;
      margin-top: 18px;
      margin-bottom: 8px;
    }

    p {
      margin: 0 0 10px 0;
      text-align: justify;
    }

    ul, ol {
      margin: 0 0 12px 0;
      padding-left: 22px;
    }

    li {
      margin-bottom: 5px;
    }

    /* Cajas destacadas */
    .callout {
      background-color: #f8fafc;
      border-left: 4px solid #2563eb;
      padding: 12px 16px;
      border-radius: 0 8px 8px 0;
      margin: 14px 0;
      font-size: 10pt;
    }

    .callout-success {
      background-color: #f0fdf4;
      border-left-color: #16a34a;
      color: #166534;
    }

    .callout-info {
      background-color: #eff6ff;
      border-left-color: #3b82f6;
      color: #1e40af;
    }

    .callout-purple {
      background-color: #faf5ff;
      border-left-color: #9333ea;
      color: #581c87;
    }

    /* Bloques de código */
    pre {
      background-color: #0f172a;
      color: #f8fafc;
      border-radius: 8px;
      padding: 12px 14px;
      font-family: 'Cascadia Code', 'Consolas', monospace;
      font-size: 8.5pt;
      line-height: 1.45;
      overflow-x: auto;
      margin: 10px 0 14px 0;
    }

    code {
      font-family: 'Cascadia Code', 'Consolas', monospace;
      background-color: #f1f5f9;
      color: #2563eb;
      padding: 2px 5px;
      border-radius: 4px;
      font-size: 9pt;
    }

    pre code {
      background-color: transparent;
      color: inherit;
      padding: 0;
    }

    /* Tablas */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 14px 0;
      font-size: 9.5pt;
    }

    th, td {
      border: 1px solid #cbd5e1;
      padding: 8px 12px;
      text-align: left;
    }

    th {
      background-color: #f1f5f9;
      color: #1e293b;
      font-weight: 700;
    }

    tr:nth-child(even) {
      background-color: #f8fafc;
    }

    /* Galería de imágenes y capturas */
    .img-card {
      background-color: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 10px;
      margin: 14px 0;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
      text-align: center;
      page-break-inside: avoid;
    }

    .img-card img {
      max-width: 100%;
      max-height: 380px;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
      display: block;
      margin: 0 auto;
    }

    .img-caption {
      margin-top: 8px;
      font-size: 9pt;
      font-weight: 600;
      color: #64748b;
    }

    .rwd-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin: 14px 0;
      page-break-inside: avoid;
    }

    .rwd-grid-item {
      background-color: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 8px;
      text-align: center;
    }

    .rwd-grid-item img {
      max-width: 100%;
      max-height: 290px;
      border-radius: 4px;
      display: block;
      margin: 0 auto;
    }

    .badge-pill {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 8pt;
      font-weight: 700;
      text-transform: uppercase;
    }
    .badge-blue { background-color: #dbeafe; color: #1e40af; }
    .badge-green { background-color: #dcfce7; color: #15803d; }
    .badge-amber { background-color: #fef3c7; color: #b45309; }
  </style>
</head>
<body>

  <!-- PORTADA -->
  <div class="cover-page">
    <div class="cover-header">
      <div class="institution">Ciclo Formativo de Grado Superior DAM / DAW</div>
      <div class="module">Desarrollo de Interfaces (Código 0488)</div>
    </div>

    <div class="cover-body">
      <div class="badge">Práctica Profesional · React & Tailwind CSS</div>
      <h1>Diseño Responsivo (RWD) con React, Ionic & Tailwind CSS</h1>
      <div class="subtitle">
        Construcción de la aplicación <strong>SmartLab Incident Manager</strong> con arquitectura basada en componentes desacoplados, sistema de diseño responsivo (Mobile, Tablet y Desktop), persistencia local reactiva y despliegue continuo en <strong>Vercel</strong>.
      </div>
    </div>

    <div class="cover-footer">
      <div>
        <strong>Alumno:</strong>
        <span>Daniel Daroca</span>
      </div>
      <div>
        <strong>Fecha de Entrega:</strong>
        <span>23 de Noviembre de 2026</span>
      </div>
      <div>
        <strong>Entorno Tecnológico:</strong>
        <span>Ionic React 8 / React 18 / Tailwind CSS 3.4 / Vite / TypeScript</span>
      </div>
      <div>
        <strong>Repositorio GitHub:</strong>
        <a href="https://github.com/danidaroca/smartlab-ionic-tw" target="_blank">github.com/danidaroca/smartlab-ionic-tw</a>
      </div>
      <div style="grid-column: span 2; border-top: 1px dashed #cbd5e1; padding-top: 8px;">
        <strong>URL de Producción (Vercel):</strong>
        <a href="https://smartlab-ionic-tw-red.vercel.app" target="_blank" style="color: #2563eb;">https://smartlab-ionic-tw-red.vercel.app</a>
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- SECCIÓN 1: ENUNCIADO Y OBJETIVOS -->
  <h2>1. Enunciado y Objetivos de la Práctica</h2>
  <p>
    La presente práctica tiene por objeto el dominio integral del desarrollo de interfaces visuales modernas utilizando <strong>React</strong> junto con el framework utilitario <strong>Tailwind CSS</strong> y controles híbridos de <strong>Ionic Framework</strong>. El caso de uso implementado corresponde a <strong>SmartLab Monitor</strong>, un sistema de gestión operativa y control de incidencias técnicas en laboratorios de informática.
  </p>

  <div class="callout callout-info">
    <strong>Requisitos exigidos en el enunciado:</strong>
    <ol style="margin-top: 6px; margin-bottom: 0;">
      <li>Crear un proyecto nuevo en <strong>React</strong> estructurado con sintaxis declarativa JSX y tipado estricto en <strong>TypeScript</strong>.</li>
      <li>Desarrollar el componente <strong>Home</strong> aplicando estilos utilitarios mediante <strong>Tailwind CSS</strong>.</li>
      <li>Garantizar un diseño completamente responsivo <strong>RWD (Responsive Web Design)</strong> con adaptación óptima para <strong>Desktop, Tablet y Mobile</strong>.</li>
      <li>Realizar el despliegue funcional en producción en <strong>Vercel</strong> y versionado en <strong>GitHub</strong>.</li>
    </ol>
  </div>

  <h3>Trazabilidad Curricular (Resultados de Aprendizaje y Criterios de Evaluación)</h3>
  <table>
    <thead>
      <tr>
        <th style="width: 22%;">Resultado de Aprendizaje</th>
        <th style="width: 28%;">Criterios Evaluados</th>
        <th>Evidencia y Aplicación Práctica</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>RA 1: Interfaces de Usuario</strong></td>
        <td>CE 1.a, CE 1.b</td>
        <td>Selección de herramientas multiplataforma, separación de lógica y presentación en componentes desacoplados (<code>KpiCard</code> e <code>IncidentItem</code>).</td>
      </tr>
      <tr>
        <td><strong>RA 2: Interfaces Declarativas</strong></td>
        <td>CE 2.b, CE 2.c, CE 2.d</td>
        <td>Construcción de vistas declarativas en JSX integrando clases de Tailwind CSS con variables CSS nativas para el Shadow DOM de Ionic.</td>
      </tr>
      <tr>
        <td><strong>RA 3: Componentes Visuales</strong></td>
        <td>CE 3.a, CE 3.c, CE 3.e</td>
        <td>Controles móviles nativos simulados (gestos <em>Pull-to-Refresh</em>, <em>Swipe Actions</em> deslizables, modales accesibles y Custom Hook de persistencia).</td>
      </tr>
      <tr>
        <td><strong>RA 4: Usabilidad y Accesibilidad</strong></td>
        <td>CE 4.b, CE 4.c, CE 4.d, CE 4.e</td>
        <td>Diseño <em>Mobile-First</em>, áreas táctiles mínimas &ge; 44 &times; 44 px, contraste cromático WCAG 2.2 AA (&ge; 4.5:1) y accesibilidad de teclado.</td>
      </tr>
      <tr>
        <td><strong>RA 7: Distribución y Despliegue</strong></td>
        <td>CE 7.a, CE 7.e</td>
        <td>Despliegue automatizado en <strong>Vercel</strong> con reglas SPA, repositorio Git versionado y empaquetado multietapa con <strong>Docker + Nginx</strong>.</td>
      </tr>
    </tbody>
  </table>

  <!-- SECCIÓN 2: BASE TEÓRICA -->
  <h2>2. Fundamentos Técnicos: Convivencia Ionic React y Tailwind CSS</h2>
  <p>
    La integración armoniosa entre Ionic Framework (v8) y Tailwind CSS (v3.4) exige una comprensión rigurosa de dos principios arquitectónicos fundamentales:
  </p>

  <h3>2.1. Frontera Shadow DOM vs. Light DOM</h3>
  <ul>
    <li><strong>Shadow DOM (Componentes Ionic):</strong> Componentes como <code>&lt;IonItem&gt;</code>, <code>&lt;IonButton&gt;</code> e <code>&lt;IonInput&gt;</code> encapsulan su árbol interno mediante Shadow Roots. Las clases de Tailwind aplicadas sobre la etiqueta no pueden penetrar directamente el DOM encapsulado; su estilizado se gobierna mediante <strong>CSS Custom Properties</strong> (ej. <code>--background</code>, <code>--padding-start</code>, <code>--border-radius</code>).</li>
    <li><strong>Light DOM (Contenedores y slots):</strong> Todo el contenido proyectado dentro de <code>&lt;IonContent&gt;</code> o etiquetas estándar (<code>&lt;div&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;main&gt;</code>) reside en el Light DOM. Aquí es donde opera Tailwind CSS con máxima eficiencia en sistemas de grid, flexbox, tipografía, transiciones y espaciados.</li>
  </ul>

  <h3>2.2. Configuración ESM en Ecosistema Vite</h3>
  <p>
    Al declarar <code>"type": "module"</code> en <code>package.json</code>, la configuración de Tailwind y PostCSS debe utilizar obligatoriamente sintaxis ECMAScript Modules (<code>export default</code>) para evitar fallos de compilación <code>ReferenceError: module is not defined</code>:
  </p>
  <pre><code>// tailwind.config.js (Sintaxis ESM compatible con Vite)
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Previene conflictos automáticos de paleta con Ionic
  theme: { extend: {} },
  plugins: [],
};</code></pre>

  <div class="page-break"></div>

  <!-- SECCIÓN 3: DISEÑO RESPONSIVO (RWD) -->
  <h2>3. Implementación del Diseño Responsivo (RWD) Multi-Dispositivo</h2>
  <p>
    El diseño de la aplicación sigue una metodología <strong>Mobile-First</strong>, empleando la rejilla fluida de Tailwind CSS (<code>grid</code>, <code>flex</code>, <code>sm:</code>, <code>md:</code>, <code>lg:</code>) para proporcionar una experiencia de usuario ergonómica adaptada a cualquier factor de forma:
  </p>

  <table>
    <thead>
      <tr>
        <th>Dispositivo</th>
        <th>Resolución de Prueba</th>
        <th>Adaptación del Layout</th>
        <th>Comportamiento Específico</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="badge-pill badge-blue">Mobile</span></td>
        <td>360 &times; 800 px / 375 &times; 812 px</td>
        <td>Rejilla KPI en <strong>2 columnas</strong> (2x2), controles apilados verticalmente.</td>
        <td>Gestos táctiles <em>Pull-to-Refresh</em>, deslizamiento lateral (*Swipe Actions*) para resolver/eliminar y botón flotante FAB.</td>
      </tr>
      <tr>
        <td><span class="badge-pill badge-amber">Tablet</span></td>
        <td>768 &times; 1024 px (iPad Portrait)</td>
        <td>Rejilla KPI en <strong>4 columnas</strong> horizontales, filtros alineados.</td>
        <td>Barra de búsqueda alineada en paralelo con los segmentos de filtro; botón de alta en cabecera habilitado.</td>
      </tr>
      <tr>
        <td><span class="badge-pill badge-green">Desktop</span></td>
        <td>1280 &times; 800 px + (Pantalla amplia)</td>
        <td>Contenedor centralizado con ancho máximo delimitado (<code>max-w-6xl</code>).</td>
        <td>Espaciado generoso, modal en ventana flotante centrada con sombra profunda, efectos <code>hover</code> en tarjetas.</td>
      </tr>
    </tbody>
  </table>

  <h3>Evidencia Visual Comparativa RWD: Mobile vs. Tablet vs. Desktop</h3>
  <div class="rwd-grid">
    <div class="rwd-grid-item">
      <img src="[[IMG_MOBILE]]" alt="Vista Mobile (375x812)">
      <div class="img-caption">Vista Mobile (375x812) — Rejilla KPI 2 cols y FAB</div>
    </div>
    <div class="rwd-grid-item">
      <img src="[[IMG_TABLET]]" alt="Vista Tablet (768x1024)">
      <div class="img-caption">Vista Tablet (768x1024) — Rejilla KPI 4 cols y cabecera expandida</div>
    </div>
  </div>

  <div class="img-card">
    <img src="[[IMG_DESKTOP]]" alt="Vista Desktop Completa">
    <div class="img-caption">Figura 1: Vista Desktop (1280x800) — Layout ergonómico con KPIs, búsqueda reactiva y listado de incidencias</div>
  </div>

  <div class="page-break"></div>

  <!-- SECCIÓN 4: MODULARIZACIÓN DE COMPONENTES -->
  <h2>4. Modularización de Componentes (RA 1 / RA 3)</h2>
  <p>
    Para evitar componentes monolíticos y promover el principio de responsabilidad única, se han desacoplado la tarjeta métrica KPI y la fila deslizable de incidencia hacia componentes independientes con tipado estricto:
  </p>

  <h3>4.1. Componente KpiCard (<code>src/components/KpiCard.tsx</code>)</h3>
  <p>
    Renderiza de forma aislada cada indicador clave, con soporte para icono tipado de Ionicons, colores condicionales y micro-interacciones hover:
  </p>
  <pre><code>export interface KpiCardProps {
  title: string;
  value: number;
  icon: string;
  iconColorClass: string;
  valueColorClass: string;
  sublabel?: string;
}

export const KpiCard: React.FC&lt;KpiCardProps&gt; = ({ title, value, icon, iconColorClass, valueColorClass, sublabel }) =&gt; (
  &lt;article className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs hover:shadow-md transition-all"&gt;
    &lt;div className="flex items-center justify-between text-slate-500"&gt;
      &lt;span className="text-xs font-semibold uppercase tracking-wider text-slate-500"&gt;{title}&lt;/span&gt;
      &lt;div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50"&gt;
        &lt;IonIcon icon={icon} className={`text-xl ${iconColorClass}`} /&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div className="mt-3 flex items-baseline justify-between"&gt;
      &lt;span className={`text-2xl sm:text-3xl font-extrabold ${valueColorClass}`}&gt;{value}&lt;/span&gt;
      {sublabel &amp;&amp; &lt;span className="text-xs text-slate-400"&gt;{sublabel}&lt;/span&gt;}
    &lt;/div&gt;
  &lt;/article&gt;
);</code></pre>

  <h3>4.2. Componente IncidentItem (<code>src/components/IncidentItem.tsx</code>)</h3>
  <p>
    Encapsula el comportamiento interactivo táctil mediante <code>IonItemSliding</code>. Permite abrir opciones deslizables (*Swipe Actions*) para marcar como resuelta o eliminar, e incluye un botón directo para acceder a la ficha técnica:
  </p>
  <pre><code>export interface IncidentItemProps {
  incident: Incident;
  onToggleStatus: (id: string) =&gt; void;
  onDelete: (id: string) =&gt; void;
  onViewDetails?: (id: string) =&gt; void;
}

// Integración de opciones ocultas laterales:
&lt;IonItemOptions side="end"&gt;
  &lt;IonItemOption color="success" onClick={() =&gt; onToggleStatus(incident.id)}&gt;
    &lt;IonIcon slot="icon-only" icon={checkmarkCircleOutline} /&gt;
  &lt;/IonItemOption&gt;
  &lt;IonItemOption color="danger" onClick={() =&gt; onDelete(incident.id)}&gt;
    &lt;IonIcon slot="icon-only" icon={trashOutline} /&gt;
  &lt;/IonItemOption&gt;
&lt;/IonItemOptions&gt;</code></pre>

  <!-- SECCIÓN 5: PERSISTENCIA LOCAL -->
  <h2>5. Persistencia Local y Sincronización (<code>useIncidentsStorage.ts</code>)</h2>
  <p>
    Cumpliendo el requisito de persistencia de datos (RA 3 / CE 3.c), se implementó el Custom Hook <code>useIncidentsStorage</code>, el cual mantiene sincronizado el estado reactivo con el <code>localStorage</code> del navegador:
  </p>
  <ul>
    <li><strong>Carga inicial tolerante a fallos:</strong> Si no existen datos previos o hay corrupción de JSON, se restauran las incidencias iniciales de demostración.</li>
    <li><strong>Sincronización automática:</strong> Cada mutación (altas, cambios de estado y eliminaciones) desencadena el efecto secundario de guardado.</li>
    <li><strong>Consistencia entre vistas:</strong> Tanto <code>Home.tsx</code> como <code>IncidentDetail.tsx</code> consumen la misma fuente de datos.</li>
  </ul>

  <div class="page-break"></div>

  <!-- SECCIÓN 6: VISTA DE DETALLE -->
  <h2>6. Vista de Detalle y Navegación Ionic (<code>IncidentDetail.tsx</code>)</h2>
  <p>
    Se registró en <code>IonRouterOutlet</code> la ruta dinámica <code>/incident/:id</code>, incorporando el botón de retroceso nativo de Ionic (<code>IonBackButton</code>):
  </p>
  <pre><code>&lt;IonRouterOutlet&gt;
  &lt;Route exact path="/home" component={Home} /&gt;
  &lt;Route exact path="/incident/:id" component={IncidentDetail} /&gt;
  &lt;Route exact path="/"&gt;
    &lt;Redirect to="/home" /&gt;
  &lt;/Route&gt;
&lt;/IonRouterOutlet&gt;</code></pre>

  <p>
    En la vista de detalle se despliega la ficha técnica íntegra de la incidencia (código, severidad, aula, hora de reporte, estado actual) y se habilita un formulario reactivo con <code>IonTextarea</code> para modificar y persistir la descripción del problema en tiempo real:
  </p>

  <div class="rwd-grid">
    <div class="rwd-grid-item">
      <img src="[[IMG_DETAIL]]" alt="Ficha Técnica Desktop">
      <div class="img-caption">Ficha Técnica en Desktop (/incident/INC-101)</div>
    </div>
    <div class="rwd-grid-item">
      <img src="[[IMG_MOBILE_DETAIL]]" alt="Ficha Técnica Mobile">
      <div class="img-caption">Ficha Técnica adaptada a Mobile con botón Atrás</div>
    </div>
  </div>

  <div class="img-card">
    <img src="[[IMG_EDIT_TOAST]]" alt="Edición de Descripción y Toast">
    <div class="img-caption">Figura 2: Edición de descripción técnica y confirmación reactiva con IonToast</div>
  </div>

  <!-- SECCIÓN 7: USABILIDAD Y ACCESIBILIDAD -->
  <h2>7. Usabilidad, Accesibilidad y Validación WCAG 2.2 AA</h2>
  <div class="callout callout-success">
    <strong>Verificaciones de accesibilidad superadas con éxito:</strong>
    <ul>
      <li><strong>Áreas táctiles mínimas (&ge; 44 &times; 44 px):</strong> Se forzó por CSS que botones, chips, elementos de lista y FAB superen las dimensiones ergonómicas recomendadas.</li>
      <li><strong>Contraste de color certificado (&ge; 4.5:1):</strong> Insignias de severidad (Alta en rojo oscuro sobre fondo suave, Media en ámbar y Baja en esmeralda) garantizan legibilidad bajo estándar WCAG AA.</li>
      <li><strong>Navegación accesible:</strong> Etiquetas <code>aria-label</code> explícitas en botones de acción y estructura semántica con encabezados jerárquicos (<code>h1</code>, <code>h2</code>, <code>h3</code>).</li>
      <li><strong>Operabilidad por teclado:</strong> Modal de creación completamente navegable con tabulador y cierre mediante tecla Escape.</li>
    </ul>
  </div>

  <div class="img-card">
    <img src="[[IMG_MODAL]]" alt="Modal Accesible de Creación">
    <div class="img-caption">Figura 3: Modal accesible de creación de incidencias técnicas con campos validados</div>
  </div>

  <div class="page-break"></div>

  <!-- SECCIÓN 8: DESPLIEGUE EN VERCEL Y DOCKER -->
  <h2>8. Despliegue en Producción en Vercel y Empaquetado Docker</h2>

  <h3>8.1. Despliegue Continuo en Vercel</h3>
  <p>
    Para evitar el clásico error <code>404 Not Found</code> al recargar rutas profundas de React Router como <code>/incident/INC-101</code>, se configuró el archivo <code>vercel.json</code> con reescrituras hacia el punto de entrada SPA:
  </p>
  <pre><code>{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}</code></pre>

  <div class="callout callout-purple">
    <strong>Enlaces Oficiales de la Entrega:</strong><br>
    🚀 <strong>URL Pública de Producción (Vercel):</strong> <a href="https://smartlab-ionic-tw-red.vercel.app" target="_blank"><strong>https://smartlab-ionic-tw-red.vercel.app</strong></a><br>
    🐙 <strong>Repositorio en GitHub:</strong> <a href="https://github.com/danidaroca/smartlab-ionic-tw" target="_blank"><strong>https://github.com/danidaroca/smartlab-ionic-tw</strong></a>
  </div>

  <div class="img-card">
    <img src="[[IMG_VERCEL_HOME]]" alt="Despliegue Vercel en Vivo">
    <div class="img-caption">Figura 4: Despliegue en vivo en Vercel respondiendo con HTTP 200 OK y protocolo HTTPS seguro</div>
  </div>

  <h3>8.2. Empaquetado Multietapa en Docker (RA 7)</h3>
  <p>
    Para cumplimiento del criterio CE 7.a, se incluye el <code>Dockerfile</code> optimizado en dos fases: compilación sobre Node 22 Alpine y distribución ultraligera mediante Nginx 1.27:
  </p>
  <pre><code># Etapa 1: Compilación
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servidor Web Nginx
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]</code></pre>

  <!-- SECCIÓN 9: CONCLUSIONES -->
  <h2>9. Conclusión y Valoración Técnica</h2>
  <p>
    La implementación de <strong>SmartLab Monitor</strong> demuestra la madurez del stack <strong>Ionic React + Tailwind CSS</strong> para el desarrollo de interfaces modernas. La combinación de controles híbridos de alto rendimiento con el poder declarativo de las utilidades de Tailwind permite una velocidad de maquetación superior sin renunciar a la adaptabilidad responsiva ni a los estándares estrictos de accesibilidad. Asimismo, la integración continua con <strong>GitHub</strong> y el despliegue automático en <strong>Vercel</strong> consolidan un flujo de trabajo profesional acorde a las demandas actuales de la industria del software.
  </p>

</body>
</html>
"""

# Reemplazos de imágenes
html_final = raw_html
html_final = html_final.replace("[[IMG_DESKTOP]]", img_desktop)
html_final = html_final.replace("[[IMG_TABLET]]", img_tablet)
html_final = html_final.replace("[[IMG_MOBILE]]", img_mobile)
html_final = html_final.replace("[[IMG_DETAIL]]", img_detail)
html_final = html_final.replace("[[IMG_EDIT_TOAST]]", img_edit_toast)
html_final = html_final.replace("[[IMG_MODAL]]", img_modal)
html_final = html_final.replace("[[IMG_VERCEL_HOME]]", img_vercel_home)
html_final = html_final.replace("[[IMG_MOBILE_DETAIL]]", img_mobile_detail)

# Guardar archivos HTML
with open(OUTPUT_HTML_PROJECT, "w", encoding="utf-8") as f:
    f.write(html_final)

shutil.copy(OUTPUT_HTML_PROJECT, OUTPUT_HTML_DI)
print(f"HTML generado en {OUTPUT_HTML_PROJECT} y {OUTPUT_HTML_DI}")

# Convertir HTML a PDF usando Microsoft Edge Headless
edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
cmd = [
    edge_path,
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={OUTPUT_PDF_PROJECT}",
    OUTPUT_HTML_PROJECT
]

print("Generando PDF mediante Edge headless...")
result = subprocess.run(cmd, capture_output=True, text=True)
print("Resultado Edge:", result.returncode)

if os.path.exists(OUTPUT_PDF_PROJECT):
    shutil.copy(OUTPUT_PDF_PROJECT, OUTPUT_PDF_DI)
    size_kb = os.path.getsize(OUTPUT_PDF_DI) / 1024
    print(f"PDF generado con exito ({size_kb:.1f} KB):")
    print(f" -> {OUTPUT_PDF_PROJECT}")
    print(f" -> {OUTPUT_PDF_DI}")
else:
    print("Error: No se encontro el archivo PDF de salida.")
