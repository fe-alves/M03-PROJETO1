const express = require("express");
const router = express.Router();

const filmes = [
    {
        id: 1,
        nome: "Harry Potter e a Pedra Filosofal",
        genero: "Fantasia",
        nota: "10",
        imagem: ""
    },
]

router.get('/', (req, res) => {
    res.send(filmes);
});

router.get("/:id", (req, res) => {
    const idParam = req.params.id;
    const filme = filmes.find(filme => filme.id == idParam);
    res.send(filme);
});

router.post("/add", (req, res) => {
    const filme = req.body;
    filme.id = Date.now();
    filmes.push(filme);
    res.status(201).send({
        message: "Filme Cadastrado",
        data: filme
    });
});

router.put('/edit/:id', (req, res) =>{
    const filmeEdit = req.body;
    const idParam = req.params.id;
    let index = filmes.findIndex(filme => filme.id == idParam);

    filmes[index] = {
        ...filmes[index],
        ...filmeEdit
    }
    res.send({
        message: "Filme Atualizado",
        data: filmes[index]
    });
});

router.delete('/delete/:id', (req, res) => {
    const idParam = req.params.id;
    const index = filmes.findIndex(filme => filme.id == idParam);
    filmes.splice(index, 1);
    res.send({
        message: "Filme Excluído"
    });
});

module.exports = router;