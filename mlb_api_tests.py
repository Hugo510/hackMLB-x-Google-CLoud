import requests
import json
import os


class MLBAPI:
    """Clase para realizar solicitudes a la API de MLB y obtener datos en formato JSON."""
    BASE_URL = "https://statsapi.mlb.com/api/v1"

    def __init__(self):
        pass

    @staticmethod
    def fetch_url(url, params=None):
        """
        Envía una solicitud GET a la URL especificada.
        :param url: URL de la solicitud
        :param params: Parámetros de la solicitud
        :return: Respuesta JSON o None si ocurre un error
        """
        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error fetching data: {e}")
            return None

    # Endpoints relevantes
    def get_season_schedule(self, sport_id=1, season=2024, game_type="R"):
        """
        Devuelve el calendario de la temporada.
        :param sport_id: ID del deporte, predeterminado 1 para MLB
        :param season: Año de la temporada
        :param game_type: Tipo de juego (R, P, S)
        :return: Datos en formato JSON o None si ocurre un error
        """
        url = f"{self.BASE_URL}/schedule"
        params = {"sportId": sport_id, "season": season, "gameType": game_type}
        return self.fetch_url(url, params)

    def get_game_state(self, game_pk):
        """
        Devuelve el estado completo de un juego.
        :param game_pk: ID del juego
        :return: Datos en formato JSON o None si ocurre un error
        """
        url = f"{self.BASE_URL}.1/game/{game_pk}/feed/live"
        return self.fetch_url(url)

    def get_game_update_timestamps(self, game_pk):
        """
        Devuelve los timestamps de actualizaciones del juego.
        :param game_pk: ID del juego
        :return: Datos en formato JSON o None si ocurre un error
        """
        url = f"{self.BASE_URL}.1/game/{game_pk}/feed/live/timestamps"
        return self.fetch_url(url)

    def get_team_roster(self, team_id, season=2024):
        """
        Devuelve el roster de un equipo.
        :param team_id: ID del equipo
        :param season: Año de la temporada
        :return: Datos en formato JSON o None si ocurre un error
        """
        url = f"{self.BASE_URL}/teams/{team_id}/roster"
        params = {"season": season}
        return self.fetch_url(url)

    def get_player_info(self, player_id):
        """
        Devuelve información de un jugador.
        :param player_id: ID del jugador
        :return: Datos en formato JSON o None si ocurre un error
        """
        url = f"{self.BASE_URL}/people/{player_id}"
        return self.fetch_url(url)


def save_to_file(data, filename):
    """Guarda datos en un archivo JSON si estos no están vacíos."""
    if data:
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        print(f"Datos guardados en {filename}")
    else:
        print(f"No se pudo guardar {filename}, los datos están vacíos.")


def automate_tests():
    """Prueba automática de los endpoints relevantes con manejo de errores robusto."""
    api = MLBAPI()

    # Crear directorio para los resultados
    output_dir = "mlb_api_results"
    os.makedirs(output_dir, exist_ok=True)

    # 1. Obtener el calendario de la temporada
    schedule_data = api.get_season_schedule()
    if schedule_data is None:
        print("Error al obtener el calendario de la temporada.")
    save_to_file(schedule_data, os.path.join(output_dir, "season_schedule.json"))

    # Extraer un game_pk para usarlo en pruebas posteriores
    try:
        example_game_pk = schedule_data["dates"][0]["games"][0]["gamePk"]
    except (KeyError, IndexError, TypeError):
        print("No se encontró un game_pk en el calendario.")
        example_game_pk = None

    # 2. Obtener el estado completo de un juego
    if example_game_pk:
        game_state_data = api.get_game_state(example_game_pk)
        if game_state_data is None:
            print("Error al obtener el estado del juego.")
        save_to_file(game_state_data, os.path.join(output_dir, "game_state.json"))

        # 3. Obtener los timestamps de actualizaciones del juego
        timestamps_data = api.get_game_update_timestamps(example_game_pk)
        if timestamps_data is None:
            print("Error al obtener los timestamps del juego.")
        save_to_file(timestamps_data, os.path.join(output_dir, "game_timestamps.json"))
    else:
        print("No se realizaron pruebas para game_state y timestamps debido a la falta de game_pk.")

    # 4. Obtener el roster de un equipo
    example_team_id = 119  # ID del equipo, puedes ajustarlo
    roster_data = api.get_team_roster(example_team_id)
    if roster_data is None:
        print("Error al obtener el roster del equipo.")
    save_to_file(roster_data, os.path.join(output_dir, "team_roster.json"))

    # 5. Obtener información de un jugador
    example_player_id = 545361  # ID de jugador, puedes ajustarlo
    player_data = api.get_player_info(example_player_id)
    if player_data is None:
        print("Error al obtener la información del jugador.")
    save_to_file(player_data, os.path.join(output_dir, "player_info.json"))

    print("\nPruebas completadas. Archivos generados en el directorio:", output_dir)


if __name__ == "__main__":
    automate_tests()
