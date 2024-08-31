import axios from 'axios';

const API_KEY = '45692684-8ccf01c83a8eaaa75aa323210';
const apiUrl = `https://pixabay.com/api/?key=${API_KEY}`;

const formatUrl = (params) => {
    let url = apiUrl + "&per_page=25&safesearch=true&editors_choice=true";
    if (!params) return url;
    Object.keys(params).forEach(key => {
        let value = key === 'q' ? encodeURIComponent(params[key]) : params[key];
        url += `&${key}=${value}`; // Correct the query parameter format
    });
    console.log('final url: ', url);
    return url;
};

export const apiCall = async (params) => {
    try {
        const response = await axios.get(formatUrl(params));
        const { data } = response;
        return { success: true, data };
    } catch (err) {
        console.log('got error: ', err.message); // Correct error logging
        return { success: false, error: err.message };
    }
};
