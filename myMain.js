import sublinks from './data.js';

'use strict';
const toggleBtn = document.querySelector('.toggle-btn');
const closeBtn = document.querySelector('.close-btn');
const sidebarWrapper = document.querySelector('.sidebar-wrapper');
const sidebar = document.querySelector('.sidebar-links');
// array de buttons avec spread operation
const linkBtns = [...document.querySelectorAll('.link-btn')];
const submenu = document.querySelector('.submenu');
const page = document.querySelector('.page');
const nav = document.querySelector('.nav');

//afficher/cacher sidebar
toggleBtn.addEventListener('click', () => {
    sidebarWrapper.classList.add('show');
});
closeBtn.addEventListener('click', () => {
    sidebarWrapper.classList.remove('show');
});
sidebar.innerHTML = sublinks.map((item) => {
    const {links,page} = item;
    return `
    <article>
        <h4>${page}</h4>
        <div class="sidebar-sublinks">
          ${links.map((link) => {
            return `
            <button style=" max-width: 100%; font-size: 1rem;
            padding: 0.1rem 0.25rem;
            border-radius: var(--radius);
            border-color: transparent;
            color: white;
            background: var(--clr-black);
            cursor: pointer;
            transition: var(--transition);
            margin-right: 7rem;" onclick="window.location.href='${link.url}'" >
            <i class="${link.icon}"></i>   ${link.label}
            </button>
            `
          }).join('')}  
        </div>
    </article>
    <hr>
    `
}).join('');

// quand je flotte sur chaque btn de l'array je veux faire une action 
// avec .addEventListener(), on a utiliser l'ancien syntaxe de la fonction car on a besoin de : 
//l'accés à l'objet d'événement  (propriétés qui décrivent l'événement qui s'est produit)
// et pointer sur un btn spécifique
linkBtns.forEach((btn) => {
  btn.addEventListener('mouseover', function (e) {
    const text = e.currentTarget.textContent;
        // pour avoir les coins autour des boutons pour afficher le submenu, dans notre cas on a besoin de savoir le centre et le bottom des btns
    const tempBtn = e.currentTarget.getBoundingClientRect();
    // centre de btn
    const centre = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom - 3;
    const tempPage = sublinks.find((link) => link.page === text);
    if (tempPage){
      const {page,links} = tempPage;
      submenu.classList.add('show');
      submenu.style.left = `${centre}px`;
      submenu.style.top = `${bottom}px`;
      submenu.innerHTML = `
      <section>
      <h4>${page}</h4>
        <div class="submenu-center col-${links.length}">
          ${links.map((link) => {
            return `
            <a href="${link.url}"><i class="${link.icon}"></i>   ${link.label}</a>
            `
          }).join('')}  
        </div>
      </section>
      `
    }
});
});
//quand je met le curseur en dehors des linkBtns ou submenu le submenu se cahche
page.addEventListener('mouseover', function(event){
 submenu.classList.remove('show');
});
nav.addEventListener('mouseover', function(event){
//si autre chose que linBtns
  if(!event.target.classList.contains('link-btn')){
    submenu.classList.remove('show');
  }
 });


