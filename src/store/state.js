import axios from 'axios';

const service = axios.create({
    baseURL : 'http://sapgtw.ahi.com.cy:8000'
});

const state = {
    service : service,
    user : {
        fullname: 'Dummy',
        id : 'Dummy',
        name: 'Dummy',
        defaultStorageLoc: '1100',
        defaultTab: 'WARD'
    },
    authenticated : false
    
}

export default {
    state
}