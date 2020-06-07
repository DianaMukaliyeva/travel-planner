import { toggleModal, saveOrDeleteTrip, fillModalWindow } from './modal';

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

const getAllTrips = async () => {
    const request = await fetch('http://localhost:5000/trips');
    const trips = await request.json();

    return trips;
};


const updateUI = (trips) => {
    console.log(trips);
    // trips.forEach(trip => {console.log(trip)});
};

export const deleteTrip = async (event) => {
    const id = event.target.name;
    console.log(id);
    const request = await fetch('http://localhost:5000/trips/' + id, {
        method: 'DELETE',
    });
};

const showTrip = () => {
    fillModalWindow(trip, )
}

export const init = async () => {
    const trips = await getAllTrips();
    updateUI(trips);

    setActiveNavMenu();
    document.addEventListener('scroll', setActiveNavMenu);

    document.querySelector(".close").addEventListener("click", toggleModal);
    document.getElementById('modal_button').addEventListener('click', saveOrDeleteTrip);
    document.getElementById('trip_delete').addEventListener('click', deleteTrip);
    document.querySelectorAll(".trip_detail").forEach(function(item) {
        item.addEventListener('click', showTrip);
    });
};
