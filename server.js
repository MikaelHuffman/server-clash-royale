const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");
const path = require("path");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    const safe = Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
    cb(null, safe);
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
    "opinion": "SC should've beaten Alabama"
  },
  {
    "_id": 6,
    "user": "Username",
    "opinion": "The last one wasn't a Clash Opinion..."
  },
];

const opinionSchema = Joi.object({
  user: Joi.string().trim().min(1).required(),
  opinion: Joi.string().trim().min(3).required(),
});

app.get("/api/decks", (req, res) => {
  res.send(decks);
});

app.get("/api/decks/:id", (req, res) => {
  const deck = decks.find((deck) => deck._id === parseInt(req.params.id));
  res.send(deck);
});

app.get("/api/opinions", (req, res) => {
  res.send(opinions);
});

app.get("/api/opinions/:id", (req, res) => {
  const op = opinions.find((o) => o._id === parseInt(req.params.id));
  res.send(op);
});

app.post("/api/opinions", upload.single("img"), (req, res) => {
  try {
    let body = req.body;
    const validation = opinionSchema.validate({
      user: body.user,
      opinion: body.opinion,
    });
    if (validation.error) {
      return res.status(400).json({ error: validation.error.details[0].message });
    }

    const maxId = opinions.reduce((max, cur) => (cur._id > max ? cur._id : max), 0);
    const newId = maxId + 1;

    const newOpinion = {
      _id: newId,
      user: body.user,
      opinion: body.opinion,
    };

    if (req.file) {
      newOpinion.img_name = path.join("images", req.file.filename).replace(/\\/g, "/");
    }

    opinions.push(newOpinion);
    return res.status(200).json(newOpinion);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// edit opinion
app.put("/api/opinions/:id", upload.single("img"), (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const idx = opinions.findIndex((o) => o._id === id);
    if (idx === -1) return res.status(404).json({ error: "Opinion not found" });

    const body = req.body;
    const validation = opinionSchema.validate({
      user: body.user,
      opinion: body.opinion,
    });
    if (validation.error) {
      return res.status(400).json({ error: validation.error.details[0].message });
    }

    opinions[idx].user = body.user;
    opinions[idx].opinion = body.opinion;

    if (req.file) {
      opinions[idx].img_name = path.join("images", req.file.filename).replace(/\\/g, "/");
    }

    return res.status(200).json(opinions[idx]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// delete opinion
app.delete("/api/opinions/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const idx = opinions.findIndex((o) => o._id === id);
    if (idx === -1) return res.status(404).json({ error: "Opinion not found" });
    const removed = opinions.splice(idx, 1)[0];
    return res.status(200).json({ success: true, removedId: removed._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3001, () => {
});
