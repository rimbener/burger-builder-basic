import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-hel.firebaseio.com/',
    withCredentials: false
});

export default instance;