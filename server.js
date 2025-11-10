const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
const upload = multer({ storage: storage });

let decks = [
  {
    "_id": 1,
    "name": "Evo Goblin Giant Furnace",
    "img_name": "images/md1.png",
    "type": "Beatdown",
    "author": "Mikael",
    "description": "Evo Goblin Giant + Furnace offense with solid 3-crown potential."
  },
  {
    "_id": 2,
    "name": "Golem Beatdown",
    "img_name": "images/md2.png",
    "type": "Beatdown",
    "author": "Mikael",
    "description": "Golem deck with strong defense-to-offense transitions."
  },
  {
    "_id": 3,
    "name": "Pekka Defense",
    "img_name": "images/md3.png",
    "type": "Control",
    "author": "Mikael",
    "description": "Pekka-based control deck with sneaky counterattacks."
  },
  {
    "_id": 4,
    "name": "Boss Bandit Rush",
    "img_name": "images/md4.png",
    "type": "Rush",
    "author": "Mikael",
    "description": "Boss Bandit aggression for quick wins."
  },
  {
    "_id": 5,
    "name": "Evo Fireball Bait",
    "img_name": "images/md5.png",
    "type": "Bait",
    "author": "Mikael",
    "description": "Classic fireball bait variation with Evos."
  },
  {
    "_id": 6,
    "name": "Log Bait Variation",
    "img_name": "images/md6.png",
    "type": "Bait",
    "author": "Mikael",
    "description": "Log bait with wallbreakers and evo goblin barrel."
  },
];

app.get("/api/decks", (req, res)=>{
    console.log("in get request");
    res.send(decks);
});

app.get("/api/decks/:id", (req, res)=>{
    const deck=decks.find((deck)=>deck._id === parseInt(req.params.id));
    res.send(deck);
});

app.listen(3001, () => {
});