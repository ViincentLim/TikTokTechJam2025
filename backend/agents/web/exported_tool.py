from smolagents import Tool
from agents.web.agent import web_agent
from agents.web.instructions import helium_instructions, evaluate_web_game_instructions

class EvaluateGeneratedGameTool(Tool):
    name = "evaluate_generated_game"
    description = """
    This is a tool that evaluates the generated game located at /private/tmp/index.html.
    It will give feedback on the game's functionality and any issues encountered during testing.
    """

    inputs = {
        "additional_remarks": {
            "type": "string",
            "description": "Any additional remarks or comments about the game",
        }
    }

    output_type = "string"

    def forward(self, additional_remarks):
        return web_agent.run(evaluate_web_game_instructions + helium_instructions + additional_remarks)

