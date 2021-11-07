// buscar o elemento no html da minha lista onde irei inserir as vagas
const lista = document.getElementById("lista");

// atribuindo a endpoint da api do backend em um constante
const apiUrl = "http://localhost:3000";

// modo edicao e id edicao
let edicao = false;
let idEdicao = 0;

// pegar os dados que o usuario digita no input (Elementos)
let nome = document.getElementById("nome");
let genero = document.getElementById("genero");
let nota = document.getElementById("nota");
let imagem = document.getElementById("imagem");

// faz uma resquisicao do tipo [GET] para o back que recebe todas as vagas cadastradas
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

// [POST] envia uma vaga para o backend para ser cadastrada

const submitForm = async (event) => {
  // previnir que o navegador atualiza a pagina por causa o evento de submit
  event.preventDefault();

  // Estamos construindo um objeto com os valores que estamos pegando no input.
  const filme = {
    nome: nome.value,
    genero: genero.value,
    nota: parseFloat(nota.value),
    imagem: imagem.value,
  };
  // é o objeto preenchido com os valores digitados no input

  if (edicao) {
    putFilme(filme, idEdicao);
  } else {
    createFilme(filme);
  }

  clearFields();
  lista.innerHTML = "";
};

const createFilme = async (filme) => {
  // estou construindo a requisicao para ser enviada para o backend.
  const request = new Request(`${apiUrl}/add`, {
    method: "POST",
    body: JSON.stringify(filme),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });

  // chamamos a funcao fetch de acordo com as nossa configuracaoes de requisicao.
  const response = await fetch(request);

  const result = await response.json();
  // pego o objeto que vem do backend e exibo a msg de sucesso em um alerta.
  alert(result.message);
  // vaga cadastrada com sucesso.
  getFilmes();
};

const putFilme = async (filme, id) => {
  // estou construindo a requisicao para ser enviada para o backend.
  const request = new Request(`${apiUrl}/edit/${id}`, {
    method: "PUT",
    body: JSON.stringify(filme),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });

  // chamamos a funcao fetch de acordo com as nossa configuracaoes de requisicao.
  const response = await fetch(request);

  const result = await response.json();
  // pego o objeto que vem do backend e exibo a msg de sucesso em um alerta.
  alert(result.message);
  edicao = false;
  idEdicao = 0;
  getVagas();
};

// [DELETE] funcao que exclui um vaga de acordo com o seu id
const deleteFilme = async (id) => {
  // construir a requiscao de delete
  const request = new Request(`${apiUrl}/delete/${id}`, {
    method: "DELETE",
  });

  const response = await fetch(request);
  const result = await response.json();

  alert(result.message);

  lista.innerHTML = "";
  geFilmes();
};

// [GET] /Vaga/{id} - funcao onde recebe um id via paramtero envia uma requisicao para o backend
// e retorna a vaga de acordo com esse id.
const getFilmeById = async (id) => {
  const response = await fetch(`${apiUrl}/${id}`);
  return await response.json();
};

// ao clicar no botao editar
// ela vai preencher os campos dos inputs
// para montar o objeto para ser editado
const editFilme = async (id) => {
  // habilitando o modo de edicao e enviando o id para variavel global de edicao.
  edicao = true;
  idEdicao = id;

  //precismo buscar a informacao da vaga por id para popular os campos
  // salva os dados da vaga que vamos editar na variavel vaga.
  const vaga = await getFilmeById(id);

  //preencher os campos de acordo com a vaga que vamos editar.
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
