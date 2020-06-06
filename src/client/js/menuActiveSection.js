const setActiveNavMenu = () => {
    let mainNavLinks = document.querySelectorAll('.menu__link');
    let fromTop = window.scrollY;
    let footer_nav = document.getElementById('footer_nav');
    if ((window.innerHeight + window.pageYOffset + 10) >= document.body.offsetHeight) {
        mainNavLinks.forEach(link => { link.classList.remove("active-class"); });
        footer_nav.classList.add("active-class");
    } else if (window.scrollY <= window.innerHeight / 2) {
        mainNavLinks.forEach(link => { link.classList.remove("active-class"); });
        document.getElementById('main_nav').classList.add("active-class");
    } else {
        mainNavLinks.forEach(link => {
            mainNavLinks.forEach(link => { link.classList.remove("active-class"); });
            document.getElementById('trip_nav').classList.add("active-class");
        });
    }
};

export const init = () => {
    setActiveNavMenu();
    document.addEventListener('scroll', setActiveNavMenu);
};
