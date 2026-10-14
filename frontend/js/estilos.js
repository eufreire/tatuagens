const API = 'http://127.0.0.1:8000'
protegerPagina()

async function carregarEstilos() {
  const resposta = await fetchAutenticado(`${API}/estilos`)
  const lista = await resposta.json()
  
  const tabela = document.getElementById('tabela-estilos')
  tabela.innerHTML = ''

  lista.forEach(e => {
    tabela.innerHTML += `
      <tr>
        <td>${e.id}</td>
        <td>${e.nome}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="deletarEstilo(${e.id})">Excluir</button>
        </td>
      </tr>
    `
  })
}

document.getElementById('form-estilo').addEventListener('submit', async (event) => {
  event.preventDefault()

  const dados = {
    nome: document.getElementById('nome').value
  }

  await fetchAutenticado(`${API}/estilos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })

  document.getElementById('form-estilo').reset()
  carregarEstilos()
})

async function deletarEstilo(id) {
  await fetchAutenticado(`${API}/estilos/${id}`, {
    method: 'DELETE'
  })
  carregarEstilos()
}

carregarEstilos()