from genai import client
from smolagents import Tool
from google.genai import types

class EvaluateScreenshotTool(Tool):
    name = "evaluate_screenshot"
    description = """
    This is a tool that evaluates a file path string to a screenshot, and get its content to determine if it is part of a valid game.
    It returns a description of the screenshot's content from a LLM.
    """

    inputs = {
        "screenshot": {
            "type": "string",
            "description": "the file path of the screenshot to evaluate",
        }
    }
    output_type = "string"

    def forward(self, screenshot):
        with open("./prompts/describe_screenshot.md", "r") as f:
            describe_screenshot_prompt = f.read()

        with open(screenshot, "rb") as f:
            image = types.Part.from_bytes(
                data=f.read(), mime_type="image/jpeg"
            )

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[describe_screenshot_prompt, image],

        )
        return response
