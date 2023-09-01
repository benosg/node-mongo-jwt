
# API Segura con Node.js, Express, MongoDB, JWT y Bcrypt.js

Este proyecto es un ejemplo de cómo crear un API seguro utilizando Node.js, Express, MongoDB, JSON Web Tokens (JWT) y Bcrypt.js para encriptar contraseñas.

## Requisitos previos

Asegúrate de tener instalados los siguientes componentes en tu sistema antes de comenzar:

- Node.js
- MongoDB

## Instalación

1. Clona este repositorio o descarga los archivos en tu sistema.

2. Navega hasta la carpeta del proyecto en la línea de comandos.

3. Instala las dependencias ejecutando el siguiente comando:

```bash
npm install
```

## Configuración

1. Abre el archivo `index.js` y busca la variable `secretKey` en la parte superior del archivo. Cambia el valor de esta variable a una clave secreta fuerte. **Nota:** En producción, considera almacenar esta clave en una variable de entorno.

2. Abre el archivo `index.js` y busca la línea donde se encuentra `mongoose.connect(...)`. Cambia la URL de conexión a tu base de datos MongoDB.

## Uso

1. Para iniciar el servidor, ejecuta el siguiente comando en la línea de comandos:

```bash
node index.js
```

2. La API estará disponible en `http://localhost:3000` por defecto. Los endpoints disponibles son:

- `POST /signup`: Registra un nuevo usuario en la base de datos.
- `POST /signin`: Inicia sesión y genera un token JWT válido.
- `GET /me`: Devuelve los detalles del usuario actual basado en el token JWT proporcionado en la solicitud.



---

Creado por benosg
```
