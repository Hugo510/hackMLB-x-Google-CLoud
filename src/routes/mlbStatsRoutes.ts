import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import { sendErrorResponse } from "../helpers/errorResponseHelper";
import {
  getSeasonSchedule,
  getGameLive,
  getGameLiveByTimecode,
  getGameTimestamps,
  getPlayerInfo,
  getTeamRoster,
} from "../services/mlbStatsService";

const router = Router();

router.get("/schedule", async (req, res) => {
  try {
    const data = await getSeasonSchedule();
    res.json(data);
  } catch (error) {
    sendErrorResponse(res, 500, "Error obteniendo el calendario");
  }
});

router.get(
  "/live/:gamePk",
  celebrate({
    params: Joi.object({ gamePk: Joi.number().required() }),
  }),
  async (req, res) => {
    try {
      const { gamePk } = req.params;
      const data = await getGameLive(gamePk);
      res.json(data);
    } catch (error) {
      sendErrorResponse(res, 500, "Error obteniendo estado completo del juego");
    }
  }
);

router.get(
  "/live/:gamePk/timecode/:timecode",
  celebrate({
    params: Joi.object({
      gamePk: Joi.number().required(),
      timecode: Joi.string().required(),
    }),
  }),
  async (req, res) => {
    try {
      const { gamePk, timecode } = req.params;
      const data = await getGameLiveByTimecode(gamePk, timecode);
      res.json(data);
    } catch (error) {
      sendErrorResponse(
        res,
        500,
        "Error obteniendo estado del juego en un momento específico"
      );
    }
  }
);

router.get(
  "/live/:gamePk/timestamps",
  celebrate({
    params: Joi.object({
      gamePk: Joi.number().required(),
    }),
  }),
  async (req, res) => {
    try {
      const { gamePk } = req.params;
      const data = await getGameTimestamps(gamePk);
      res.json(data);
    } catch (error) {
      sendErrorResponse(res, 500, "Error obteniendo timestamps del juego");
    }
  }
);

router.get(
  "/people/:playerId",
  celebrate({
    params: Joi.object({
      playerId: Joi.number().required(),
    }),
  }),
  async (req, res) => {
    try {
      const { playerId } = req.params;
      const data = await getPlayerInfo(playerId);
      res.json(data);
    } catch (error) {
      sendErrorResponse(res, 500, "Error obteniendo información del jugador");
    }
  }
);

router.get(
  "/teams/:teamId/roster",
  celebrate({
    params: Joi.object({
      teamId: Joi.number().required(),
    }),
  }),
  async (req, res) => {
    try {
      const { teamId } = req.params;
      const data = await getTeamRoster(teamId);
      res.json(data);
    } catch (error) {
      sendErrorResponse(res, 500, "Error obteniendo el roster del equipo");
    }
  }
);

// ...crear más endpoints según se requiera...

export default router;
