from fastapi import FastAPI
from pydantic import BaseModel
from starlette.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from google import genai
from games import game_1, game_2, game_3

from agents.manager.agent import run_manager_agent

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


games = [
    game_1,
    game_2,
    game_3
]

async def give_game():
    try:
        if len(games) == 0:
            games.append(run_manager_agent())
        return games.pop()
    finally:
        games.append(run_manager_agent())

@app.get("/captcha", response_class=HTMLResponse)
async def get_captcha():
    print("Generating captcha...")
    response = await give_game()
    print("Captcha generated.")
    return HTMLResponse(response)

app.mount("/static", StaticFiles(directory="static"), name="static")