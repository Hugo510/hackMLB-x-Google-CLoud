# Etapa de construcción
FROM node:18-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Compilar el proyecto TypeScript
RUN npm run build

# Establecer variables de entorno
ENV NODE_ENV=production
ENV PORT=8080

# Etapa de producción
FROM node:18-alpine

# Crear un usuario no root para mayor seguridad
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Establecer directorio de trabajo
WORKDIR /app

# Copiar solo los archivos necesarios desde la etapa de construcción
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/dist ./dist

# Agregar la copia de .env.example
COPY --from=builder /app/.env.example ./

# Instalar solo dependencias de producción
RUN npm install --only=production

# Asignar permisos al directorio de trabajo
RUN chown -R appuser:appgroup /app

# Cambiar al usuario no root
USER appuser

# Agregar etiquetas para la imagen
LABEL maintainer="tu_email@ejemplo.com"
LABEL version="1.0.0"
LABEL description="hackMLB-x-Google-Cloud Backend"

# Exponer el puerto correcto para Cloud Run
EXPOSE 8080

ENV HOST=0.0.0.0

# Agregar healthcheck
HEALTHCHECK --interval=60s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

# Comando para iniciar la aplicación
CMD ["node", "dist/index.js"]
