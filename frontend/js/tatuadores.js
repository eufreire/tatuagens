const API = 'http://127.0.0.1:8000'
protegerPagina()

async function carregarTatuadores() {
  const resposta = await fetchAutenticado(`${API}/tatuadores`)
  const tatuadores = await resposta.json()
  
  const tabela = document.getElementById('tabela-tatuadores')
  tabela.innerHTML = ''

  tatuadores.forEach(t => {
    tabela.innerHTML += `
      <tr>
        <td>${t.id}</td>
        <td>${t.nome}</td>
        <td>${t.especialidade}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="deletarTatuador(${t.id})">Excluir</button>
        </td>
      </tr>
    `
  })
}

document.getElementById('form-tatuador').addEventListener('submit', async (e) => {
  e.preventDefault()

  const dados = {
    nome: document.getElementById('nome').value,
    especialidade: document.getElementById('especialidade').value
  }

  await fetchAutenticado(`${API}/tatuadores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })

  document.getElementById('form-tatuador').reset()
  carregarTatuadores()
})

async function deletarTatuador(id) {
  await fetchAutenticado(`${API}/tatuadores/${id}`, {
    method: 'DELETE'
  })
  carregarTatuadores()
}

carregarTatuadores()