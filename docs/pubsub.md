# Documentación de Integración con Google Cloud Pub/Sub

## Descripción General

Este proyecto utiliza **Google Cloud Pub/Sub** para manejar la publicación y suscripción de eventos clave relacionados con los juegos de MLB. La integración con Pub/Sub permite una arquitectura escalable y desacoplada para procesar eventos en tiempo real.

## Componentes Principales

### Publicador de Eventos (`pubSubPublisher.ts`)

- **Función Principal:** `publishGameEvent`
- **Descripción:** Publica eventos de juego (como jonrones y ponches) en el tema de Pub/Sub especificado.
- **Ubicación:** `src/utils/pubSubPublisher.ts`

### Procesador de Eventos (`pubSubProcessor.ts`)

- **Función Principal:** `startPubSubProcessor`
- **Descripción:** Suscribe al tema de Pub/Sub y procesa los mensajes entrantes según la lógica de negocio definida.
- **Ubicación:** `src/middleware/pubSubProcessor.ts`

### Servicios Relacionados (`mlbStatsService.ts`)

- **Función Principal:** `getGamesInProgress`
- **Descripción:** Obtiene los juegos en progreso y publica eventos clave en Pub/Sub.
- **Ubicación:** `src/services/mlbStatsService.ts`

## Configuración

### Variables de Entorno

Asegúrate de definir las siguientes variables en tu archivo `.env`:

- `PUBSUB_TOPIC_NAME`: Nombre del tema de Pub/Sub donde se publicarán los eventos de juego.
- `PUBSUB_SUBSCRIPTION_NAME`: Nombre de la suscripción de Pub/Sub que procesará los eventos de juego.
- `ENABLE_PUBSUB_PROCESSOR`: Booleano para habilitar o deshabilitar el procesador de Pub/Sub (`true` o `false`).

### Archivo `.env.example`

```plaintext
PUBSUB_TOPIC_NAME=game-events  # Nombre del tema de Pub/Sub para publicar eventos de juego
PUBSUB_SUBSCRIPTION_NAME=game-events-subscription  # Nombre de la suscripción de Pub/Sub para procesar eventos de juego
ENABLE_PUBSUB_PROCESSOR=false  # Habilitar (true) o deshabilitar (false) el procesador de Pub/Sub
```
