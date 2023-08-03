// Selectors
const menuButton = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.menu-nav');
const menuBranding = document.querySelector('.menu-branding');
const navItems = document.querySelectorAll('.nav-item');
const themeButton = document.querySelector('.toggle-theme');
const html = document.querySelector('html');

// Set initial state of menu and theme
let showMenu = false;
let darkTheme = (JSON.parse(localStorage.getItem('darkTheme') !== null)) 
    ? JSON.parse(localStorage.getItem('darkTheme'))  
    : true ;

// on page load, apply selected theme
if(themeButton) {
    initTheme();
};

//event listeners
menuButton.addEventListener('click',toggleMenu);
themeButton.addEventListener('click',switchTheme);

function initTheme() {
    //console.log(localStorage.getItem('darkTheme'));
    let lightThemeSelected = (localStorage.getItem('darkTheme') !== null 
    && JSON.parse(localStorage.getItem('darkTheme')) === false);
    //console.log(darkThemeSelected);
    if(lightThemeSelected) {
        html.classList.add('light'); 
        themeButton.classList.remove('fa-sun');
        themeButton.classList.add('fa-moon');
    } 
}

function toggleMenu() {
    // menu is not shown
    if(!showMenu) {
        menuButton.classList.add('close');
        menu.classList.add('show');
        menuNav.classList.add('show');
        menuBranding.classList.add('show');
        navItems.forEach(item => item.classList.add('show'));

        // set menu state
        showMenu = true;
    // menu is shown    
    } else {
        menuButton.classList.remove('close');
        menu.classList.remove('show');
        menuNav.classList.remove('show');
        menuBranding.classList.remove('show');
        navItems.forEach(item => item.classList.remove('show'));

        // set menu state
        showMenu = false;
 
    }
}

function switchTheme() {
    if(darkTheme) {
        html.classList.add('light'); 
        
        themeButton.classList.remove('fa-sun');
        themeButton.classList.add('fa-moon');
        darkTheme = false;
        localStorage.setItem('darkTheme', false );
    } else {
        html.classList.remove('light');
        
        themeButton.classList.remove('fa-moon');
        themeButton.classList.add('fa-sun');
        darkTheme = true;
        localStorage.setItem('darkTheme', true );
    }

}
