const formLogin = document.getElementById('form-login');

formLogin.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuarioEncontrado = usuarios.find(u => u.email === email && u.senha === senha);

  if ((email === 'admin@estudio.com' && senha === '123456') || usuarioEncontrado) {
    localStorage.setItem('usuarioLogado', email);
    alert('Login realizado com sucesso!');
    window.location.href = 'dashboard.html';
  } else {
    alert('E-mail ou senha incorretos!');
  }
});