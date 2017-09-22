import Vue from 'vue';
import Vuex, { Store, StoreOptions } from 'vuex';

import { clone } from 'lodash';

Vue.use(Vuex);

interface BuyMeStore {
    navAt: {[id: string]: string};
    modalVue: Vue
}

export default new Vuex.Store({

    state: {
    },

    mutations: {
    },

    modules: {
    }
} as StoreOptions<BuyMeStore>);
