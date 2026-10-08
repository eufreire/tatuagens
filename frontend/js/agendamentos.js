const API = 'http://127.0.0.1:8000'
const formAgendamento = document.getElementById('form-agendamento')
const botaoSubmit = document.getElementById('btn-submit-agendamento')
const blocoStatus = document.getElementById('bloco-status')

function limparFormulario() {
  formAgendamento.reset()
  delete formAgendamento.dataset.idAgendamento
  botaoSubmit.textContent = 'Cadastrar'
  botaoSubmit.classList.remove('btn-success')
  botaoSubmit.classList.add('btn-primary')
  blocoStatus.style.display = 'none' 
}

async function carregarClientes() {
  const resposta = await fetch(`${API}/clientes`)
  const clientes = await resposta.json()
  const select = document.getElementById('idcliente')
  clientes.forEach(c => select.innerHTML += `<option value="${c.idcliente}">${c.nome}</option>`)
}

async function carregarTatuadores() {
  const resposta = await fetch(`${API}/tatuadores`)
  const tatuadores = await resposta.json()
  const select = document.getElementById('idtatuador')
  tatuadores.forEach(t => select.innerHTML += `<option value="${t.idtatuador}">${t.nometatuador}</option>`)
}

carregarClientes()
carregarTatuadores()

async function listarAgendamentos() {
  const resposta = await fetch(`${API}/agendamentos`)
  const agendamentos = await resposta.json()
  const corpo = document.getElementById('corpo-tabela')
  corpo.innerHTML = ''
  agendamentos.forEach(a => {
    corpo.innerHTML += `
      <tr>
        <td>${a.idagendamento}</td><td>${a.cliente}</td><td>${a.tatuador}</td>
        <td>${a.dataagendamento}</td><td>${a.horaagendamento}</td><td>${a.valortatuagem ?? '-'}</td><td>${a.status}</td>
        <td>
          <button class="btn btn-sm btn-warning me-2" onclick='preencherFormularioEdicao(${JSON.stringify(a)})'>Editar</button>
          <button class="btn btn-sm btn-danger" onclick="deletarAgendamento(${a.idagendamento})">Excluir</button>
        </td>
      </tr>`
  })
}

listarAgendamentos()

formAgendamento.addEventListener('submit', async (e) => {
  e.preventDefault()
  const agendamento = {
    idcliente: Number(document.getElementById('idcliente').value),
    idtatuador: Number(document.getElementById('idtatuador').value),
    dataagendamento: document.getElementById('dataagendamento').value,
    horaagendamento: document.getElementById('horaagendamento').value,
    descricaotatuagem: document.getElementById('descricaotatuagem').value || null,
    valortatuagem: document.getElementById('valortatuagem').value ? Number(document.getElementById('valortatuagem').value) : null,
    status: document.getElementById('status').value
  }

  const id = formAgendamento.dataset.idAgendamento
  if (id) {
    await fetch(`${API}/agendamentos/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(agendamento) })
  } else {
    await fetch(`${API}/agendamentos`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(agendamento) })
  }
  limparFormulario()
  listarAgendamentos()
})

function preencherFormularioEdicao(a) {
  document.getElementById('idcliente').value = a.idcliente
  document.getElementById('idtatuador').value = a.idtatuador
  document.getElementById('dataagendamento').value = a.dataagendamento
  document.getElementById('horaagendamento').value = a.horaagendamento
  document.getElementById('descricaotatuagem').value = a.descricaotatuagem || ''
  document.getElementById('valortatuagem').value = a.valortatuagem || ''
  document.getElementById('status').value = a.status
  
  blocoStatus.style.display = 'block'
  formAgendamento.dataset.idAgendamento = a.idagendamento
  botaoSubmit.textContent = 'Salvar alteração'
  botaoSubmit.classList.remove('btn-primary')
  botaoSubmit.classList.add('btn-success')
}

async function deletarAgendamento(id) {
  if (!confirm('Excluir este agendamento?')) return
  await fetch(`${API}/agendamentos/${id}`, { method: 'DELETE' })
  listarAgendamentos()
}