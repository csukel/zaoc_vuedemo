import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
// import * as getters from './getters';
import mutations from './mutations';
import state from './state';
import { SUCCESS_AUTH } from './mutation-types';


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    state : state.state,
    actions,
    // getters,
    mutations : mutations.mutations,
    strict: debug,
})