# Sistema de Gestión Técnica - Sanchez

## Información Básica

### Título
**Sistema de Gestión Técnica en Refrigeración - Sanchez**

### Descripción
Sistema web interactivo para la gestión de solicitudes y servicios técnicos en refrigeración. Proporciona una interfaz de cliente para solicitar servicios (instalación, mantenimiento, reparación) y un panel técnico para que el equipo de trabajo gestione la agenda de servicios, controle el estado de cada trabajo y realice el seguimiento de cobros diarios.

### Objetivo Principal
Facilitar la comunicación y gestión entre clientes y técnicos, permitiendo:
- Que los clientes soliciten servicios y obtengan presupuestos aproximados
- Que los técnicos gestionen su agenda de trabajos
- Automatizar el cálculo de costos según el tipo de servicio
- Mantener un registro actualizado de ingresos diarios

### Autor
**Daisi Pino**  
Estudiante de Práctica Profesionalizante  
Instituto de Educación Superior (IES)

### Fecha de Creación
**26 de febrero de 2026**

---

## Estructura del Proyecto

### Archivos Clave

#### **Panel Cliente** (para solicitar servicios)
- **`cliente.html`** - Interfaz principal del cliente
  - Contiene el formulario de solicitud de servicios
  - Tabla dinámica que muestra todas las solicitudes cargadas
  - Cálculo automático del total estimado
  - Enlaces a redes sociales (WhatsApp)

- **`cliente.css`** - Estilos visuales del panel cliente
  - Variables CSS para mantener consistencia de colores
  - Diseño responsivo para dispositivos móviles
  - Estilos de formularios, botones y tablas
  - Animaciones sutiles en elementos interactivos

- **`cliente.js`** - Lógica funcional del panel cliente
  - Validación de formularios
  - Limpieza de caracteres especiales en entradas
  - Gestión dinámica de solicitudes en memoria
  - Cálculo de costos según tipo de servicio
  - Actualización automática de tabla y total

#### **Panel Técnico** (para gestionar servicios)
- **`tecnico.html`** - Interfaz del panel técnico
  - Formulario para registrar servicios agendados
  - Tabla con estado actualizable de cada servicio
  - Total ganado del día calculado automáticamente
  - Enlaces internos para actualizar el panel

- **`tecnico.css`** - Estilos visuales del panel técnico
  - Paleta de colores profesional
  - Diseño responsivo
  - Estilos diferenciados para botones de envío y reset
  - Transiciones suaves en elementos interactivos

- **`tecnico.js`** - Lógica funcional del panel técnico
  - Registro de servicios con estado (Pendiente, En camino, Finalizado)
  - Cálculo automático de ingresos cuando se finaliza un servicio
  - Eliminación de registros con ajuste automático del total
  - Validación de campos obligatorios

---

## Tecnologías Utilizadas

### HTML5
- Estructura semántica correcta
- Etiquetas modernas: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Uso de `<fieldset>` y `<legend>` para agrupar campos de formularios
- Etiquetas `<table>` con `<thead>`, `<tbody>` para tablas estructuradas
- Elementos multimedia: `<figure>`, `<figcaption>`, `<img>`

### CSS3
- **Variables CSS** (custom properties) para mantener colores consistentes
- **Flexbox** para alineación y distribución de elementos
- **CSS Grid** para layout responsivo de formularios
- **Transiciones** para animaciones suaves en botones y elementos
- **@media queries** para adaptarse a pantallas de hasta 768px de ancho
- **Dos familias de fuentes**: Arial (sans-serif) y Helvetica (serif)
- Estados **hover** en selectores y botones

### JavaScript Vanilla
- **Escuchadores de eventos** (`addEventListener`) para formularios
- **Manipulación del DOM** para crear y eliminar elementos dinámicamente
- **Arreglos** para almacenar datos en memoria
- **Funciones de validación** para garantizar datos completos
- **Expresiones regulares** para limpiar entradas (`cleanInputString`)
- **Funciones globales** (`window.eliminarSolicitud`, `window.cambiarEstado`) para máxima compatibilidad

### Herramientas Adicionales
- **Git** - Control de versiones
- **GitHub** - Repositorio remoto y alojamiento de código
- **Terminal/CLI** - Para ejecutar comandos de inicialización y sincronización

---

## Instrucciones de Uso

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (solo para cargar imágenes externas)

### Cómo Ejecutar

#### **Opción 1: Abrir archivos localmente**
1. Descarga o clona el repositorio:
   ```bash
   git clone https://github.com/daisipino/Sistemaecn_tecnico_sanchez.git
   ```

2. Navega a la carpeta del proyecto:
   ```bash
   cd Sistemaecn_tecnico_sanchez
   ```

3. Abre los archivos en tu navegador:
   - **Panel Cliente**: Haz doble clic en `cliente.html`
   - **Panel Técnico**: Haz doble clic en `tecnico.html`

#### **Opción 2: Usar un servidor local (recomendado)**
Si tienes Python instalado:
```bash
# Python 3
python3 -m http.server 8000

# Luego abre en tu navegador:
# http://localhost:8000
```

Si tienes Node.js instalado:
```bash
# Instala http-server si no lo tienes
npm install -g http-server

# Ejecuta el servidor
http-server

# Abre en tu navegador:
# http://localhost:8080
```

### Cómo Usar la Aplicación

#### **Panel Cliente**
1. Completa el formulario con:
   - Nombre del cliente
   - Dirección
   - Localidad
   - Tipo de servicio (Instalación, Mantenimiento, Reparación, Cámara frigorífica)
   - Mensaje/Comentario describiendo el problema
   
2. Marca las casillas que correspondan:
   - Es urgente
   - Tengo garantía
   - Quiero presupuesto antes de venir

3. Haz clic en **"Enviar solicitud y calcular costo"**

4. Verás:
   - Un mensaje de confirmación con el costo aproximado
   - Tu solicitud agregada a la tabla
   - El total estimado actualizado

5. Puedes eliminar solicitudes haciendo clic en **"Eliminar"**

#### **Panel Técnico**
1. Abre el panel técnico (enlace disponible al final del panel cliente)

2. Completa el formulario de registro:
   - Nombre del cliente
   - Dirección
   - Tipo de servicio
   - Costo del servicio
   - Medio de pago (Efectivo, Billetera virtual, Cuenta corriente)
   - Marca si es urgente

3. Haz clic en **"Agendar servicio"** para agregar a la agenda

4. En la tabla de agenda:
   - Cambia el estado del servicio (Pendiente → En camino → Finalizado)
   - Cuando marques "Finalizado", el costo se suma automáticamente al total del día
   - Elimina servicios que ya no sean necesarios

5. Observa el **"Total ganado del día"** actualizado en tiempo real

---

## Características Principales

- Formularios interactivos - Validación de campos obligatorios
- Tabla dinámica - Agregar y eliminar registros sin recargar la página
- Cálculos automáticos - Costos y totales actualizados en tiempo real
- Diseño responsivo - Funciona perfectamente en celulares, tablets y computadoras
- Interfaz intuitiva - Fácil de usar para clientes y técnicos
- Almacenamiento en memoria - Los datos se mantienen mientras esté abierta la página
- Estilo profesional - Colores consistentes y animaciones suaves

---

## Contribuciones

Para contribuir:

1. Fork el repositorio
2. Clona tu fork: `git clone https://github.com/TU_USUARIO/Sistemaecn_tecnico_sanchez.git`
3. Crea una rama: `git checkout -b mejora/tu-mejora`
4. Realiza tus cambios y commiteа: `git commit -m "Tu mensaje"`
5. Push: `git push origin mejora/tu-mejora`
6. Abre un Pull Request en GitHub

---

## Ideas para Mejoras Futuras

- Persistencia de datos usando `localStorage` o `sessionStorage`
- Conexión a una base de datos real (Firebase, MongoDB)
- Sistema de autenticación de usuarios
- Notificaciones por email o SMS
- Reportes y gráficas de ingresos
- Geolocalización para mapear servicios
- App móvil con React Native o Flutter
- Sistema de calificaciones de servicios

---

## Contacto y Soporte

Para preguntas o reportar bugs:
- **Email**: daisipino@example.com
- **GitHub Issues**: [Crear un issue en el repositorio](https://github.com/daisipino/Sistemaecn_tecnico_sanchez/issues)
- **WhatsApp**: [Contactar al servicio Sanchez](https://wa.me/5492615551234)

---

## Licencia

Este proyecto fue creado con fines educativos como parte de la Práctica Profesionalizante del Instituto de Educación Superior (IES). Puedes usarlo libremente para aprender y mejorar.

---

## Desarrollo Académico

- **Institución**: Instituto de Educación Superior (IES)
- **Programa**: Práctica Profesionalizante - PRIMER AÑO
- **Consignas**: HTML5, CSS3, JavaScript Vanilla
- **Cumplimiento**: 100% - Todos los requisitos incluidos

---

**Última actualización**: 26 de febrero de 2026  
**Versión**: 1.0 - Release Inicial
