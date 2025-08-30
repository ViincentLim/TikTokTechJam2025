from smolagents import ToolCallingAgent, LiteLLMModel
from agents.web.exported_tool import EvaluateGeneratedGameTool
from agents.manager.instructions import generate_captcha_game_instructions

# Initialize the model
llm = LiteLLMModel("gemini/gemini-2.5-flash")

evaluate_generated_game_tool = EvaluateGeneratedGameTool()


from smolagents import Tool

class WriteFileTool(Tool):
    name = "write_file"
    description = "Write the contents (which is a string) to a local file"

    inputs = {
        "path": {
            "type": "string",
            "description": "The path to the file to write to",
        },
        "data": {
            "type": "string",
            "description": "The contents to write to the file",
        }
    }

    output_type = "string"

    def forward(self, path: str, data: str) -> str:
        with open(path, "w", encoding="utf-8") as f:
            f.write(data)
        return f"Wrote data to {path}"


write_file_tool = WriteFileTool()

# Create the agent
manager_agent = ToolCallingAgent(
    tools=[evaluate_generated_game_tool, write_file_tool],
    model=llm,
    max_steps=20,
    verbosity_level=2,
    add_base_tools=True
)

def run_manager_agent():
    manager_agent.run(generate_captcha_game_instructions)
