const setActiveNavMenu = () => {
    let mainNavLinks = document.querySelectorAll('.menu__link');
    let fromTop = window.scrollY;
    let footer_nav = document.getElementById('footer_nav');
    if ((window.innerHeight + window.pageYOffset + 10) >= document.body.offsetHeight) {
        mainNavLinks.forEach(link => { link.classList.remove("active-class"); });
        footer_nav.classList.add("active-class");
    } else {
        mainNavLinks.forEach(link => {
            let section = document.querySelector(link.hash);
            if (
                section.offsetTop <= fromTop + 60 &&
                section.offsetTop + section.offsetHeight > fromTop + 60
            ) {
                link.classList.add("active-class");
            } else {
                link.classList.remove("active-class");
            }
        });
    }
};

export const init = () => {
    setActiveNavMenu();
    document.addEventListener('scroll', setActiveNavMenu);
};
