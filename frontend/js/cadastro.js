const formCadastro = document.getElementById('form-cadastro');

formCadastro.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  if (usuarios.some(u => u.email === email)) {
    alert('Este e-mail já está cadastrado!');
    return;
  }

  usuarios.push({ nome, email, senha });
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  alert('Cadastro realizado com sucesso! Faça login.');
  window.location.href = 'login.html';
});