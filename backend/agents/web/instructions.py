helium_instructions = """
You can use helium to access websites. Don't bother about the helium driver, it's already managed.
We've already ran "from helium import *"
Then you can go to pages!
Code:
```py
go_to('github.com/trending')
```<end_code>

You can directly click clickable elements by inputting the text that appears on them.
Code:
```py
click("Top products")
```<end_code>

If it's a link:
Code:
```py
click(Link("Top products"))
```<end_code>

If you try to interact with an element and it's not found, you'll get a LookupError.
In general stop your action after each button click to see what happens on your screenshot.
Never try to login in a page.

To scroll up or down, use scroll_down or scroll_up with as an argument the number of pixels to scroll from.
Code:
```py
scroll_down(num_pixels=1200) # This will scroll one viewport down
```<end_code>

When you have pop-ups with a cross icon to close, don't try to click the close icon by finding its element or targeting an 'X' element (this most often fails).
Just use your built-in tool `close_popups` to close them:
Code:
```py
close_popups()
```<end_code>

You can use .exists() to check for the existence of an element. For example:
Code:
```py
if Text('Accept cookies?').exists():
    click('I accept')
```<end_code>
"""

evaluate_web_game_instructions ="""
Please navigate to file:///private/tmp/index.html and check if the web game is functioning correctly.

This web game acts as a CAPTCHA to verify that the user is a human.

1. It should be fully interactive, allowing users to play the game without any issues.
2. All game elements should be visible and accessible.
3. The game should have clear and intuitive instructions for playing.
4. There should be no console errors or broken functionality.
5. The game should be solvable for a human within 1 minute.

Please give feedback on the game's functionality and any issues encountered during testing.
"""

