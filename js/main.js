document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('body-content');
  const sidenav = document.querySelector('.sidenav');

  // Load page
  let page = window.location.hash.substring(1);
  if (page == '') page = 'allPlanets';
  loadPage(page);

  // Nav
  M.Sidenav.init(sidenav);
  loadNav();

  async function loadPage(page) {
    try {
      const response = await fetch(`pages/${page}.html`);
      if(response.status === 200) {
        const responseText = await response.text();
        content.innerHTML = responseText;
      } else if(response.status === 404) {
        content.innerHTML = '<p>Halaman tidak ditemukan.</p>';
      } else {
        content.innerHTML = '<p>halaman tidak dapat diakses.</p>';     
      }
    } catch (error) {
      console.log(error);
    };

    selectPlanet();
  };

  async function loadNav() {
    try {
      const nav = document.querySelectorAll('.topnav, .sidenav');
      const response = await fetch('nav.html');
      const responseText = await response.text();

      if(response.status !== 200) return;

      nav.forEach(element => {
        element.innerHTML = responseText;
      });

      selectNavLink();

    } catch(error) {
      console.log(error);
    };
  };

  function selectNavLink() {
    const navLinks = document.querySelectorAll('.sidenav a, .topnav a');
    
    navLinks.forEach(element => {
      element.addEventListener('click', () => {
        M.Sidenav.getInstance(sidenav).close();

        page = element.getAttribute('href').substring(1);
        loadPage(page);
      });
    });
  };

  function selectPlanet() {
    const planets = document.querySelectorAll('.planet');

    planets.forEach(planet => {
      planet.addEventListener('click', () => {
        page = planet.getAttribute('href').substring(1);
        loadPage(page);
      });
    });
  };

});