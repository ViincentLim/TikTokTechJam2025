# TikTok TechJam 2025

This is team WhaleOfATime’s submission for TikTok TechJam 2025, addressing the problem statement “Value-sharing reimagined”. We are also attempting the optional UI challenge to build our solution for the AI Era using Lynx.

## Introduction
To provide novel solutions for value-sharing in the online creator space, we sought to redefine what “value” can mean for the creator. An existing feature that TikTok has is its “gifting” system, where virtual gifts can be bought with real money and sent to creators, who then get a portion of this money. Borrowing upon this idea, we asked ourselves, “Are there any other forms of non-monetary value that would benefit creators? Since many platforms such as TikTok and YouTube are algorithm-based, we realised that creators also value attention and credibility - factors that would help to drive viewer traffic towards their content.

## Main Solution
### FEATURES
- Badge system
- AI-generated minigame CAPTCHAs
### FUNCTIONALITY
Our solution is a new badge system, implemented in the TikTok context. On the UI of every video and livestream, there will be this new prominent pill display that will show the badges awarded / lack thereof.
- The badge system gives the option for viewers to exchange real currency for badges (via TikTok’s coin system) and gift these badges to creators’ short videos and livestreams
- These badges (e.g. Outstanding Badge, Family-friendly Badge, Enjoyment Badge) act like positive reviews / seals of approval and are meant to signal to other potential viewers that the gifted creator’s content is worth watching, increasing their views and attention.
- We have planned the badges to be moderately to highly priced. This would make the badges have more significance, where gifting a badge to a creator would imply that they are genuinely interesting to watch, credible etc.


## Fraud and system-gaming prevention
In the AI Era, AI agents will be widely accessible. This presents a problem for companies and developers that have to deal with the increased intensity and frequency of system-gaming and fraudulent activity. To address this issue, our team has come up with a proof-of-concept: using AI to generate minigames for human verification. We chose 2D, minimalistic puzzle games for their ease of generation and gentle learning curve. Games are also deliberately kept short and simple to increase user retention. To ensure game quality, we utilised the well-known Phaser library for puzzle generation.


## Fund safety
Our badge system will utilise TikTok’s existing coin ecosystem to ensure that microtransactions are secure. For context, in TikTok’s virtual gifting feature, viewers pay for these gifts with TikTok Coins, which can be exchanged for real currency. Our solution also aims to improve fund safety with the AI-generated minigames feature. In the incoming AI Era, current pattern-recognition challenges are no longer enough to distinguish humans from machines. That is why we thought to rely on unconventional logical tests - games, using AI to vary the logic puzzles each time, increasing the difficulty for a well-trained AI to pass off as a human.
More details on the AI-generated minigames
For the LLM-generated CAPTCHA minigame, we utilised AI agents. We would write the AI-generated game code to a file, before using another web agent to get feedback on this HTML file, by taking a screenshot (literal picture) of the game and feeding that into a VLM. This VLM check ensures that the game is playable, visible and accessible.

## Future ambitions for AI-generated minigames
We plan to expand upon this idea of AI-generated minigames, possibly adding them in between the scrolling of videos to increase viewer retention and engagement. This could potentially deter viewbotting as viewbots would face difficulty overcoming these minigames, ensuring that view counts are more accurate, and limiting fraudulent activity.



## Challenges faced
Lynx is not that mature as a framework, resulting in us losing a lot of sleep due to the unavailability of many native elements we have come to take for granted. The lack of pre-built components, even for common components such as videos and web-embedded views, meant that we had to make our own versions of them. In the end, we resorted to hosting our images and videos on Google Cloud Run. We had intended to develop our app for multiple platforms (as Lynx had designed), but due to these setbacks, we were unable to do so. The lack of documentation, as well as some seemingly incomplete/unverified articles (e.g. <x-video-pro>), also caused a lot of confusion in our development process.


## Assets used
https://www.svgrepo.com/svg/484569/coin
https://www.svgrepo.com/svg/532997/plus-large?edit=true
https://www.svgrepo.com/svg/500582/handbag?edit=true
https://www.svgrepo.com/svg/535437/home
https://www.svgrepo.com/svg/499624/message-square
https://www.svgrepo.com/svg/456992/account
https://www.svgrepo.com/svg/500977/present
https://www.svgrepo.com/svg/481959/rose-7
https://www.svgrepo.com/svg/352633/user-friends
https://www.svgrepo.com/svg/365739/smiley-thin
https://www.svgrepo.com/svg/479116/share-arrow
https://www.svgrepo.com/svg/535228/bookmark
https://www.svgrepo.com/svg/505430/message-circle-lines
https://www.svgrepo.com/svg/535436/heart
https://www.svgrepo.com/svg/535436/heart
The videos used in the project were recorded by our team.

A FastAPI backend with AI-powered captcha generation using Lynx, Selenium, and Google Gemini.

## Prerequisites

- Docker and Docker Compose installed
- Google Gemini API key

## Quick Start

### 1. Set up Environment Variables

Create a `.env` file in the backend directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 2. Build and Run with Docker Compose

```bash
# Build and start the container
docker-compose up --build

# Run in background
docker-compose up -d --build
```

### 3. Access the API

- **Health Check**: http://localhost:8000/
- **Captcha Generation**: http://localhost:8000/captcha
- **Video Endpoint**: http://localhost:8000/video/{video_id}

## Manual Docker Build

```bash
# Build the image
docker build -t tiktok-backend .

# Run the container
docker run -p 8000:8000 --env-file .env tiktok-backend
```

## Development

### Local Development (without Docker)

```bash
# Install dependencies
uv sync

# Run development server
uv run uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Development with Docker

```bash
# Run with volume mount for live code changes
docker-compose up --build

# View logs
docker-compose logs -f backend
```

## Architecture

### Components

- **FastAPI**: Web framework for API endpoints
- **Selenium/Chrome**: Web automation for captcha testing
- **smolagents**: AI agent framework for captcha generation
- **Google Gemini**: AI model for game generation
- **uv**: Python dependency management

### Key Features

- **Captcha Generation**: AI-powered puzzle games
- **Web Automation**: Selenium-based testing
- **Containerized**: Full Docker support with Chrome
- **Health Checks**: Built-in monitoring
- **CORS Enabled**: Cross-origin requests supported

## Troubleshooting

### Chrome Issues in Container

If you encounter Chrome-related errors:

1. **Check Chrome installation**:
   ```bash
   docker exec -it <container_name> google-chrome --version
   ```

2. **Verify Chrome options**:
   ```bash
   docker exec -it <container_name> env | grep CHROME
   ```

3. **Check logs**:
   ```bash
   docker-compose logs backend
   ```

### Memory Issues

The container is configured with 2GB memory limit. If you encounter memory issues:

1. **Increase memory limit** in `docker-compose.yml`
2. **Monitor memory usage**:
   ```bash
   docker stats
   ```

### API Key Issues

Ensure your `.env` file contains the correct API key:
```bash
# Test API key
curl -H "Authorization: Bearer $GEMINI_API_KEY" \
     https://generativelanguage.googleapis.com/v1beta/models
```

## Production Deployment

### Environment Variables

Required environment variables:
- `GEMINI_API_KEY`: Google Gemini API key

Optional:
- `CHROME_OPTIONS`: Additional Chrome flags
- `PYTHONUNBUFFERED`: Set to 1 for better logging

### Scaling

```bash
# Scale to multiple instances
docker-compose up --scale backend=3
```

### Monitoring

The container includes health checks:
- **Endpoint**: `/`
- **Interval**: 30 seconds
- **Timeout**: 10 seconds
- **Retries**: 3

## Notes

- **Captcha Timeout**: Some captchas are time-sensitive (15 seconds)
- **Replay Functionality**: Consider adding a replay button for failed captchas
- **Selenium Issues**: Clicking in Selenium may not work for web agents, leading to infinite loops
- **Mobile Viewport**: Games are designed for 9:16 aspect ratio mobile viewport

## File Structure

```
backend/
├── Dockerfile              # Container configuration
├── docker-compose.yml      # Multi-service setup
├── .dockerignore          # Build optimization
├── main.py                # FastAPI application
├── pyproject.toml         # Python dependencies
├── agents/                # AI agent modules
│   ├── manager/           # Captcha generation agent
│   └── web/              # Web automation tools
└── README.md             # This file
```
