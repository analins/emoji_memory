### PROJECT #1: Emoji Memory Game

This is a standard concentration memory game built with Javascript/jQuery ./project_folder/scripts.js.

I built a 4x4 grid of squares with 8 pairs of images with one player and two player modes
Players click on images...two for each turn to flip the squares and see the images.
![start](./readme_imgs/start.png)

**One Player Mode:**
Find all the pairs in as few moves as possible.
![oneplayer](./readme_imgs/one_player.png)

**Two Player Mode:**
Two players take turns.
Player who finds the most pairs wins the game.
![twoplayer](./readme_imgs/two_player.png)
![twoplayerflipped](./readme_imgs/two_player_flipped.png)

In two player mode, the game keeps track of the score, and renders a message with who won and by how much when the match ends.
It also displays an animation where the champagne emojis 'rain' over the screen.
![winner](./readme_imgs/winner_screen.png)


**Approach**
I began by creating mockups of what I wanted the game to look like, and the stages of what I wanted it to do (./mockup/)
I also began to 'Pseudocode' the logic.
I set everything up with html and css...in order to get a clear visual of what I was doing and the space I was doing it in.
I coded different parts of the game that I knew I would need at some point (i.e. array of images, creating the square grid, etc.)because stringing everything together initially seemed impossible, so I started with smaller parts.
I pieced my functions together so they would do what I wanted them to do.


**Unsolved Problems**
CSS: Keeping everything perfectly centered at all times.
JS: Reset function. I used the location.reload() as an alternative.
Stopping the timer.
Although the game works and is visible, and appropriately sized on mobile devices, I would like to improve on that so it adapts better to a vertical screen. 
