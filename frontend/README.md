# AlzheCare – Tercera entrega: Búsqueda, Filtrado y Mejora de la Interfaz

Aplicación orientada a proporcionar información y asistencia a personas con Alzheimer, sus familiares y cuidadores.

Esta tercera entrega amplía AlzheCare mediante la implementación funcional de la consulta de artículos, la búsqueda textual y el filtrado por categorías. También incorpora mejoras en la experiencia de usuario, la navegación, la accesibilidad y la adaptación de la interfaz a diferentes tamaños de pantalla.

---

## Table of Contents

1. [Información general](#información-general)
2. [Funcionalidades implementadas](#funcionalidades-implementadas)
3. [Tecnologías utilizadas](#tecnologías-utilizadas)
4. [Instalación y ejecución](#instalación-y-ejecución)
5. [Usabilidad y diseño](#usabilidad-y-diseño)
   - [Usabilidad actual](#usabilidad-actual)
   - [Accesibilidad](#accesibilidad)
   - [Aspecto visual](#aspecto-visual)
6. [Arquitectura y navegación](#arquitectura-y-navegación)
7. [Autenticación y gestión de usuarios](#autenticación-y-gestión-de-usuarios)
8. [Prototipado](#prototipado)
9. [Ejecutando las pruebas](#ejecutando-las-pruebas)
10. [Estado del proyecto y próximas entregas](#estado-del-proyecto-y-próximas-entregas)
11. [Desarrollo](#desarrollo)

---

## 1. Información general

AlzheCare es un proyecto de aplicación diseñado para facilitar el acceso a información sobre la enfermedad de Alzheimer y ofrecer un espacio de apoyo a pacientes, familiares y cuidadores.

La aplicación se divide en dos áreas principales:

- **Área pública:** permite consultar información relacionada con el Alzheimer, sus cuidados, tratamientos, asistencia y noticias, sin necesidad de registrarse.
- **Área personal:** ofrece funcionalidades privadas para usuarios registrados, diferenciando entre pacientes y cuidadores mediante un sistema de roles.

### Tercera entrega: Búsqueda, Filtrado y Mejora de la Interfaz

En esta fase se ha ampliado el desarrollo de las entregas anteriores, centrándose especialmente en hacer funcional la consulta de contenidos y mejorar la experiencia de navegación.

Los objetivos principales han sido:

- Implementar la consulta funcional de artículos y categorías.
- Incorporar un buscador de artículos.
- Permitir aplicar varios filtros de categoría simultáneamente.
- Mostrar los filtros activos y permitir eliminarlos individualmente.
- Incorporar la opción de limpiar todos los filtros.
- Añadir paginación y carga progresiva de resultados.
- Mejorar la presentación de los estados de carga, error y ausencia de resultados.
- Incorporar un sistema global de notificaciones.
- Mejorar la adaptación de la interfaz a dispositivos móviles y pantallas de mayor tamaño.
- Reforzar la accesibilidad de los componentes interactivos.
- Optimizar la carga de recursos y la tipografía utilizada por la aplicación.

**Estado del proyecto:** En desarrollo. La tercera entrega amplía la funcionalidad de consulta de contenidos y mejora la interfaz, manteniendo la arquitectura de autenticación y las áreas pública y privada de las entregas anteriores.

---

## 2. Funcionalidades implementadas

En esta tercera entrega se han incorporado las siguientes funcionalidades:

### Área pública

- **Página de bienvenida:** pantalla inicial desde la que se puede acceder al área informativa, iniciar sesión o registrarse.
- **Inicio público:** página principal con información introductoria sobre AlzheCare, categorías, buscador visual, artículos destacados y noticias.
- **Navegación pública:** menú inferior para acceder a las principales secciones informativas.
- **Consulta de categorías:** visualización de las categorías disponibles para organizar los contenidos.
- **Listado de artículos:** consulta de los artículos disponibles mediante la conexión con el backend.
- **Buscador de artículos:** búsqueda textual para localizar contenidos.
- **Filtros por categorías:** posibilidad de seleccionar varias categorías y combinar los filtros.
- **Gestión de filtros activos:** visualización de los filtros aplicados mediante elementos individuales que permiten eliminarlos sin tener que restablecer el resto.
- **Limpieza de filtros:** opción para eliminar todos los filtros aplicados y volver a consultar el conjunto de artículos.
- **Paginación adaptativa:** distribución de los resultados en páginas o bloques de carga, adaptándose al espacio disponible en pantalla.
- **Estados de consulta:** presentación de indicadores de carga, mensajes de error y avisos cuando no existen resultados.

### Autenticación y registro

Se mantienen las funcionalidades implementadas en la segunda entrega:

- **Inicio de sesión:** formulario conectado con el backend para autenticar usuarios registrados.
- **Registro de usuarios:** formulario dividido en dos pasos, comenzando por la selección del tipo de usuario.
- **Selección de rol:** posibilidad de registrarse como paciente o cuidador.
- **Autenticación mediante JWT:** generación y validación de tokens para gestionar las sesiones.
- **Contraseñas protegidas:** almacenamiento de contraseñas mediante BCrypt.
- **Restauración de sesión:** comprobación de la sesión al iniciar la aplicación.
- **Cierre de sesión:** posibilidad de cerrar la sesión desde el apartado de opciones, solicitando confirmación antes de realizar la acción.

### Área privada

Se mantienen las funcionalidades de la segunda entrega:

- **Inicio privado:** página principal para usuarios autenticados, con un mensaje personalizado y accesos directos a las principales secciones.
- **Identificación del usuario:** visualización del nombre y del rol correspondiente.
- **Navegación privada:** menú inferior con accesos a inicio, artículos y más opciones.
- **Apartado Más:** acceso a las opciones de perfil, ayuda, contacto y cierre de sesión.
- **Protección de rutas:** las páginas privadas requieren una sesión autenticada y un rol autorizado.

Actualmente, pacientes y cuidadores comparten la misma estructura de navegación y la misma página de inicio privada. La diferenciación de contenidos y herramientas específicas para cada perfil se abordará en futuras fases.

### Apariencia y personalización

- **Modo claro y oscuro:** posibilidad de cambiar entre ambos temas.
- **Preferencia de tema:** conservación de la selección del usuario entre sesiones.
- **Logotipo adaptable:** utilización de diferentes versiones del logotipo según el tema seleccionado.
- **Componentes reutilizables:** organización de elementos comunes para mantener la coherencia visual.
- **Diseño responsive:** adaptación de los principales componentes y listados a diferentes tamaños de pantalla.
- **Notificaciones globales:** sistema centralizado para mostrar mensajes de confirmación, errores y avisos.
- **Tipografía optimizada:** incorporación de Montserrat como recurso local en formato WOFF2.
- **Carga optimizada de páginas:** división de la carga de componentes mediante carga diferida para reducir los recursos iniciales de la aplicación.

Algunas secciones ya cuentan con su estructura de navegación, pero todavía muestran contenido provisional mientras se desarrollan sus funcionalidades definitivas.

---

## 3. Tecnologías utilizadas

Las principales tecnologías y herramientas utilizadas en esta entrega son:

### Frontend

- **[React](https://react.dev/)** – Biblioteca JavaScript utilizada para construir la interfaz de usuario mediante componentes.
- **[Vite](https://vite.dev/)** – Herramienta de desarrollo y construcción del frontend.
- **[React Router](https://reactrouter.com/)** – Biblioteca utilizada para gestionar las rutas y la navegación entre las diferentes páginas.
- **[JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)** – Lenguaje utilizado para implementar la lógica de los componentes y la comunicación con el backend.
- **[CSS](https://developer.mozilla.org/es/docs/Web/CSS)** – Utilizado para definir los estilos, la distribución de los elementos y los temas visuales.
- **[Lucide React](https://lucide.dev/)** – Biblioteca de iconos utilizada en los diferentes componentes de la interfaz.
- **Context API** – Utilizada para gestionar estados globales como la autenticación, el tema visual, las notificaciones y otros datos compartidos.

### Backend

- **[Java 21](https://www.oracle.com/java/)** – Lenguaje utilizado para desarrollar la lógica del servidor.
- **[Spring Boot](https://spring.io/projects/spring-boot)** – Framework utilizado para construir la API REST.
- **[Spring Security](https://spring.io/projects/spring-security)** – Encargado de gestionar la seguridad y proteger los recursos del backend.
- **[Spring Data JPA](https://spring.io/projects/spring-data-jpa)** – Facilita el acceso y la persistencia de datos.
- **[Hibernate](https://hibernate.org/)** – Framework ORM utilizado para la comunicación entre Java y la base de datos.
- **JWT (JSON Web Token)** – Sistema utilizado para gestionar la autenticación mediante tokens.
- **BCrypt** – Algoritmo utilizado para proteger las contraseñas de los usuarios.

### Base de datos y herramientas

- **[MariaDB](https://mariadb.org/)** – Sistema gestor de bases de datos relacional utilizado para almacenar la información.
- **[Node.js](https://nodejs.org/)** – Entorno necesario para ejecutar las herramientas de desarrollo del frontend.
- **[npm](https://www.npmjs.com/)** – Gestor de paquetes utilizado para instalar las dependencias.
- **[Maven](https://maven.apache.org/)** – Herramienta utilizada para gestionar las dependencias y la construcción del backend.
- **[Git](https://git-scm.com/)** – Sistema de control de versiones del proyecto.
- **Visual Studio Code** – Editor utilizado durante el desarrollo.

*Nota: las versiones concretas de las dependencias del frontend pueden consultarse en `frontend/package.json`. Las del backend se encuentran definidas en el archivo `pom.xml`.*

---

## 4. Instalación y ejecución

Para ejecutar AlzheCare en un entorno local es necesario iniciar tanto el backend como el frontend. Además, el backend necesita disponer de una base de datos MariaDB correctamente configurada.

### Requisitos previos

Antes de comenzar, es necesario disponer de:

- Node.js y npm.
- Java 21.
- MariaDB.
- Git (opcional, si se desea clonar el repositorio).
- Un editor de código, como Visual Studio Code.

### 4.1. Clonar el repositorio

Clona el repositorio del proyecto:

```bash
git clone URL_DEL_REPOSITORIO
```

Accede a la carpeta principal:

```bash
cd AlzheCare
```

### 4.2. Configurar la base de datos

Antes de iniciar el backend, es necesario disponer de una instancia de MariaDB y configurar los datos de conexión utilizados por Spring Boot.

Comprueba que:

- El servidor MariaDB está iniciado.
- La base de datos del proyecto existe.
- Las credenciales de conexión son correctas.
- La configuración de la aplicación contiene los parámetros necesarios para conectarse a la base de datos.

La configuración de conexión y las propiedades de autenticación deben mantenerse fuera del código fuente cuando contengan credenciales o claves privadas.

### 4.3. Ejecutar el backend

Accede a la carpeta del backend:

```bash
cd backend
```

En Windows, comprueba que el proyecto compila correctamente:

```bash
.\mvnw.cmd clean compile
```

Para probar el funcionamiento puedes generar una clave en base 64 desde PowerShell con:

```powershell
$bytes = New-Object byte[] 32

$rng = [System.Security.Cryptography.RNGCryptoServiceProvider]::new()
$rng.GetBytes($bytes)
$rng.Dispose()

[Convert]::ToBase64String($bytes)
```

Crea la variable de entorno e inicia el servidor de Spring Boot:

```powershell
$env:JWT_SECRET="TU_CLAVE_BASE64_GENERADA"
.\mvnw.cmd clean spring-boot:run
```

Por defecto, el backend estará disponible en:

```text
http://localhost:8080
```

### 4.4. Ejecutar el frontend

Abre una segunda terminal y accede a la carpeta del frontend desde la raíz del proyecto:

```bash
cd frontend
```

Instala las dependencias:

```bash
npm install
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Vite mostrará una dirección local similar a la siguiente:

```text
http://localhost:5173/
```

Abre esa dirección en el navegador para visualizar la aplicación.

### 4.5. Detener la aplicación

Para detener cualquiera de los servidores, utiliza:

```text
Ctrl + C
```

### Resumen de comandos

| Acción | Comando |
|---|---|
| Instalar dependencias frontend | `npm install` |
| Ejecutar frontend | `npm run dev` |
| Generar versión de producción | `npm run build` |
| Previsualizar producción | `npm run preview` |
| Compilar backend (Windows) | `.\mvnw.cmd clean compile` |
| Ejecutar backend (Windows) | `.\mvnw.cmd spring-boot:run` |

**Importante:** para probar las funcionalidades de registro, inicio de sesión y consulta de artículos es necesario que el backend y MariaDB estén funcionando correctamente. El frontend se comunica con el backend mediante peticiones HTTP a la API REST; no accede directamente a la base de datos.

---

## 5. Usabilidad y diseño

AlzheCare está concebida para usuarios con diferentes necesidades y niveles de familiaridad con la tecnología. Por ello, se mantiene como objetivo una interfaz sencilla, intuitiva y accesible.

### Usabilidad actual

La aplicación cuenta ahora con dos entornos diferenciados, adaptados al tipo de acceso del usuario:

- **Entorno público:** facilita el acceso a información general sin necesidad de crear una cuenta.
- **Entorno privado:** proporciona acceso a las funcionalidades destinadas a usuarios registrados.

Se han mantenido y ampliado los siguientes criterios de diseño:

- Navegación clara y sencilla.
- Organización visual de los contenidos.
- Acceso intuitivo a las diferentes secciones.
- Distribución de elementos que facilite la lectura.
- Componentes reutilizables para mantener la coherencia entre pantallas.
- Separación entre las funcionalidades públicas y privadas.
- Identificación visual del usuario y de su rol.
- Búsqueda y filtrado de contenidos sin necesidad de navegar entre múltiples pantallas.
- Identificación clara de los filtros activos y posibilidad de modificarlos individualmente.
- Información sobre el número de resultados obtenidos.
- Mensajes informativos cuando no existen resultados o se produce un error.

La navegación se gestiona mediante React Router, mientras que la autenticación y los estados compartidos se administran mediante Context API.

### Accesibilidad

Dado que AlzheCare está dirigida también a personas con Alzheimer y usuarios de edad avanzada, la accesibilidad continúa siendo uno de los aspectos importantes del proyecto.

Se mantienen los siguientes criterios:

- Textos claros y fáciles de comprender.
- Tamaños de fuente adecuados para facilitar la lectura.
- Contraste suficiente entre texto y fondo.
- Botones y elementos interactivos fácilmente identificables.
- Navegación sencilla y consistente.
- Evitar la sobrecarga de información y los elementos visuales innecesarios.
- Mantener una estructura visual coherente entre las diferentes secciones.
- Incorporar etiquetas y atributos accesibles en los elementos interactivos.
- Proporcionar información comprensible sobre los estados de carga, error y resultados.
- Mantener indicadores visuales de foco para facilitar la navegación mediante teclado.

Estos criterios servirán como referencia para el desarrollo de las siguientes funcionalidades.

### Aspecto visual

La identidad visual de AlzheCare sigue una estética sanitaria, moderna y cercana, evitando una interfaz excesivamente recargada.

La paleta de colores utilizada es la siguiente:

| Elemento | Color | Uso |
|---|---|---|
| Primario | `#4658D9` | Botones principales y navegación activa |
| Secundario | `#8067D9` | Elementos destacados |
| Apoyo | `#009F91` | Acciones positivas y confirmaciones |
| Fondo | `#F5F7FC` | Fondo general |
| Texto principal | `#19233B` | Títulos y contenido |
| Éxito | `#16845B` | Confirmaciones |
| Advertencia | `#E6A11A` | Avisos preventivos |
| Error | `#D94343` | Errores y acciones destructivas |

La tipografía seleccionada es **Montserrat**, utilizada para mantener una apariencia uniforme y facilitar la lectura. Se ha incorporado como recurso local en formato WOFF2 para evitar depender de la descarga de la fuente desde un servicio externo.

También se ha incorporado un modo oscuro que utiliza fondos azul oscuro, superficies diferenciadas y textos claros. El usuario puede alternar entre ambos temas y conservar su preferencia.

---

## 6. Arquitectura y navegación

La aplicación se organiza en dos proyectos independientes que se comunican mediante una API REST.

### Estructura general

```text
AlzheCare/
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── mvnw
│
├── frontend/
│   ├── public/
│   │   └── fonts/
│   │       └── montserrat-variable.woff2
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

*La estructura mostrada es una representación general de las carpetas principales del proyecto.*

### Navegación pública

Las principales rutas públicas son:

| Ruta | Página | Estado |
|---|---|---|
| `/` | Bienvenida | Implementada |
| `/bienvenida` | Bienvenida | Implementada |
| `/publico` | Inicio público | Implementada |
| `/publico/categorias` | Categorías y consulta de artículos | Implementada |
| `/publico/busqueda` | Buscador | Redirige a categorías |
| `/publico/resultados` | Resultados | Redirige a categorías |
| `/publico/articulo/:id` | Detalle de artículo | Estructura provisional |
| `/publico/ayuda` | Ayuda | Estructura provisional |

El inicio público y la consulta de categorías están disponibles tanto para visitantes como para usuarios autenticados. De esta forma, los contenidos informativos pueden consultarse independientemente de si se ha iniciado sesión.

### Navegación de autenticación

| Ruta | Página | Estado |
|---|---|---|
| `/login` | Inicio de sesión | Implementada |
| `/registro` | Selección de tipo de usuario | Implementada |
| `/registro/:rol` | Formulario de registro | Implementada |

Las rutas de autenticación están destinadas a usuarios no autenticados. Si un usuario ya tiene una sesión activa, se le redirige al área privada.

### Navegación privada

| Ruta | Página | Estado |
|---|---|---|
| `/inicio` | Inicio privado | Implementada |
| `/categorias` | Categorías | Redirige a la sección pública |
| `/mas` | Más opciones | Implementada |
| `/perfil` | Perfil | Estructura provisional |
| `/ayuda` | Ayuda | Estructura provisional |
| `/contacto` | Contacto | Estructura provisional |

Las rutas privadas están protegidas mediante un componente de control de acceso que comprueba la autenticación y los roles autorizados.

### Control de acceso

Para gestionar la navegación según el estado de autenticación se utilizan dos componentes:

- **RequireAuth:** protege las rutas privadas, comprueba que exista una sesión válida y verifica que el usuario tenga un rol autorizado.
- **GuestRoute:** controla el acceso a páginas destinadas exclusivamente a visitantes o usuarios no autenticados, permitiendo también el acceso público a las secciones informativas.

Los roles utilizados en el backend son `PATIENT` y `CAREGIVER`, correspondientes a paciente y cuidador.

### Consulta y filtrado de contenidos

La página de categorías centraliza la consulta de artículos y permite combinar diferentes criterios de búsqueda.

Entre sus características se encuentran:

- Obtención de las categorías disponibles desde el backend.
- Consulta de los artículos y presentación de sus datos.
- Búsqueda mediante texto.
- Selección de múltiples categorías.
- Actualización de los resultados según los filtros aplicados.
- Eliminación individual de filtros activos.
- Limpieza de todos los filtros.
- Conservación de los criterios de búsqueda en los parámetros de la URL.
- Paginación adaptada al tamaño de pantalla.

---

## 7. Autenticación y gestión de usuarios

El sistema de autenticación incorporado en la segunda entrega se mantiene como base para el acceso a las funcionalidades privadas de la aplicación.

### Registro de usuarios

El proceso de registro se divide en dos pasos:

1. Selección del tipo de usuario: paciente o cuidador.
2. Cumplimentación del formulario correspondiente y envío de los datos al backend.

Una vez completado el registro correctamente, el usuario puede acceder al área privada.

### Inicio de sesión

El usuario introduce sus credenciales en el formulario de acceso. El frontend envía una petición al backend, que comprueba los datos y devuelve la información necesaria para gestionar la sesión.

### Gestión de sesión

La autenticación se gestiona mediante JWT:

- El backend genera un token tras autenticar correctamente al usuario.
- El frontend conserva el token para las siguientes peticiones.
- Las peticiones que requieren autenticación incluyen el token correspondiente.
- El backend valida el token antes de permitir el acceso a recursos protegidos.
- Al iniciar la aplicación se comprueba si existe una sesión que pueda restaurarse.
- El usuario puede cerrar sesión desde el apartado correspondiente.

Actualmente, el token se conserva en `localStorage`. Su almacenamiento se revisará durante la adaptación de la aplicación a Capacitor para adecuarlo al entorno móvil.

### Roles de usuario

Se contemplan dos tipos de usuarios:

| Rol | Descripción |
|---|---|
| `PATIENT` | Persona con Alzheimer que utiliza la aplicación. |
| `CAREGIVER` | Familiar, asistente o cuidador que utiliza la aplicación para consultar información y acceder a sus funcionalidades. |

Ambos roles pueden autenticarse y acceder al área privada. La incorporación de herramientas y contenidos específicos para cada perfil se desarrollará progresivamente.

### Endpoints de autenticación

El backend proporciona los siguientes endpoints:

| Método | Endpoint | Función |
|---|---|---|
| POST | `/api/auth/register` | Registrar un nuevo usuario. |
| POST | `/api/auth/login` | Autenticar un usuario. |
| GET | `/api/auth/me` | Obtener la información del usuario autenticado. |

La seguridad del backend se apoya en Spring Security, JWT y BCrypt. Las contraseñas no se almacenan en texto plano.

---

## 8. Prototipado

Durante esta tercera entrega se ha ampliado la interfaz inicial, incorporando la consulta funcional de contenidos, los filtros y diferentes mejoras en la presentación de la información.

El prototipado permite comprobar la distribución de los elementos, la jerarquía visual y la facilidad de navegación antes de incorporar funcionalidades más complejas.

### Página de bienvenida

Capturas de la pantalla de bienvenida y sus opciones de acceso.

<table>
  <tr>
    <td align="center">
      <img src="screenshots/bienvenida.png" width="300">
      <br>
      <b>Slide de bienvenida 1</b>
    </td>
    <td align="center">
      <img src="screenshots/bienvenida2.png" width="300">
      <br>
      <b>Slide de bienvenida 2</b>
    </td>
    <td align="center">
      <img src="screenshots/bienvenida3.png" width="300">
      <br>
      <b>Slide de bienvenida 3</b>
    </td>
  </tr>
</table>

### Opciones de acceso

Se muestran las principales formas de acceder al contenido.

<table align="center">
  <tr>
    <td align="center">
      <img src="screenshots/opciones-entrada.png" width="300">
      <br>
      <b>Opciones de entrada a la aplicación (Invitado, Login o Registro)</b>
    </td>
  </tr>
</table>

### Inicio público

Se muestran las principales secciones informativas disponibles para los visitantes.

<table align="center">
  <tr>
    <td align="center">
      <img src="screenshots/inicio-publico.png" width="300">
      <br>
      <b>Inicio público como invitado</b>
    </td>
  </tr>
</table>

### Consulta de categorías y búsqueda

En esta sección se muestran las nuevas funcionalidades de consulta de artículos, búsqueda textual y filtrado por categorías.

<table align="center">
  <tr>
    <td align="center">
      <img src="screenshots/categorias-busqueda.png" width="300">
      <br>
      <b>Consulta de artículos y búsqueda por texto</b>
    </td>
  </tr>
</table>

<table align="center">
  <tr>
    <td align="center">
      <img src="screenshots/filtros-activos.png" width="300">
      <br>
      <b>Selección de categorías y gestión de filtros activos</b>
    </td>
  </tr>
</table>

<table align="center">
  <tr>
    <td align="center">
      <img src="screenshots/resultados-paginacion.png" width="300">
      <br>
      <b>Resultados de búsqueda y paginación</b>
    </td>
  </tr>
</table>

### Registro e inicio de sesión

Se mantienen las capturas de los formularios de autenticación y del proceso de selección del tipo de usuario.

<table>
  <tr>
    <td align="center">
      <img src="screenshots/login.png" width="300">
      <br>
      <b>Inicio de sesión de AlzheCare</b>
    </td>
  </tr>
</table>

<table>
  <tr>
    <td align="center">
      <img src="screenshots/registro-roles.png" width="300">
      <br>
      <b>Elección de roles</b>
    </td>
    <td align="center">
      <img src="screenshots/registro.png" width="300">
      <br>
      <b>Registro de usuario de AlzheCare</b>
    </td>
  </tr>
</table>

### Inicio privado

Se muestra la página principal a la que acceden los usuarios autenticados.

<table align="center">
  <tr>
    <td align="center">
      <img src="screenshots/inicio-privado.png" width="300">
      <br>
      <b>Inicio privado de AlzheCare</b>
    </td>
  </tr>
</table>

### Navegación y modo oscuro

Se mantienen las capturas de los menús de navegación y de la apariencia de la aplicación al utilizar el tema oscuro.

<table>
  <tr>
    <td align="center">
      <img src="screenshots/inicio-privado-dark.png" width="300">
      <br>
      <b>Inicio privado de AlzheCare en dark mode</b>
    </td>
    <td align="center">
      <img src="screenshots/inicio-publico-dark.png" width="300">
      <br>
      <b>Inicio público de AlzheCare en dark mode</b>
    </td>
  </tr>
</table>

<table>
  <tr>
    <td align="center">
      <img src="screenshots/mas-opciones-dark.png" width="300">
      <br>
      <b>Apartado de más opciones en dark mode</b>
    </td>
    <td align="center">
      <img src="screenshots/cierre-sesion-dark.png" width="300">
      <br>
      <b>Cierre de sesión de AlzheCare en dark mode</b>
    </td>
  </tr>
</table>

### Notificaciones y estados de consulta

Se muestran ejemplos del sistema global de notificaciones y de los mensajes que aparecen durante la consulta de contenidos.

<table align="center">
  <tr>
    <td align="center">
      <img src="screenshots/notificaciones-estados.png" width="300">
      <br>
      <b>Notificaciones y estados de consulta</b>
    </td>
  </tr>
</table>

### Adaptación a diferentes dispositivos

Se muestra la adaptación de la página de categorías y sus resultados a diferentes tamaños de pantalla.

<table align="center">
  <tr>
    <td align="center">
      <img src="screenshots/responsive-categorias.png" width="300">
      <br>
      <b>Vista responsive de categorías y resultados</b>
    </td>
  </tr>
</table>

---

## 9. Ejecutando las pruebas

En esta entrega, las comprobaciones se centran en verificar el funcionamiento del frontend, la comunicación con el backend, el sistema de autenticación y las nuevas funcionalidades de consulta y filtrado.

### Comprobaciones del frontend

Se deben verificar los siguientes aspectos:

- La aplicación se inicia correctamente mediante `npm run dev`.
- La página de bienvenida y el inicio público se muestran correctamente.
- Las rutas configuradas mediante React Router funcionan según lo previsto.
- Los enlaces y botones de navegación conducen a las secciones correspondientes.
- Los estilos y recursos visuales se cargan correctamente.
- El cambio entre el tema claro y oscuro funciona.
- La interfaz mantiene una distribución adecuada en diferentes tamaños de pantalla.
- El buscador permite localizar artículos mediante texto.
- Los filtros permiten seleccionar varias categorías simultáneamente.
- Los filtros activos se muestran correctamente.
- Es posible eliminar filtros de forma individual.
- La opción de limpiar filtros restablece la consulta.
- Los resultados se actualizan según los criterios seleccionados.
- La paginación o carga progresiva permite consultar los resultados disponibles.
- Se muestra correctamente el número de resultados.
- Los estados de carga, error y ausencia de resultados ofrecen información comprensible.
- Las notificaciones aparecen cuando se producen las acciones correspondientes.
- No aparecen errores relevantes en la consola del navegador.

### Comprobaciones del backend

Se han realizado comprobaciones de compilación y funcionamiento de los servicios del backend.

Entre los aspectos verificados se encuentran:

- Compilación correcta del proyecto Spring Boot.
- Conexión con MariaDB.
- Registro de nuevos usuarios.
- Inicio de sesión con credenciales válidas.
- Generación de tokens JWT.
- Validación de tokens.
- Consulta de los datos del usuario autenticado.
- Identificación de los roles de paciente y cuidador.
- Protección de los recursos que requieren autenticación.
- Disponibilidad de los endpoints necesarios para consultar categorías y artículos.

La compilación del backend se ha comprobado mediante:

```bash
.\mvnw.cmd clean compile
```

### Pruebas de búsqueda y filtrado

Se deben comprobar especialmente los siguientes comportamientos:

1. Acceder a la sección pública de categorías.
2. Comprobar que se cargan las categorías disponibles.
3. Verificar que se muestran los artículos obtenidos desde el backend.
4. Introducir un término en el buscador.
5. Comprobar que los resultados corresponden con el texto introducido.
6. Seleccionar una categoría.
7. Seleccionar una segunda categoría y comprobar que se pueden combinar los filtros.
8. Eliminar uno de los filtros activos.
9. Comprobar que el resto de filtros se mantienen.
10. Limpiar todos los filtros.
11. Verificar que se recupera el listado sin restricciones.
12. Comprobar el número de resultados mostrado.
13. Navegar por las diferentes páginas o bloques de resultados.
14. Introducir una búsqueda que no devuelva resultados.
15. Comprobar que se muestra el mensaje correspondiente.
16. Verificar el comportamiento cuando se produce un error de conexión con el backend.

### Pruebas de autenticación y navegación

Se mantienen las comprobaciones de la entrega anterior:

1. Acceder a la aplicación sin iniciar sesión.
2. Entrar en el área pública.
3. Acceder al formulario de registro.
4. Seleccionar el tipo de usuario.
5. Completar el registro.
6. Iniciar sesión con las credenciales creadas.
7. Comprobar que se accede al área privada.
8. Verificar que se muestra correctamente el nombre y el rol del usuario.
9. Intentar acceder a una ruta privada sin autenticación.
10. Comprobar que el usuario es redirigido si intenta acceder a una ruta exclusiva para visitantes.
11. Cerrar sesión y comprobar que se pierde el acceso a las rutas privadas.

### Ejecución de pruebas de construcción

Para comprobar que el frontend puede construirse correctamente, ejecuta:

```bash
npm run build
```

Este comando genera la versión optimizada de producción y permite detectar errores de compilación.

Para visualizar esa versión localmente:

```bash
npm run preview
```

*Las pruebas automatizadas de frontend y backend podrán incorporarse en futuras fases del proyecto.*

---

## 10. Estado del proyecto y próximas entregas

Esta tercera entrega amplía la base de AlzheCare mediante la implementación de la consulta funcional de artículos, la búsqueda textual, los filtros múltiples y diferentes mejoras en la interfaz.

### Completado en esta entrega

- Mantenimiento de la página de bienvenida.
- Mantenimiento del inicio público.
- Implementación funcional de la consulta de categorías.
- Integración de la consulta de artículos con el backend.
- Incorporación del buscador textual.
- Implementación de filtros por categorías.
- Selección simultánea de varias categorías.
- Visualización de filtros activos.
- Eliminación individual de filtros.
- Opción para limpiar todos los filtros.
- Actualización de resultados según los criterios de búsqueda.
- Paginación adaptativa y carga progresiva de resultados.
- Contador de resultados.
- Gestión visual de estados de carga, error y ausencia de resultados.
- Incorporación del sistema global de notificaciones.
- Mejoras de accesibilidad en los componentes.
- Mejoras de adaptación responsive.
- Optimización de la tipografía mediante Montserrat local en formato WOFF2.
- Mejoras en la carga de componentes y páginas.
- Mantenimiento del sistema de autenticación y gestión de usuarios.
- Mantenimiento de la navegación pública y privada.
- Mantenimiento del modo claro y oscuro.

### Próximos objetivos

Las siguientes entregas ampliarán progresivamente las funcionalidades de la aplicación:

- Desarrollo de las páginas de detalle de artículos.
- Incorporación de nuevas funcionalidades de gestión de contenidos.
- Implementación del perfil de usuario.
- Desarrollo de las secciones de ayuda y contacto.
- Diferenciación de la página de inicio y de las herramientas según el rol del usuario.
- Incorporación de funcionalidades específicas para pacientes y cuidadores.
- Desarrollo de herramientas de apoyo, recordatorios y seguimiento.
- Adaptación de la aplicación móvil mediante Capacitor.
- Mejora del almacenamiento de credenciales y de la gestión de sesiones en dispositivos móviles.
- Ampliación de las pruebas automatizadas de frontend y backend.

Las secciones que actualmente muestran contenido provisional se completarán progresivamente en las siguientes fases.

---

## 11. Desarrollo

El proyecto AlzheCare se desarrolla de forma personal de cara a un proyecto estudiantil. No se busca la contribución activa ni pasiva de terceros en el proyecto, pero los consejos y recomendaciones serán siempre bienvenidos.

---

**AlzheCare – Tercera entrega: Búsqueda, Filtrado y Mejora de la Interfaz**

*Construyendo una aplicación accesible para acompañar, informar y ayudar a personas con Alzheimer, sus familiares y cuidadores.*