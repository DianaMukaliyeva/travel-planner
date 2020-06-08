import { toggleModal, saveOrDeleteTrip, fillModalWindow } from './modal';
import { addTripToUI } from './trip';

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
    for (let key in trips) {
        addTripToUI(key, trips[key]);
    }
};

export const deleteTrip = async (id, item) => {
    const request = await fetch('http://localhost:5000/trips/' + id, {
        method: 'DELETE',
    });
    const res = await request.json();
    if (res) {
        item.parentNode.removeChild(item);
    }
};

export const getTrip = async (id) => {
    const request = await fetch('http://localhost:5000/trip/' + id);
    const res = await request.json();
    if (res.success) {
        return res.trip;
    }
    return null;
};

const tripAction = async (event, id, item) => {
    if (event.target.name == 'delete') {
        deleteTrip(id, item);
    } else {
        const trip = await getTrip(id);
        fillModalWindow(trip, 'Delete Trip', id);
        toggleModal();
    }
}

export const init = async () => {
    const trips = await getAllTrips();
    updateUI(trips);

    setActiveNavMenu();
    document.addEventListener('scroll', setActiveNavMenu);

    document.querySelector(".close").addEventListener("click", toggleModal);
    document.getElementById('modal_button').addEventListener('click', saveOrDeleteTrip);
    document.querySelectorAll(".trip_detail").forEach(function(item) {
        const id = item.dataset.id;
        item.addEventListener('click', function(e) {tripAction(e, id, item);});
    });
};
