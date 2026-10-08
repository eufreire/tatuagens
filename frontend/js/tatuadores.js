const API = 'http://127.0.0.1:8000'
const formTatuador = document.getElementById('form-tatuador')
const botaoSubmit = document.getElementById('btn-submit-tatuador')

function limparFormulario() {
  formTatuador.reset()
  delete formTatuador.dataset.idTatuador
  botaoSubmit.textContent = 'Cadastrar'
  botaoSubmit.className = 'btn btn-primary w-100'
}

async function carregarSenioridades() {
  const resposta = await fetch(`${API}/senioridade`)
  const senioridades = await resposta.json()
  const select = document.getElementById('idsenioridade')
  senioridades.forEach(s => {
    select.innerHTML += `<option value="${s.idsenioridade}">${s.nome}</option>`
  })
}

async function listarTatuadores() {
  const resposta = await fetch(`${API}/tatuadores`)
  const tatuadores = await resposta.json()
  const corpo = document.getElementById('corpo-tabela')
  corpo.innerHTML = ''
  tatuadores.forEach(t => {
    corpo.innerHTML += `
      <tr>
        <td>${t.idtatuador}</td><td>${t.nometatuador}</td><td>${t.cpf}</td><td>${t.senioridade}</td>
        <td>
          <button class="btn btn-sm btn-warning me-2" onclick='preencherFormularioEdicao(${JSON.stringify(t)})'>Editar</button>
          <button class="btn btn-sm btn-danger" onclick="deletarTatuador(${t.idtatuador})">Excluir</button>
        </td>
      </tr>`
  })
}

carregarSenioridades()
listarTatuadores()

formTatuador.addEventListener('submit', async (e) => {
  e.preventDefault()
  const tatuador = {
    nometatuador: document.getElementById('nometatuador').value,
    cpf: document.getElementById('cpf').value,
    email: document.getElementById('email').value || null,
    telefone: document.getElementById('telefone').value || null,
    datacontratacao: new Date().toISOString().split('T')[0],
    idsenioridade: Number(document.getElementById('idsenioridade').value)
  }
  const id = formTatuador.dataset.idTatuador

  if (id) {
    await fetch(`${API}/tatuadores/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(tatuador) })
  } else {
    await fetch(`${API}/tatuadores`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(tatuador) })
  }
  limparFormulario()
  listarTatuadores()
})

function preencherFormularioEdicao(t) {
  document.getElementById('nometatuador').value = t.nometatuador
  document.getElementById('cpf').value = t.cpf
  document.getElementById('email').value = t.email || ''
  document.getElementById('telefone').value = t.telefone || ''
  document.getElementById('idsenioridade').value = t.idsenioridade
  formTatuador.dataset.idTatuador = t.idtatuador
  botaoSubmit.textContent = 'Salvar'
  botaoSubmit.className = 'btn btn-success w-100'
}

async function deletarTatuador(id) {
  if (!confirm('Excluir?')) return
  await fetch(`${API}/tatuadores/${id}`, { method: 'DELETE' })
  listarTatuadores()
}