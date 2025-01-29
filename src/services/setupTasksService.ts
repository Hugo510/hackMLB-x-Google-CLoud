import { cloudTasksClient } from "../config/googleCloud";
import { config } from "../config";
import logger from "../config/logger";

export const triggerSetupProcess = async (userId: string) => {
  try {
    const queuePath = cloudTasksClient.queuePath(
      config.gcloudProjectId,
      config.gcloudTasksLocation,
      config.gcloudTasksQueue
    );

    const task = {
      httpRequest: {
        httpMethod: "POST",
        url: `${config.baseUrl}/api/setup/preferences`, // Usar baseUrl del config
        headers: { "Content-Type": "application/json" },
        body: Buffer.from(JSON.stringify({ userId })).toString("base64"),
      },
    };

    await cloudTasksClient.createTask({ parent: queuePath, task });
  } catch (error) {
    logger.error(`Error al crear la tarea para userId: ${userId}`, error);
    throw error;
  }
};
