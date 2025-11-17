const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

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

let opinions = [
  {
    "_id": 1,
    "user": "Username",
    "opinion": "EVO Firecracker solos"
  },
  {
    "_id": 2,
    "user": "Username",
    "opinion": "Logbait is the worst"
  },
  {
    "_id": 3,
    "user": "Username",
    "opinion": "Nerf Evo Piggies"
  },
  {
    "_id": 4,
    "user": "Username",
    "opinion": "Boss Bandit is the best card OAT"
  },
  {
    "_id": 5,
    "user": "Username",
    "opinion": "SC should've beaten A&M"
  },
  {
    "_id": 6,
    "user": "Username",
    "opinion": "The last one wasn't a Clash Opinion..."
  },
];

app.get("/api/decks", (req, res) => {
  console.log("in get request");
  res.send(decks);
});

app.get("/api/decks/:id", (req, res) => {
  const deck = decks.find((deck) => deck._id === parseInt(req.params.id));
  res.send(deck);
});

app.get("/api/opinions", (req, res) => {
  console.log("in get request /api/opinions");
  res.send(opinions);
});

app.get("/api/opinions/:id", (req, res) => {
  const opinion = opinions.find((op) => op._id === parseInt(req.params.id));
  res.send(opinion);
});

app.post("/api/opinions", (req, res) => {
  const { user, opinion } = req.body;

  const newOpinion = {
    _id: opinions.length + 1,
    user,
    opinion,
  };

  opinions.push(newOpinion);
  res.status(200).json(newOpinion);
});

app.listen(3001, () => {
});
