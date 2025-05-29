# 📚 Aplicación de Reseñas de Libros

Bienvenido a la Aplicación de Reseñas de Libros, una plataforma donde los amantes de la lectura pueden compartir sus opiniones sobre sus libros favoritos, descubrir nuevas lecturas y conectarse con otros lectores.

## 🌟 Características Principales

- 📖 Visualización de libros populares y recientes
- ✍️ Sistema de reseñas y calificaciones
- 🔍 Búsqueda avanzada de libros
- 👥 Perfiles de usuario personalizables
- 📱 Diseño responsivo para todos los dispositivos

## 🚀 Despliegue

### Enlaces Importantes

| Recurso | URL |
|---------|-----|
| 🖥️ **Sitio Web** | [Enlace de Producción](https://comfy-fudge-aee73b.netlify.app/#/) |
| ⚙️ **API** | [URL del API](https://booksapireview-production.up.railway.app/swagger/index.html) |
| 📂 **Repositorio del API** | [Repositorio del API](https://github.com/jeyfredc/BooksAPIReview) |  
| 📂 **Repositorio del Frontend** | [Repositorio del Frontend](https://github.com/jeyfredc/BooksPageReview) | 

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React, TypeScript, Vite, Zustand, React Router, React Icons, React Toastify, Tailwind CSS
- **Backend**: [.Net 8 ]
- **Base de Datos**: [PostgreSQL]
- **Autenticación**: [No se implemento JWT o Auth]
- **Despliegue**: [Netlify  para el Frontend y Railway para el Backend]

## 📚 Características del Proyecto

- [x] Visualización de libros populares y recientes
- [x] Sistema de reseñas y calificaciones
- [x] Búsqueda avanzada de libros
- [x] Diseño responsivo para todos los dispositivos
- [x] Sistema de autenticación


## Dockerfile despliegue del Backend

| Recurso | URL |
|---------|-----|
| 🖥️ **Dockerfile** | [Dockerfile](https://github.com/jeyfredc/BOOKSAPIReview/blob/main/Dockerfile) |

## 🚀 Empezando

### Requisitos Previos para el despliegue del Frontend

- Node.js (versión 16 o superior)
- npm o yarn


### Instalación del Frontend

1. Clona el repositorio:
   ```bash
   git clone https://github.com/jeyfredc/ReviewsWebApp.git
   cd ReviewsWebApp
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Variables de entorno:
   ```bash
   #Ya estan en el repositorio por practicidad en los archivos
   .env.development
   .env.production
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```
### Instalación del Backend

1. Clona el repositorio:
   ```bash
   git clone https://github.com/jeyfredc/BooksAPIReview.git
   cd BooksAPIReview
   ```

2. Instala las dependencias:
   ```bash
   dotnet restore
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   dotnet run
   ```

4. DefaultConnection:
 ```bash 
 Host=nozomi.proxy.rlwy.net;Port=57705;Database=railway;Username=postgres;Password=RwlvkenbtwHObjzUAZjPywkmLIiYXZut;Ssl Mode=Require;Trust Server Certificate=true;
 ```

## Recomendación

1. Puedes utilizar Dveaber para visualizar la base de datos

```bash
Host: nozomi.proxy.rlwy.net
Port: 57705
Username: postgres
Password: RwlvkenbtwHObjzUAZjPywkmLIiYXZut
```

2. Puedes utilizar Postman para probar la APIs

```bash
URL: https://booksapireview-production.up.railway.app/swagger/index.html
```



## 📧 Contacto

Para más información, por favor contacta a [jeyfredc@gmail.com]
