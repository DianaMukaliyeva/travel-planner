const setActiveNavMenu = () => {
    let mainNavLinks = document.querySelectorAll('.menu__link');
    let fromTop = window.scrollY;
    let footer_nav = document.getElementById('footer_nav');
    mainNavLinks.forEach(link => { link.classList.remove("active-class"); });
    if ((window.innerHeight + window.pageYOffset + 10) >= document.body.offsetHeight) {
        footer_nav.classList.add("active-class");
    } else if (window.scrollY <= window.innerHeight / 2) {
        document.getElementById('main_nav').classList.add("active-class");
    } else {
        document.getElementById('trip_nav').classList.add("active-class");
    }
};

export const init = () => {
    setActiveNavMenu();
    document.addEventListener('scroll', setActiveNavMenu);
};
