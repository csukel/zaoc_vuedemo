import * as types from './mutation-types';

const mutations = {
    
        [types.SAVE_STARTUP_PARAM] (state,user){
            state.user = user;
        },
    
        [types.SUCCESS_AUTH] (state){
            state.authenticated = true;
        },


};

export default {
    mutations
}