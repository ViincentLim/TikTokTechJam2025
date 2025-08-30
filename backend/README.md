# Develop
Set up .env in this backend directory:
```env
GEMINI_API_KEY=<your_api_key>
```
Run the development server in /backend with:
```shell
# uv run --env-file .env fastapi dev
docker build -t tiktok/backend .
docker run -it -p 8000:8000 tiktok/backend
```

goto http://localhost:8090/captcha


# Notes
Add a replay button to reset if the captcha fail (maybe like up to 3 times)
Some captchas are time-sensitive

Current problem:
Clicking in selenium doesnt work for web agent, leads to infinite loop.