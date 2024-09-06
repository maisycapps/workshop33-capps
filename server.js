const express = require("express");
const app = express();
const PORT = 3000;

const prisma = require("./prisma");

app.use(express.json());
app.use(require("morgan")("dev"));

app.use((error, req, res, next) => {
    res.status(res.status || 500).send({ error: error });
  });  

// GET /api/players - returns an array of all players
app.get("/api/players", async (req, res, next) => {
  const players = await prisma.player.findMany();
  res.send(players);
});

// POST /api/players - creates a new player with the information provided in the request body
app.post("/api/players", async(req, res, next) => {
    try {
        const { name, breed, status } = req.body;
        const player = await prisma.player.create({
            data: { name, breed, status },
        });
        res.json(player);
    } catch (error) {
        next(error)
    }
})

// GET /api/players/:id - returns a single player with the specified id
app.get("/api/players/:id", async (req, res, next) => {
    try {
      const id = +req.params.id;
      const player = await prisma.player.findUnique({ where: { id } });
      if (!player) {
        const error = new Error("Player not found.");
        error.status = 404;
        throw error;
      }
      res.json(player);
    } catch (error) {
      next(error);
    }
});
// PUT /api/players/:id - overwrites the player status to field or bench with the information provided in the request body
app.put("/api/players/:id", async(req, res, next) => {
    try {
        const id = +req.params.id;
        const { breed, status } = req.body;
        const player = await prisma.player.update({
            where: { id },
            data: { breed, status },
        });
        res.json(player);
    } catch (error) {
        next(error)
    }
})

// DELETE /api/players/:id - deletes the player with the specified id
app.delete("/api/players/:id", async(req, res, next) => {
    try {
        const id = +req.params.id;
        await prisma.player.delete({ where: { id } });
        res.sendStatus(204);
      } catch (error) {
        next(error);
      }
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
