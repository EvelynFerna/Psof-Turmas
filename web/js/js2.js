function Voltar() {
  window.location.href = "professor.html";
}

let tarefas = [];
let turmas = [];
const modal = document.getElementById("modal");
const openModalButton = document.getElementById("openModalButton");
const closeModalButton = document.getElementById("closeModalButton");

openModalButton.onclick = () => modal.style.display = "block";
closeModalButton.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target == modal) modal.style.display = "none"; };

async function carregarTurmas() {
  try {
    const res = await fetch('http://localhost:3000/turma');
    turmas = await res.json();
    const select = document.getElementById('turmaSelect');
    select.innerHTML = '<option value="">Selecione uma turma</option>';
    turmas.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t.id;
      opt.textContent = `${t.numero} - ${t.nome}`;
      select.appendChild(opt);
    });
  } catch (error) {
    alert('Erro ao carregar turmas');
  }
}

async function carregarTarefas() {
  try {
    const response = await fetch(`http://localhost:3000/tarefa`);
    if (response.ok) {
      tarefas = await response.json();
      renderTarefas();
    } else {
      alert('Erro ao carregar tarefas');
    }
  } catch (error) {
    alert('Erro ao carregar tarefas');
  }
}

function renderTarefas() {
  const tabela = document.getElementById('tarefaTable');
  tabela.innerHTML = '';
  tarefas.forEach(t => {
    const turma = t.Turma ? t.Turma.nome : '—';
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${t.id}</td>
      <td>${t.numero}</td>
      <td>${t.nome}</td>
      <td>${turma}</td>
      <td class="actions">
        <button onclick="excluirTarefa(${t.id})">Excluir</button>
      </td>
    `;
    tabela.appendChild(row);
  });
}

async function excluirTarefa(id) {
  if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
    try {
      const response = await fetch(`http://localhost:3000/tarefa/${id}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Tarefa excluída com sucesso!');
        carregarTarefas();
      } else {
        alert('Erro ao excluir tarefa');
      }
    } catch (error) {
      alert('Erro ao excluir tarefa');
    }
  }
}

document.getElementById('saveTarefaButton').onclick = async function () {
  const numeroTarefa = document.getElementById('numeroTarefa').value;
  const nomeTarefa = document.getElementById('nomeTarefa').value;
  const turmaId = document.getElementById('turmaSelect').value;

  if (!numeroTarefa || !nomeTarefa || !turmaId) {
    alert("Preencha todos os campos!");
    return;
  }

  const novaTarefa = {
    numero: numeroTarefa,
    nome: nomeTarefa,
    turmaId: parseInt(turmaId)
  };

  try {
    const response = await fetch('http://localhost:3000/tarefa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaTarefa),
    });

    if (response.ok) {
      alert('Tarefa cadastrada com sucesso!');
      modal.style.display = 'none';
      carregarTarefas();
    } else {
      alert('Erro ao cadastrar tarefa');
    }
  } catch (error) {
    alert('Erro ao salvar tarefa');
  }
};

carregarTurmas();
carregarTarefas();
