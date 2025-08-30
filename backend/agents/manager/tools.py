from smolagents import Tool
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

import time

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


class GetConsoleLogTool(Tool):
    name = "get_console_log"
    description = "Get the console log output from the browser when the game is loaded (on /private/tmp/index.html)"

    inputs = {}

    output_type = "string"

    def forward(self) -> str:
        chrome_options = Options()
        chrome_options.add_argument("--headless")  # Optional: run headless
        chrome_options.set_capability("goog:loggingPrefs", {"browser": "ALL"})

        driver = webdriver.Chrome(options=chrome_options)

        # Open the local HTML file
        driver.get("file:///private/tmp/index.html")

        # Wait for the page to load
        time.sleep(2)

        logs = ""
        try:
            for entry in driver.get_log("browser"):
                logs += f"{entry['level']}: {entry['message']}\n"
        except Exception as e:
            logs = f"Could not retrieve logs: {e}"

        driver.quit()
        return logs
