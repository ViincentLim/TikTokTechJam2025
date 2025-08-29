from fastapi import FastAPI
from pydantic import BaseModel
from starlette.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

from genai import client

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/video/{video_id}")
async def get_video(video_id: str):
    # Simulate fetching video data
    return {"video_id": video_id, "title": "Sample Video"}


class CaptchaWebsite(BaseModel):
    thoughts: str
    html: str

# Relative filepath ./prompts/generate_captcha.txt
with open("./prompts/generate_captcha.md", "r") as f:
    prompt = f.read()

@app.get("/captcha", response_class=HTMLResponse)
async def get_captcha():
    print("Generating captcha...")
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )
    print("Captcha generated.")
    return HTMLResponse(response.text)
