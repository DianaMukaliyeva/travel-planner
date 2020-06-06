const getTripInformation = async (url, data) => {
    const request = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const data = await request.json();
        return data;
    } catch (error) {
        return ({error, error});
    }
};

const updateUI = () => {
    toggleModal();

};

const toggleModal = () => {
    document.getElementById('trip_modal').classList.toggle("show-modal");
}

export const handleSubmit = async (event) => {
    event.preventDefault();
    var closeButton = document.querySelector(".close");
    closeButton.addEventListener("click", toggleModal);
    const city = document.getElementById('city').value;
    const date = document.getElementById('depart_date').value;
    const now = new Date();
    const timeOffset = now.getTimezoneOffset() * 60000;
    const data = {city: city, departDate: date, timeOffset: timeOffset};
    console.log(city);
    console.log(date);
    const trip = await getTripInformation('http://localhost:5000/tripInfo', data);
    trip.success ? updateUI(trip) : alert('Couldn\'t find city with this name');
};
