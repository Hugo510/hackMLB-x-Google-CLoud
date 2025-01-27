import { pubsubClient } from "../config/googleCloud";
import { config } from "../config";
import logger from "../config/logger";

/**
 * Publica un evento de juego en el tema de Pub/Sub.
 *
 * @param event - Objeto que representa el evento de juego.
 * @throws {Error} Si falla al publicar el evento en Pub/Sub.
 */
export const publishGameEvent = async (event: any) => {
  try {
    const topicName = config.pubsubTopicName;
    const messageBuffer = Buffer.from(JSON.stringify(event));

    await pubsubClient.topic(topicName).publishMessage({ data: messageBuffer });
    logger.info("Evento publicado en Pub/Sub:", event);
  } catch (error) {
    logger.error("Error al publicar en Pub/Sub:", error);
    throw error;
  }
};
