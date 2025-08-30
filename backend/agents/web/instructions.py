helium_instructions = """
You can use helium to access websites. Don't bother about the helium driver, it's already managed.
We've already ran "from helium import *"
Then you can go to pages!
Code:
```py
go_to('github.com/trending')
```<end_code>

IMPORTANT NOTE:
The game is in a canvas with no searchable elements.
Use the exact coordinates of the screen for clicking interaction.
ONLY directly click clickable elements by inputting the text that appears on them.
Code:
```py
click(Point(200, 300))
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

You can get console logs by using

"""

evaluate_web_game_instructions ="""
Please navigate to file:///private/tmp/index.html and visually check if the game looks accessible.

DO NOT interact with the game with clicks, swipes, or any other form of input.

This web game acts as a CAPTCHA to verify that the user is a human.

1. All game elements should be visible and accessible.
2. The game should have clear and intuitive instructions for playing with intuitive touch controls specified.
3. There should be no console errors or broken functionality.
4. The game should look solvable for a human within 1 minute.

Please give feedback on the game's functionality and any issues identitfied.
"""

