import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://cms-react-af25a.firebaseio.com/'
});

export default instance;