from smolagents import ToolCallingAgent, LiteLLMModel
from agents.web.exported_tool import EvaluateGeneratedGameTool
from agents.manager.instructions import generate_captcha_game_instructions

# Initialize the model
llm = LiteLLMModel("gemini/gemini-2.5-flash")

evaluate_generated_game_tool = EvaluateGeneratedGameTool()


from agents.manager.tools import WriteFileTool, GetConsoleLogTool


write_file_tool = WriteFileTool()
get_console_log_tool = GetConsoleLogTool()

# Create the agent
manager_agent = ToolCallingAgent(
    tools=[evaluate_generated_game_tool, write_file_tool, get_console_log_tool],
    model=llm,
    max_steps=20,
    verbosity_level=2,
    add_base_tools=True
)

def run_manager_agent():
    return manager_agent.run(generate_captcha_game_instructions)
