import Vue from 'vue';
import Vuex, { Store, StoreOptions } from 'vuex';

import { clone } from 'lodash';

Vue.use(Vuex);

interface ContentEntry {
    content: string;
    props: any;
}

interface ExplorerStore {
    loading: Boolean
}

export default new Vuex.Store({

    state: {
        loading: false
    },

    mutations: {
        setLoading(state, loading: boolean) {
            state.loading = loading;
        }
    },

    modules: {
    }
} as StoreOptions<ExplorerStore>);
