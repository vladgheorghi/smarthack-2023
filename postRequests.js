import axios from 'axios';

async function sendSearchPostRequest(filterObj) {
    try {
        axios.defaults.headers.post['x-api-key'] = 'pXStedvXkA9pMcNK1tWvx_4DesmTsIZ47qfTa6WkqFxgrCvCqJA0mpALQ53J';

        const response = await axios.post('https://data.veridion.com/search/v2/companies', filterObj);

        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function sendMatchPostRequest(name, location) {
    try {
        axios.defaults.headers.post['x-api-key'] = 'Lk34BnMBMFDj07xGbkQ_aNikeD4_NSKq643WxEEuQUAcjtbrVJStX9FpASw7';

        const response = await axios.post('https://data.veridion.com/match/v4/companies',
        {
            "commercial_names": [name],
            "address_txt": location
        });

        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export {sendMatchPostRequest as matchPostRequest, sendSearchPostRequest as searchPostRequest};