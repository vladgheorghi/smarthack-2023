import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'pXStedvXkA9pMcNK1tWvx_4DesmTsIZ47qfTa6WkqFxgrCvCqJA0mpALQ53J';

async function veridionGetIndustriesList() {
    try {
        const response = await axios.get('https://data.veridion.com/industries/v0');
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

async function veridionGetLocationsList() {
    try {
        const response = await axios.get('https://data.veridion.com/locations/v0');
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

export { veridionGetIndustriesList as getIndustriesList, veridionGetLocationsList as getLocationsList };