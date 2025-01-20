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

2. **Ejecutar el Contenedor**:

   ```bash
   docker run -d -p 8080:8080 --name hackmlb-backend hackmlb-backend:latest
   ```

3. **Verificar la Ejecución**:

   Abre tu navegador y navega a `http://localhost:8080` para asegurarte de que la aplicación esté corriendo correctamente.
