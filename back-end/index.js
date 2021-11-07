const express = require("express");
const cors = require("cors");
const FilmesRouter = require("./routes/filmes.routes");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", FilmesRouter);

const port = 3000;

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
