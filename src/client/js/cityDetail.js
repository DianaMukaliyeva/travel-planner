export const getCityDetail = async (url='', city, user) => {
    const request = await fetch(`${url}q=${city}&username=${user}`);
    try {
        const data = await request.json();
        return data.geonames[0];
    } catch (error) {
        return ({'error': error});
    }
}

export const postCityDetail = async (url='', data={}) => {
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
        console.log('error', error);
    }
}
