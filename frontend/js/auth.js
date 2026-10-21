const usuarioLogado = localStorage.getItem('usuarioLogado');
const paginaAtual = window.location.pathname;

// Se não estiver logado e tentar acessar páginas protegidas, redireciona para o login
if (!usuarioLogado && !paginaAtual.includes('login.html') && !paginaAtual.includes('cadastro.html') && !paginaAtual.includes('index.html')) {
  window.location.href = 'login.html';
}

function fazerLogout() {
  localStorage.removeItem('usuarioLogado');
  window.location.href = 'login.html';
}