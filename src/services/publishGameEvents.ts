import { PubSub } from "@google-cloud/pubsub";

const pubsub = new PubSub();
const topicName = "game-events";

/**
 * Publicar un evento en Google Pub/Sub.
 * @param event Objeto que representa el evento del juego.
 */
export const publishGameEvent = async (event: any): Promise<void> => {
  try {
    const dataBuffer = Buffer.from(JSON.stringify(event));
    // Usar publishMessage en lugar de publish
    await pubsub.topic(topicName).publishMessage({ data: dataBuffer });
    console.log("Evento publicado en Pub/Sub:", event);
  } catch (error) {
    console.error("Error publicando en Pub/Sub:", error);
  }
};
