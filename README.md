# Automatized 8-Puzzle Game :brain:
First approach to automatized and 8-Puzzle game using backtracking and A* algorithms.

![](https://img.shields.io/badge/JavaScript-ED8B00?style=for-the-badge&logo=javascript&logoColor=white) ![](https://img.shields.io/badge/-CSS3-blue?style=for-the-badge&logo=css3&logoColor=white) ![](https://img.shields.io/badge/-HTML-red?style=for-the-badge&logo=html5&logoColor=white) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

## Description 
This application plays the 8-Puzzle game by itself, where the user can choose between two algorithms (Backtraking and A*). It also allows you to customize the start board that the user wants, as well as a step-by-step solution to see how the algorithm behaves graphically.

## Algorithms :thinking:
The process for Backtracking and A* algorithms are very similar. They both check child nodes. We also use a iterative version for both algorithms, starting from an initial board (or state) and then start exploring from the children.

- **Backtracking**: This algorithm works like a big expansive wave, checking everytime for each nove every single posibility. Whenever found the solution, it would return the path was been registered through all the iterations. Also, this algorithm have a maximum allowed iterations to avoid the fatal-crash of the browser. The algorithm works well, but explores every single posibility (not including already discovered states) and can take too much time to find the result.
- **A* algorithm**: This also work like a big expansive wave, with the big difference that consider two things: the distance from the root and also the Manhattan distance, which actually is just a simple calculus operation for every single piece of the board that indicates how far they are from the desired position (being close to the solution) and inserting this final weight of each node (Manhattan distance + height) on a priority queue, that would always return the node with the minimum weight. This would help to priorize how the algorithm choose were to go. Also there is a point were the algorithm can just look inmate, but that would the root again as the starting point but ignoring the already visited nodes.

## How to run the project 🤖
Opening the index.js file on your browser or you can deploy it [clicking here](https://hros19.github.io/Automatized_8-Puzzle-Game/).

## How to use the app ✍️
You cant play as well, but you can change the environment in which the algorithms are going to be developed. Before going in to the buttons, you can select each position of the board and make your custom one, just becareful to select a valid board and a solvable board or the application would notice you.

Then, we have some buttons in the application, these are:
- **Solución/Solution**: runs the algorithm is selected, the default algorithm is A*. Is you select to show the solution, you have to wait till ends, just would not be able to press any button. The application have a maximum recursion involved with the Backtracking algorithm that would stop the execution in a friendly so you dont have to worry (not at all). If you want to force the reset of a execution you would need to refresh the page as well.
- **Shuffle**: gives the user the posibility of selecting and completily random board to play. The application always select a board that have solution.
- **Cambiar/Change Algo**: since there are only two, it alternates between the implemented algorithms (A*/Backtracking). You can also change it as much you need, you just have to consider the maximum recursion iterations that are allowed for the Backtracking (no need it for the A* algorithm).
- **Sig Paso/Next step**: would perform a single step that the algorithm make, you can go ahead and view each movement the algorithm make to take a decision in every state of the game. If you want to alter any position during a next-step visualization of the algorithm you would need to use the entry on  the right of the queue of buttons. Is simple, write a number that have a condition of switchable (if is next to the cero) and then press again 'next step' button and go ahead as long the path is.
- **Reset**: reset to the initial status of the application, making restarting easy, without having to refresh the page. This would also set the matrix as default.
- **Intercambiar/Swap**: this button is associated with the input next to it. If you are viewing the algorithm step by step, you have the possibility of changing the state of the board to a preferred one (overriding the decision made by the algorithm).

**NOTE**: Because the paths considered are usually long, we have decided to show the path as such followed by the algorithms by means of an Alert. The movements are abbreviated as follows:
- **l**: (lowercase L). Which means left.
- **r**: right.
- **u**: up.
- **d**: down.
For example, '(d; 4)' means 'Piece 4 moves down'.

And you would see frequently the symbol '~', which means a back-up to the last valid state to start seeking from there.

## Conclusion
The implementation looks very noobie but was the result of trying and trying different points of view that actually help to the final implementation that you would find in the repo. Considering this is a first approach of this type of implementation for the group we feel like they were many dificulties but the main movitation was exactly that, our first 'IA' implementation on a simple 8-Puzzle game make all of us impatient to see what other interesting things we can do with this type of algorithms.

## Authors 🤓
![Hansol's GitHub stats](https://github-readme-stats.vercel.app/api?username=hros19&bg_color=60,1c3773,0055fb&title_color=ff5d05&text_color=fff&show_icons=true&count_private=true&icon_color=FF3838)

![Josue's GitHub stats](https://github-readme-stats.vercel.app/api?username=jochaes&bg_color=60,1c3773,0055fb&title_color=ff5d05&text_color=fff&show_icons=true&count_private=true&icon_color=FF3838)

![Benjamin's GitHub stats](https://github-readme-stats.vercel.app/api?username=JoshJohnson2001&bg_color=60,1c3773,0055fb&title_color=ff5d05&text_color=fff&show_icons=true&count_private=true&icon_color=FF3838)

## Credits :bow:
- We want to thanks [Geekforgeeks](https://www.geeksforgeeks.org), we use this [algorithm](https://www.geeksforgeeks.org/check-instance-8-puzzle-solvable/) to ensure that the board selected in the application have a solution, this is very useful because maybe (trust me, just maybe) the application could not work properly. Also we have to said that we had to fix the JavaScript implementation of the algorithm in the article just mentioned before, you can also check it on 'colaPrioridad.js' file.

## License
This project is currently using [MIT license](https://www.mit.edu/~amini/LICENSE.md)
