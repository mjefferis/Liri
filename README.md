# Liri
The goal of this app was to create a SIRI like machine but using commands instead of speech. It was created using Node.js and works with the Twitter, Spotify, and Omdb API to call upon data. I had to install the twitter, spotify, and npm packages to get the product fully functional. This code will not work if Node.js is not installed on your computer. If you wish to run this code on your own machine, you must perform an ````npm install```` to make sure you have all the necessary npm packages in your package.json file. This is a command-line application. The 4 commands you can run are below: 

````my-tweets```` will display my 20 latest tweets.

````spotify-this-song```` will display information regarding the song the user inputs. If no song is chosen, it will default to "The Sign".

````movie-this```` will log information regarding a movie the user enters. If no movie is selected, it will default to "Mr. Nobody".

````do-what-it-says```` will read a song from random.txt and log information pertaining to the song in said file. 
