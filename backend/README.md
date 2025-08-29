# Develop
Set up .env in this backend directory:
```env
GEMINI_API_KEY=<your_api_key>
```
Run the development server in /backend with:
```shell
# uv run --env-file .env fastapi dev
docker build -t tiktok/backend .
docker run -t
```

# Notes
Add a replay button to reset if the captcha fail (maybe like up to 3 times)
Some captchas are time-sensitive