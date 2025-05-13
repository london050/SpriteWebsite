const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');

const app = express();

// Mustache setup
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/information', (req, res) => {
  res.render('information', {
    sections: [
      {
        title: "Project Setup & Game Loop",
        embed: "https://www.canva.com/design/DAGnRRkFD0w/Q_gD1xXcou8m1_bfizvUrg/view?embed",
        description: "This section covers setting up the project in IntelliJ and building the game loop. The game loop is critical for maintaining a steady frame rate and smoothly updating and rendering the game each tick."
      },
      {
        title: "Player Movement & Input",
        embed: "https://www.canva.com/design/DAGnRp6d1d0/h-ixEBeJ_cjNnZEKLQ3KVw/view?embed",
        description: "This part introduces the KeyHandler class and player movement logic. It explains how real-time keyboard input is used to move the player and animate the character on screen."
      },
      {
        title: "Tile Rendering & World Map",
        embed: "https://www.canva.com/design/DAGnRm50XDY/Y0daOWsYoat1rycLfhDIeg/view?embed",
        description: "Here we cover how tile images are loaded from the resource folder, mapped from a 2D text file, and then drawn as the world environment based on camera position."
      },
      {
        title: "Collision Detection",
        embed: "https://www.canva.com/design/DAGnRlSH35U/sOWJ-LpnU_M_ysK6sY0HSQ/view?embed",
        description: "This slide explains how to set up collision areas for solid objects and map tiles, including checking collisions between the player and the game world."
      },
      {
        title: "Object Placement",
        embed: "https://www.canva.com/design/DAGnRtsidI0/Le2xoNJhx5oalwvzxfvW0Q/view?embed",
        description: "We talk about placing objects like keys, doors, or items using an ObjectManager and how these objects are rendered within the map boundaries."
      },
      {
        title: "Object Interaction",
        embed: "https://www.canva.com/design/DAGnXrbQH8c/UMeNGPGC2kzOeK1mbDn_iw/view?embed",
        description: "This expands on how the player interacts with placed objects — such as collecting items, unlocking doors, or triggering actions based on player position."
      },
      {
        title: "Sound and UI System",
        embed: "https://www.canva.com/design/DAGnXtPBc1Y/b4ukIQ0bYZz6r9DZnPyRJg/view?embed",
        description: "In this final part, sound effects and background music are added. UI elements like health bars and message windows are also discussed."
      }
    ]
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
