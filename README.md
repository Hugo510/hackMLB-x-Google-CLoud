# hackMLB-x-Google-CLoud

## Descripción

hackMLB-x-Google-Cloud es una aplicación diseñada para [describir el propósito del proyecto].

## Instalación

1. Clona el repositorio.
2. Instala las dependencias con `npm install`.
3. Configura las variables de entorno según el archivo `.env.example`.
4. Ejecuta la aplicación con `npm start`.

## Uso

Proporciona ejemplos de cómo utilizar la aplicación:

```bash
npm run dev
```

## Despliegue con Docker

Sigue los pasos a continuación para construir y ejecutar la aplicación utilizando Docker:

1. **Construir la Imagen Docker**:

   ```bash
   docker build -t hackmlb-backend:latest .
   ```

2. **Configurar Variables de Entorno y Montar el Archivo de Credenciales**:

   Puedes proporcionar las variables de entorno de dos maneras:

   ### Opción 1: Pasar Variables Individualmente

   **Para Bash/Mac/Linux**:

   ```bash
   docker run -d \
     -p 8080:8080 \
     --name hackmlb-backend \
     -e JWT_SECRET=tu_jwt_secreto \
     -e GCLOUD_PROJECT_ID=tu_project_id \
     -e GCLOUD_KEYFILE_PATH=/app/secrets/hackathonmlb-keyfile.json \
     -e SPANNER_INSTANCE_ID=tu_instance_id \
     -e SPANNER_DATABASE_ID=tu_database_id \
     -e REDIS_HOST=tu_redis_host \
     -e REDIS_PORT=tu_redis_port \
     -e REDIS_PASSWORD=tu_redis_password \
     -e REDIS_DEFAULT_EXPIRATION=tu_expiracion \
     -e PORT=8080 \
     -e NODE_ENV=production \
     -v /ruta/segura/hackathonmlb-keyfile.json:/app/secrets/hackathonmlb-keyfile.json \
     hackmlb-backend:latest
   ```

   **Para PowerShell**:

   ```powershell
   docker run -d `
     -p 8080:8080 `
     --name hackmlb-backend `
     -e JWT_SECRET=tu_jwt_secreto `
     -e GCLOUD_PROJECT_ID=tu_project_id `
     -e GCLOUD_KEYFILE_PATH=/app/secrets/hackathonmlb-keyfile.json `
     -e SPANNER_INSTANCE_ID=tu_instance_id `
     -e SPANNER_DATABASE_ID=tu_database_id `
     -e REDIS_HOST=tu_redis_host `
     -e REDIS_PORT=tu_redis_port `
     -e REDIS_PASSWORD=tu_redis_password `
     -e REDIS_DEFAULT_EXPIRATION=tu_expiracion `
     -e PORT=8080 `
     -e NODE_ENV=production `
     -v C:\ruta\segura\hackathonmlb-keyfile.json:/app/secrets/hackathonmlb-keyfile.json `
     hackmlb-backend:latest
   ```

   ### Opción 2: Usar un Archivo de Entorno

   1. Crea un archivo llamado `.env` en tu sistema con el siguiente contenido:

      ```plaintext
      JWT_SECRET=tu_jwt_secreto
      GCLOUD_PROJECT_ID=tu_project_id
      GCLOUD_KEYFILE_PATH=/app/secrets/hackathonmlb-keyfile.json
      SPANNER_INSTANCE_ID=tu_instance_id
      SPANNER_DATABASE_ID=tu_database_id
      REDIS_HOST=tu_redis_host
      REDIS_PORT=tu_redis_port
      REDIS_PASSWORD=tu_redis_password
      REDIS_DEFAULT_EXPIRATION=tu_expiracion
      PORT=8080
      NODE_ENV=production
      ```

   2. Ejecuta el contenedor usando el archivo de entorno y monta el archivo de credenciales:

      **Para Bash/Mac/Linux**:

      ```bash
      docker run -d \
        -p 8080:8080 \
        --name hackmlb-backend \
        --env-file .env \
        -v /ruta/segura/hackathonmlb-keyfile.json:/app/secrets/hackathonmlb-keyfile.json \
        hackmlb-backend:latest
      ```

      **Para PowerShell**:

      ```powershell
      docker run -d `
        -p 8080:8080 `
        --name hackmlb-backend `
        --env-file .env `
        -v C:\ruta\segura\hackathonmlb-keyfile.json:/app/secrets/hackathonmlb-keyfile.json `
        hackmlb-backend:latest
      ```

3. **Ejecutar el Contenedor**:

   Utiliza una de las opciones anteriores para ejecutar el contenedor con las variables de entorno configuradas y el archivo de credenciales montado de manera segura.

4. **Verificar la Ejecución**:

   Abre tu navegador y navega a `http://localhost:8080` para asegurarte de que la aplicación esté corriendo correctamente.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.
