const API = 'http://127.0.0.1:8000'
const formSenioridade = document.getElementById('form-senioridade')
const botaoSubmit = document.getElementById('btn-submit-senioridade')

function limparFormulario() {
  formSenioridade.reset()
  delete formSenioridade.dataset.idSenioridade
  botaoSubmit.textContent = 'Cadastrar'
  botaoSubmit.className = 'btn btn-primary w-100'
}

async function listarSenioridades() {
  const resposta = await fetch(`${API}/senioridade`)
  const senioridades = await resposta.json()
  const corpo = document.getElementById('corpo-tabela')
  corpo.innerHTML = ''
  senioridades.forEach(s => {
    corpo.innerHTML += `
      <tr>
        <td>${s.idsenioridade}</td><td>${s.nome}</td>
        <td>
          <button class="btn btn-sm btn-warning me-2" onclick='preencherFormularioEdicao(${JSON.stringify(s)})'>Editar</button>
          <button class="btn btn-sm btn-danger" onclick="deletarSenioridade(${s.idsenioridade})">Excluir</button>
        </td>
      </tr>`
  })
}

listarSenioridades()

formSenioridade.addEventListener('submit', async (e) => {
  e.preventDefault()
  const senioridade = { nome: document.getElementById('nome').value }
  const id = formSenioridade.dataset.idSenioridade

  if (id) {
    await fetch(`${API}/senioridade/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(senioridade) })
  } else {
    await fetch(`${API}/senioridade`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(senioridade) })
  }
  limparFormulario()
  listarSenioridades()
})

function preencherFormularioEdicao(s) {
  document.getElementById('nome').value = s.nome
  formSenioridade.dataset.idSenioridade = s.idsenioridade
  botaoSubmit.textContent = 'Salvar'
  botaoSubmit.className = 'btn btn-success w-100'
}

async function deletarSenioridade(id) {
  if (!confirm('Excluir?')) return
  await fetch(`${API}/senioridade/${id}`, { method: 'DELETE' })
  listarSenioridades()
}