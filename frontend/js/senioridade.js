const API = 'http://127.0.0.1:8000'
protegerPagina()

async function carregarSenioridade() {
  const resposta = await fetchAutenticado(`${API}/senioridade`)
  const lista = await resposta.json()
  
  const tabela = document.getElementById('tabela-senioridade')
  tabela.innerHTML = ''

  lista.forEach(s => {
    tabela.innerHTML += `
      <tr>
        <td>${s.id}</td>
        <td>${s.nivel}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="deletarSenioridade(${s.id})">Excluir</button>
        </td>
      </tr>
    `
  })
}

document.getElementById('form-senioridade').addEventListener('submit', async (e) => {
  e.preventDefault()

  const dados = {
    nivel: document.getElementById('nivel').value
  }

  await fetchAutenticado(`${API}/senioridade`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })

  document.getElementById('form-senioridade').reset()
  carregarSenioridade()
})

async function deletarSenioridade(id) {
  await fetchAutenticado(`${API}/senioridade/${id}`, {
    method: 'DELETE'
  })
  carregarSenioridade()
}

carregarSenioridade()