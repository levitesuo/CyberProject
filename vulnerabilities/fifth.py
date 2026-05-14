# VULNERABILITY 3: Open to sql injection
# LINK: https://owasp.org/Top10/2021/A03_2021-Injection/

# For this script to work you need to install aiohttp
from helper import API_BASE_URL, create_new_user_and_get_token
import aiohttp, asyncio


async def call_api(headers):
    return await aiohttp.ClientSession().post(
        f"{API_BASE_URL}/notes/ai", headers=headers, json={"prompt": "pp"}
    )


async def main():
    token = create_new_user_and_get_token()
    headers = {"Authorization": f"Bearer {token}"}
    url = f"{API_BASE_URL}/notes/ai"

    async with aiohttp.ClientSession(headers=headers) as s:
        tasks = [s.post(url, json={"prompt": "pp"}) for _ in range(1000)]
        responses = await asyncio.gather(*tasks)

        successful = sum(1 for r in responses if r.status == 200)
        return {"successful": successful, "total": len(responses)}


if __name__ == "__main__":
    import pprint

    pprint.pprint(asyncio.run(main()))
