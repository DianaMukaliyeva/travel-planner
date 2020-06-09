export const addTripToUI = (id, trip) => {
    const now = new Date();
    now.setHours(0,0,0,0);
    const timeOffset = now.getTimezoneOffset() * 60000;
    const diff = (trip.departDate - now + timeOffset)/1000/60/60/24;

    const divItem = document.createElement('div');

    divItem.setAttribute('data-id', id);
    divItem.className = 'trip_detail';

    const imgItem = document.createElement('img');
    imgItem.src = trip.imageUrl;
    imgItem.className = 'trip_img';

    const hItem = document.createElement('h4');
    hItem.innerHTML = `Trip to ${trip.city}, ${trip.country}`

    const pItem = document.createElement('p');
    if (diff === 0) {
        pItem.innerHTML = 'is today &#128131;';
    } else if (diff < 0) {
        divItem.classList.add('hidden');
        pItem.innerHTML = `was ${diff * -1} days ago`;
    } else if (diff === 1) {
        pItem.innerHTML = `is tomorrow`;
    } else {
        pItem.innerHTML = `is ${diff} days away`;
    }

    const inputItem = document.createElement('input');
    inputItem.setAttribute('name', 'delete');
    inputItem.setAttribute('type', 'button');
    inputItem.setAttribute('value', 'Delete Trip');
    inputItem.className = 'delete_trip';

    divItem.appendChild(imgItem);
    divItem.appendChild(hItem);
    divItem.appendChild(pItem);
    divItem.appendChild(inputItem);
    document.querySelector('.trip_collection').appendChild(divItem);
};
