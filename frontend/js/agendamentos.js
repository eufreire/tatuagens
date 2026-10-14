const API = 'http://127.0.0.1:8000'
protegerPagina()

async function carregarAgendamentos() {
  const resposta = await fetchAutenticado(`${API}/agendamentos`)
  const agendamentos = await resposta.json()
  
  const tabela = document.getElementById('tabela-agendamentos')
  tabela.innerHTML = ''

  agendamentos.forEach(a => {
    tabela.innerHTML += `
      <tr>
        <td>${a.id}</td>
        <td>${a.cliente_id}</td>
        <td>${a.tatuador_id}</td>
        <td>${a.data_hora}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="deletarAgendamento(${a.id})">Excluir</button>
        </td>
      </tr>
    `
  })
}

document.getElementById('form-agendamento').addEventListener('submit', async (e) => {
  e.preventDefault()

  const dados = {
    cliente_id: parseInt(document.getElementById('cliente_id').value),
    tatuador_id: parseInt(document.getElementById('tatuador_id').value),
    data_hora: document.getElementById('data_hora').value
  }

  await fetchAutenticado(`${API}/agendamentos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })

  document.getElementById('form-agendamento').reset()
  carregarAgendamentos()
})

async function deletarAgendamento(id) {
  await fetchAutenticado(`${API}/agendamentos/${id}`, {
    method: 'DELETE'
  })
  carregarAgendamentos()
}

carregarAgendamentos()