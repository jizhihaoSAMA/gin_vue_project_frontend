import Vue from 'vue';
import Vuex from 'vuex';
import userModule from './module/user';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        showBox: true,
    },
    mutations: {
        SET_SHOWBOX_STATE (state, STATE) {
            state.showBox = STATE;
        }
    },
    actions: {

    },
    modules: {
        userModule,
    },
});