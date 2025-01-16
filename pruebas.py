import requests
import json


class MLBAPI:
    """Clase para interactuar con la API de MLB."""

    BASE_URL = "https://statsapi.mlb.com/api/v1"

    def __init__(self):
        pass

    @staticmethod
    def fetch_url(url, params=None):
        """
        Envía una solicitud GET a la URL especificada.
        :param url: URL de la solicitud
        :param params: Parámetros de la solicitud
        :return: Respuesta en formato JSON o None en caso de error
        """
        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error fetching data: {e}")
            return None

    # 1. Obtener el calendario de la temporada
    def get_season_schedule(self, sport_id=1, season=2024, game_type="R"):
        """
        Obtiene el calendario de la temporada.
        :param sport_id: ID del deporte (MLB = 1)
        :param season: Año de la temporada
        :param game_type: Tipo de juego (R, P, S)
        :return: Objeto JSON con la información del calendario
        """
        url = f"{self.BASE_URL}/schedule"
        params = {"sportId": sport_id, "season": season, "gameType": game_type}
        return self.fetch_url(url, params)

    # 2. Obtener el estado completo del juego
    def get_game_state(self, game_pk):
        """
        Obtiene el estado completo del juego.
        :param game_pk: ID del juego
        :return: Objeto JSON con la información del estado del juego
        """
        url = f"{self.BASE_URL}.1/game/{game_pk}/feed/live"
        return self.fetch_url(url)

    # 3. Obtener el estado del juego en un momento específico
    def get_game_state_at_time(self, game_pk, timecode):
        """
        Obtiene el estado del juego en un momento específico.
        :param game_pk: ID del juego
        :param timecode: Código de tiempo en formato yyyymmdd_######
        :return: Objeto JSON con la información del estado del juego en el momento especificado
        """
        url = f"{self.BASE_URL}.1/game/{game_pk}/feed/live"
        params = {"timecode": timecode}
        return self.fetch_url(url, params)

    # 4. Obtener los timestamps de actualizaciones de un juego
    def get_game_update_timestamps(self, game_pk):
        """
        Obtiene los timestamps de actualizaciones de un juego.
        :param game_pk: ID del juego
        :return: Objeto JSON con los timestamps de actualizaciones
        """
        url = f"{self.BASE_URL}.1/game/{game_pk}/feed/live/timestamps"
        return self.fetch_url(url)

    # 5. Obtener el roster de un equipo
    def get_team_roster(self, team_id, season=2024):
        """
        Obtiene el roster de un equipo.
        :param team_id: ID del equipo
        :param season: Año de la temporada
        :return: Objeto JSON con la información del roster del equipo
        """
        url = f"{self.BASE_URL}/teams/{team_id}/roster"
        params = {"season": season}
        return self.fetch_url(url, params)

    # 6. Obtener información de un jugador
    def get_player_info(self, player_id):
        """
        Obtiene información de un jugador.
        :param player_id: ID del jugador
        :return: Objeto JSON con la información del jugador
        """
        url = f"{self.BASE_URL}/people/{player_id}"
        return self.fetch_url(url)


# Formatear la salida para mejor visualización
def pretty_print(data):
    print(json.dumps(data, indent=4))


# Menú de pruebas
def main():
    """Función principal que muestra un menú para probar la API de MLB."""
    api = MLBAPI()

    print("\nMLB API Tester")
    print("1. Obtener el calendario de la temporada")
    print("2. Obtener el estado completo de un juego")
    print("3. Obtener el estado del juego en un momento específico")
    print("4. Obtener timestamps de actualizaciones de un juego")
    print("5. Obtener el roster de un equipo")
    print("6. Obtener información de un jugador")
    print("7. Salir")

    while True:
        try:
            choice = input("\nElige una opción (1-7): ")

            if choice == "1":
                try:
                    season = int(input("Temporada (e.g., 2024): "))
                except ValueError:
                    print("Entrada inválida. Usa un número entero para la temporada.")
                    continue
                game_type = input("Tipo de juego (R, P, S): ")
                data = api.get_season_schedule(season=season, game_type=game_type)
                pretty_print(data)

            elif choice == "2":
                game_pk = input("ID del juego (game_pk): ")
                data = api.get_game_state(game_pk)
                pretty_print(data)

            elif choice == "3":
                game_pk = input("ID del juego (game_pk): ")
                timecode = input("Timestamp (yyyymmdd_######): ")
                data = api.get_game_state_at_time(game_pk, timecode)
                pretty_print(data)

            elif choice == "4":
                game_pk = input("ID del juego (game_pk): ")
                data = api.get_game_update_timestamps(game_pk)
                pretty_print(data)

            elif choice == "5":
                team_id = input("ID del equipo (team_id): ")
                season = int(input("Temporada (e.g., 2024): "))
                data = api.get_team_roster(team_id, season)
                pretty_print(data)

            elif choice == "6":
                player_id = input("ID del jugador (player_id): ")
                data = api.get_player_info(player_id)
                pretty_print(data)

            elif choice == "7":
                print("Saliendo del programa. ¡Hasta luego!")
                break

            else:
                print("Opción inválida. Por favor, elige una opción válida.")
        except Exception as ex:
            print(f"Ocurrió un error inesperado: {ex}")


if __name__ == "__main__":
    main()
