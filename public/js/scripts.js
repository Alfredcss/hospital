const header = document.querySelector("header");
const footer = document.querySelector("footer");

header.innerHTML = `
<style>

  
  /* Estilos para el botón de cerrar sesión */
  #logoutButton {
    background-color: red;
    border: none;
    cursor: pointer;
    outline: none;
    font-size: 14px;
    padding: 5px 10px;
    border-radius: 5px;
    position: fixed; 
    top:0;
    
  }

  /* Estilos para los enlaces del menú de navegación */
  #nav a {
    margin: 0 10px;
    text-decoration: none;
    color: #333;
    position: relative;
    transition: color 0.3s ease;
    font-family: 'Roboto', sans-serif;

  }

  /* Animación al pasar el cursor sobre los enlaces */
  #nav a::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #33CEFF;
    visibility: hidden;
    transform: scaleX(0);
    transition: all 0.3s ease-in-out;
  }

  #nav a:hover::before {
    visibility: visible;
    transform: scaleX(1);
  }

  
</style>

<div class="d-flex align-items-center justify-content-between"> <!-- Contenedor principal -->
  <div class="logo"> <!-- Logo -->
    <a href="home.html">
      <img src="/img/logo.png" alt="Centro Medico Coscami" width="150" height="40">
    </a>
  </div>
  <div id="nav"> <!-- Menú de navegación -->
    <a href="home.html">Home</a>
    <a href="verpacientes.html">Ver pacientes</a>
    <a href="agregarpaciente.html">Agregar Pacientes</a>
    <a  id="logoutButton">Cerrar Sesión</a>
    <button type="button"  id="logoutButton"> Cerrar Sesión
    </button>
  </div>
</div>
`;

footer.innerHTML = `
<footer class="footer mt-auto py-3 bg-light">
<div class="container">
    <span class="text-muted">Centro Medico Coscami © 2024</span>
</div>
</footer>

`;
