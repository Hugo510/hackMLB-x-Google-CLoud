# Google Cloud Pub/Sub Integration Documentation

## Overview

This project uses **Google Cloud Pub/Sub** to handle the publishing and subscribing of key events related to MLB games. Pub/Sub integration provides a scalable and decoupled architecture for processing events in real time.

## Main Components

### Event Publisher (`pubSubPublisher.ts`)

- **Main Function:** `publishGameEvent`
- **Description:** Publishes game events (such as home runs and strikeouts) to the specified Pub/Sub topic.
- **Location:** `src/utils/pubSubPublisher.ts`

### Event Processor (`pubSubProcessor.ts`)

- **Main Function:** `startPubSubProcessor`
- **Description:** Subscribes to the Pub/Sub topic and processes incoming messages according to defined business logic.
- **Location:** `src/middleware/pubSubProcessor.ts`

### Related Services (`mlbStatsService.ts`)

- **Main Function:** `getGamesInProgress`
- **Description:** Fetches games in progress and publishes key events to Pub/Sub.
- **Location:** `src/services/mlbStatsService.ts`

## Configuration

### Environment Variables

Make sure to define the following variables in your `.env` file:

- `PUBSUB_TOPIC_NAME`: Name of the Pub/Sub topic where game events are published.
- `PUBSUB_SUBSCRIPTION_NAME`: Name of the Pub/Sub subscription that will process game events.
- `ENABLE_PUBSUB_PROCESSOR`: Boolean to enable or disable the Pub/Sub processor (`true` or `false`).

### `.env.example` File

```plaintext
PUBSUB_TOPIC_NAME=game-events  # Name of the Pub/Sub topic for publishing game events
PUBSUB_SUBSCRIPTION_NAME=game-events-subscription  # Name of the Pub/Sub subscription for processing game events
ENABLE_PUBSUB_PROCESSOR=false  # Enable (true) or disable (false) the Pub/Sub processor
```
