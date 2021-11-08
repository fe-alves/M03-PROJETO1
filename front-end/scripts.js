const lista = document.getElementById("lista");
const apiUrl = "http://localhost:3000";

let edicao = false;
let idEdicao = 0;

let nome = document.getElementById("nome");
let genero = document.getElementById("genero");
let nota = document.getElementById("nota");
let imagem = document.getElementById("imagem");

const getFilmes = async () => {
  const response = await fetch(apiUrl);
  const filmes = await response.json();

  console.log(filmes);

  filmes.map((filme) => {
    lista.insertAdjacentHTML(
      "beforeend",
      `
        <div class="col">
            <div class="card">
            <img src="${filme.imagem}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${filme.nome}</h5>
                <p class="card-text">Gênero: ${filme.genero}</p>
                <p class="card-text">Nota: ${filme.nota}</p>
                <div>
                    <button class="btn btn-primary" onclick="editVaga('${filme.id}')">Editar</button>
                    <button class="btn btn-danger" onclick="deleteVaga('${filme.id}')">Deletar</button>
                </div>
            </div>
            </div>
        </div>
        `
    );
  });
};

const submitForm = async (event) => {
  event.preventDefault();

  const filme = {
    nome: nome.value,
    genero: genero.value,
    nota: parseFloat(nota.value),
    imagem: imagem.value,
  };

  if (edicao) {
    putFilme(filme, idEdicao);
  } else {
    createFilme(filme);
  }

  clearFields();
  lista.innerHTML = "";
};

const createFilme = async (filme) => {
  const request = new Request(`${apiUrl}/add`, {
    method: "POST",
    body: JSON.stringify(filme),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });

  const response = await fetch(request);

  const result = await response.json();
  alert(result.message);
  getFilmes();
};

const putFilme = async (filme, id) => {
  const request = new Request(`${apiUrl}/edit/${id}`, {
    method: "PUT",
    body: JSON.stringify(filme),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
  const response = await fetch(request);

  const result = await response.json();
  alert(result.message);
  edicao = false;
  idEdicao = 0;
  getVagas();
};

const deleteFilme = async (id) => {
  const request = new Request(`${apiUrl}/delete/${id}`, {
    method: "DELETE",
  });

  const response = await fetch(request);
  const result = await response.json();

  alert(result.message);

  lista.innerHTML = "";
  geFilmes();
};

const getFilmeById = async (id) => {
  const response = await fetch(`${apiUrl}/${id}`);
  return await response.json();
};


const editFilme = async (id) => {
  edicao = true;
  idEdicao = id;

  const vaga = await getFilmeById(id);

  nome.value = filme.titulo;
  genero.value = filme.genero;
  nota.value = filme.nota;
  imagem.value = filme.imagem;
};

const clearFields = () => {
  nome.value = "";
  genero.value = "";
  nota.value = "";
  imagem.value = "";
};

getFilmes();
