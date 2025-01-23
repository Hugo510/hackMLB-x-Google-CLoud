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

/**
 * @route GET /api/mlb-stats/schedule
 * @desc Obtener el calendario de la temporada
 * @access Público
 */
router.get("/schedule", async (req, res) => {
  try {
    const data = await getSeasonSchedule();
    res.json(data);
  } catch (error) {
    sendErrorResponse(res, 500, "Error obteniendo el calendario");
  }
});

/**
 * @route GET /api/mlb-stats/live/:gamePk
 * @desc Obtener estado en vivo de un juego por gamePk
 * @access Público
 */
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

/**
 * @route GET /api/mlb-stats/live/:gamePk/timecode/:timecode
 * @desc Obtener estado en vivo de un juego por gamePk y timecode
 * @access Público
 */
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

/**
 * @route GET /api/mlb-stats/live/:gamePk/timestamps
 * @desc Obtener timestamps de un juego por gamePk
 * @access Público
 */
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

/**
 * @route GET /api/mlb-stats/people/:playerId
 * @desc Obtener información de un jugador por playerId
 * @access Público
 */
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

/**
 * @route GET /api/mlb-stats/teams/:teamId/roster
 * @desc Obtener el roster de un equipo por teamId
 * @access Público
 */
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

export default router;
