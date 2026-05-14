import requests

API_BASE_URL = "http://localhost:3001"


def create_new_user_and_get_token():
    try:
        # Errors if user exists, but we don't care about that
        response = requests.post(
            f"{API_BASE_URL}/auth/register",
            json={"username": "newuser", "password": "password"},
        )
    except:
        pass

    response = requests.post(
        f"{API_BASE_URL}/auth/login",
        json={"username": "newuser", "password": "password"},
    )

    return response.json()["token"]
