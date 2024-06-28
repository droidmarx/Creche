
  const clearStorageBtn = document.querySelector("#clear-storage-btn");

clearStorageBtn.addEventListener("click", () => {
  localStorage.clear();
  alert("Dados do Local Storage foram removidos com sucesso!");
});

  
  
  
  
 if  (sessionStorage.getItem("token") == null) { 
   alert("Você precisa estar logado para acessar essa página"); 
   window.location.href = "./index.html"; 
 } 
  
 function handleLogout() { 
   sessionStorage.removeItem("token"); 
   setTimeout(() => { 
     window.location.href = "index.html"; 
   }, 200); 
 }
  
  
    // Obtém uma referência para o botão
var btnSair = document.getElementById('clear-storage-btn');


// Adiciona um evento de clique ao botão
btnSair.addEventListener('click', function() {
  // Redireciona para a página index.html
  window.location.href = 'index.html';
});


// Array para armazenar os alunos cadastrados
let alunos = [];

// Função para cadastrar um novo aluno
function cadastrarAluno() {
  const nome = document.getElementById("nome").value;
  const dataPagamentoValue = document.getElementById("data-pagamento").value;

  if (!nome || !dataPagamentoValue) {
    alert("Você não preencheu todos os requisitos.");
    return;
  }

  const dataPagamento = new Date(dataPagamentoValue);

  if (isNaN(dataPagamento)) {
    alert("A data de pagamento é inválida.");
    return;
  }

  const mensalidadeSim = document.getElementById("mensalidadeSim");
  const mensalidadeNao = document.getElementById("mensalidadeNao");

  let mensalidadePaga;

  if (mensalidadeSim.checked) {
    mensalidadePaga = true;
    mensalidadeNao.checked = false; // Desmarca o checkbox "Não"
  } else if (mensalidadeNao.checked) {
    mensalidadePaga = false;
    mensalidadeSim.checked = false; // Desmarca o checkbox "Sim"
  }

  // Cria um objeto aluno com as informações
  const aluno = {
    nome: nome,
    dataPagamento: dataPagamento.toLocaleDateString('pt-BR'),
    mensalidadePaga: mensalidadePaga
  };

  // Adiciona o aluno ao array de alunos
  alunos.push(aluno);

  // Limpa os campos do formulário
  document.getElementById("nome").value = "";
  document.getElementById("data-pagamento").value = "";
  mensalidadeSim.checked = false;
  mensalidadeNao.checked = false;

  // Atualiza a tabela de alunos cadastrados
  exibirAlunos();

  // Salva os dados no localStorage
  salvarAlunosNoLocalStorage();
}

// Função para exibir os alunos cadastrados na tabela
function exibirAlunos() {
  const tabela = document.getElementById("alunos-lista");
  tabela.innerHTML = "";

  for (let i = 0; i < alunos.length; i++) {
    const aluno = alunos[i];

    const row = tabela.insertRow();
    const checkboxCell = row.insertCell(0);
    const nomeCell = row.insertCell(1);
    const dataPagamentoCell = row.insertCell(2);
    const mensalidadeCell = row.insertCell(3);
    const excluirCell = row.insertCell(4);

    checkboxCell.innerHTML = '<input type="checkbox" class="selecionar-aluno">';
    nomeCell.innerHTML = aluno.nome;
    dataPagamentoCell.innerHTML = aluno.dataPagamento;
    mensalidadeCell.innerHTML = aluno.mensalidadePaga ? "Sim" : "Não";
  }
}

// Função para excluir os alunos selecionados
function excluirAlunosSelecionados() {
  const checkboxes = document.getElementsByClassName("selecionar-aluno");
  const indicesExcluir = [];

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      indicesExcluir.push(i);
    }
  }

  if (indicesExcluir.length === 0) {
    alert("Nenhum aluno selecionado para exclusão.");
    return;
  }

  const confirmacao = confirm("Tem certeza que deseja excluir os alunos selecionados?");
  if (confirmacao) {
    // Remove os alunos do array pelos índices em ordem decrescente
    for (let i = indicesExcluir.length - 1; i >= 0; i--) {
      const index = indicesExcluir[i];
      alunos.splice(index, 1);
    }

    exibirAlunos(); // Atualiza a tabela de alunos cadastrados

    // Salva os dados no localStorage
    salvarAlunosNoLocalStorage();
  }
}

function buscarAluno() {
  const nome = document.getElementById("nome").value;

  if (!nome) {
    alert("Por favor, insira o nome do aluno para buscar.");
    return;
  }

  const alunosEncontrados = alunos.filter(function(aluno) {
    return aluno.nome === nome;
  });

  if (alunosEncontrados.length > 0) {
    // Limpa os campos do formulário
    document.getElementById("nome").value = "";

    // Marca os checkboxes dos alunos encontrados
    const checkboxes = document.getElementsByClassName("selecionar-aluno");
    for (let i = 0; i < checkboxes.length; i++) {
      const checkbox = checkboxes[i];
      const row = checkbox.parentNode.parentNode;
      const nomeCell = row.cells[1];
      if (alunosEncontrados.some(function(a) { return a.nome === nomeCell.innerHTML })) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
    }

    // Centraliza a tabela no viewport
    const tabela = document.getElementById("tabela");
    tabela.scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    alert("Nenhum aluno encontrado com esse nome.");
  }
}






// Função para salvar os dados no localStorage
function salvarAlunosNoLocalStorage() {
  localStorage.setItem("alunos", JSON.stringify(alunos));
}

    // Função para atualizar o checkbox "Sim" e "Não" de acordo com o selecionado 
     function atualizarCheckbox(id) { 
       const checkboxSim = document.getElementById("mensalidadeSim"); 
       const checkboxNao = document.getElementById("mensalidadeNao"); 
  
       if (id === "mensalidadeSim") { 
         checkboxNao.checked = false; // Desmarca o checkbox "Não" 
       } else if (id === "mensalidadeNao") { 
         checkboxSim.checked = false; // Desmarca o checkbox "Sim" 
       } 
     }

// Função para carregar os dados do localStorage
function carregarAlunosDoLocalStorage() {
  const alunosString = localStorage.getItem("alunos");
  if (alunosString) {
    alunos = JSON.parse(alunosString);
    exibirAlunos();
  }
}

// Função para exibir os alunos cadastrados em um modal
function exibirAlunosModal() {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const tabela = document.createElement("table");
  tabela.id = "alunos-lista-modal";

  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const thNome = document.createElement("th");
  thNome.textContent = "Nome";
  const thDataPagamento = document.createElement("th");
  thDataPagamento.textContent = "Data do Pagamento";
  const thMensalidade = document.createElement("th");
  thMensalidade.textContent = "Pagamento";

  tr.appendChild(thNome);
  tr.appendChild(thDataPagamento);
  tr.appendChild(thMensalidade);
  thead.appendChild(tr);

  const tbody = document.createElement("tbody");

  for (let i = 0; i < alunos.length; i++) {
    const aluno = alunos[i];

    const row = document.createElement("tr");
    const nomeCell = document.createElement("td");
    nomeCell.textContent = aluno.nome;
    const dataPagamentoCell = document.createElement("td");
    dataPagamentoCell.textContent = aluno.dataPagamento;
    const mensalidadeCell = document.createElement("td");
    mensalidadeCell.textContent = aluno.mensalidadePaga ? "Sim" : "Não";

    row.appendChild(nomeCell);
    row.appendChild(dataPagamentoCell);
    row.appendChild(mensalidadeCell);

    tbody.appendChild(row);
  }

  tabela.appendChild(thead);
  tabela.appendChild(tbody);
  modalContent.appendChild(tabela);
  modal.appendChild(modalContent);

  document.body.appendChild(modal);

  // Aplica o efeito de blur ao restante da página
  const mainContent = document            .querySelector("body > *:not(.modal)");
  //mainContent.style.filter = "blur(5px)";

  // Adiciona evento de clique para fechar o modal
  modal.addEventListener("click", function(event) {
    if (event.target === modal) {
      document.body.removeChild(modal);
      mainContent.style.filter = "none";
    }
  });
}



// Carrega os dados do localStorage ao carregar a página
carregarAlunosDoLocalStorage();

