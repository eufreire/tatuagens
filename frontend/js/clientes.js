const API = 'http://127.0.0.1:8000'
protegerPagina()

async function carregarClientes() {
  const resposta = await fetchAutenticado(`${API}/clientes`)
  const clientes = await resposta.json()
  
  const tabela = document.getElementById('tabela-clientes')
  tabela.innerHTML = ''

  clientes.forEach(c => {
    tabela.innerHTML += `
      <tr>
        <td>${c.id}</td>
        <td>${c.nome}</td>
        <td>${c.email}</td>
        <td>${c.telefone}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="deletarCliente(${c.id})">Excluir</button>
        </td>
      </tr>
    `
  })
}

document.getElementById('form-cliente').addEventListener('submit', async (e) => {
  e.preventDefault()

  const dados = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    telefone: document.getElementById('telefone').value
  }

  await fetchAutenticado(`${API}/clientes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })

  document.getElementById('form-cliente').reset()
  carregarClientes()
})

async function deletarCliente(id) {
  await fetchAutenticado(`${API}/clientes/${id}`, {
    method: 'DELETE'
  })
  carregarClientes()
}

carregarClientes()