import { pubsubClient } from "../config/googleCloud";
import { config } from "../config";
import logger from "../config/logger";
import { getAllUsersWithTeamOrPlayer } from "../models/spanner/preferencesModel";
import { firestore } from "../config/database";
import { Timestamp } from "firebase-admin/firestore"; // Importar Timestamp

/**
 * Suscripción al tema de Pub/Sub para procesar mensajes entrantes.
 */
const subscriptionName = config.pubsubSubscriptionName;
const subscription = pubsubClient.subscription(subscriptionName);

/**
 * Maneja los mensajes recibidos de Pub/Sub.
 *
 * @param message - Mensaje recibido de Pub/Sub.
 */
const messageHandler = async (message: any) => {
  try {
    const data = JSON.parse(message.data.toString());
    const { gamePk, event: playEvent } = data;
    logger.info("Mensaje recibido:", playEvent);

    // Obtener los usuarios interesados en este evento
    const users = await getAllUsersWithTeamOrPlayer(playEvent);

    // Almacenar eventos relevantes en Firestore
    const batch = firestore.batch();
    users.forEach((user: any) => {
      const docRef = firestore.collection("gameEvents").doc();
      batch.set(docRef, {
        userId: user.id,
        gameId: gamePk.toString(), // Asegurar que gameId es string
        eventType: playEvent.result.eventType,
        description: playEvent.result.description,
        timestamp: Timestamp.fromDate(new Date()), // Usar Timestamp
        details: {
          playerId: playEvent.playerId || "",
          teamId: playEvent.teamId || "",
          description: playEvent.result.description || "",
        },
      });
    });
    await batch.commit();
    logger.info("Eventos procesados y almacenados en Firestore.");

    message.ack(); // Confirmar recepción del mensaje
  } catch (error) {
    logger.error("Error procesando mensaje:", error);
    message.nack(); // Reintentar el procesamiento del mensaje
  }
};

/**
 * Inicia el procesador de Pub/Sub para escuchar y manejar mensajes.
 */
export const startPubSubProcessor = () => {
  subscription.on("message", messageHandler);
  subscription.on("error", (error: any) => {
    logger.error("Error en la suscripción de Pub/Sub:", error);
  });
};
