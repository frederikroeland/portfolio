/**
 * Selectors for UI elements
 */
const menuButton = document.querySelector('.menu-btn')
const menu = document.querySelector('.menu')
const menuNav = document.querySelector('.menu-nav')
const menuBranding = document.querySelector('.menu-branding')
const navItems = document.querySelectorAll('.nav-item')
const themeButton = document.querySelector('.toggle-theme')
const html = document.querySelector('html')
const colorThemes = document.querySelectorAll('[name="theme"]')

/**
 * Initial state for menu and theme
 */
let showMenu = false
let darkTheme = (JSON.parse(localStorage.getItem('darkTheme') !== null)) 
    ? JSON.parse(localStorage.getItem('darkTheme'))  
    : true 

/**
 * Event listeners for UI interaction
 */
menuButton.addEventListener('click', toggleMenu)
themeButton.addEventListener('click', switchTheme)

colorThemes.forEach((themeOption) => {
    themeOption.addEventListener("click", () => {
        storeTheme(themeOption.id)
        let darkTheme = JSON.parse(localStorage.getItem('darkTheme'))
        let fullTheme = themeOption.id
        if (!darkTheme) {
            fullTheme = fullTheme + " light" 
        }
        console.log(fullTheme)
        document.documentElement.className = fullTheme
    })
})

/**
 * Initializes the theme based on saved preferences in localStorage
 */
function initDarkTheme() {
    let lightThemeSelected = (localStorage.getItem('darkTheme') !== null 
    && JSON.parse(localStorage.getItem('darkTheme')) === false)

    if (lightThemeSelected) {
        html.classList.add('light') 
        themeButton.classList.remove('fa-sun')
        themeButton.classList.add('fa-moon')
    } 
}

/**
 * Toggles the visibility of the navigation menu
 */
function toggleMenu() {
    if (!showMenu) {
        menuButton.classList.add('close')
        menu.classList.add('show')
        menuNav.classList.add('show')
        menuBranding.classList.add('show')
        navItems.forEach(item => item.classList.add('show'))
        showMenu = true
    } else {
        menuButton.classList.remove('close')
        menu.classList.remove('show')
        menuNav.classList.remove('show')
        menuBranding.classList.remove('show')
        navItems.forEach(item => item.classList.remove('show'))
        showMenu = false
    }
}

/**
 * Switches between dark and light themes
 */
function switchTheme() {
    if (darkTheme) {
        html.classList.add('light') 
        themeButton.classList.remove('fa-sun')
        themeButton.classList.add('fa-moon')
        darkTheme = false
        localStorage.setItem('darkTheme', false )
    } else {
        html.classList.remove('light')
        themeButton.classList.remove('fa-moon')
        themeButton.classList.add('fa-sun')
        darkTheme = true
        localStorage.setItem('darkTheme', true )
    }
}

/**
 * Stores the selected color theme in localStorage
 * @param {string} theme - The ID of the selected theme
 */
const storeTheme = function (theme) {
    localStorage.setItem("secondaryTheme", theme)
}

/**
 * Sets the active themes when the page loads
 */
const setThemes = function () {
    const activeTheme = localStorage.getItem("secondaryTheme")
    colorThemes.forEach((themeOption) => {
        if (themeOption.id === activeTheme) {
            themeOption.checked = true
        }
    })

    document.documentElement.className = activeTheme
    initDarkTheme()
}

/**
 * Set themes on window load
 */
window.onload = setThemes
