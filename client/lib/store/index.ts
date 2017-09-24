import Vue from 'vue';
import Vuex, { Store, StoreOptions } from 'vuex';

import { clone } from 'lodash';

Vue.use(Vuex);

interface ContentEntry {
    content: string;
    props: any;
}

interface ExplorerStore {

    // The structure of data which builds the body of the page
    data: {
        split: ContentEntry[][],

        // here we can specify a few objs:
        // split: expects the page to be divided into n columns (n is defined within)
        // main: provides a full page card, plus optional content to the edges
        main: {
            left: ContentEntry[],
            right: ContentEntry[],
            page: ContentEntry[]
        }
    }

    navAt: {[id: string]: string};
    modalVue: Vue
}

export default new Vuex.Store({

    state: {
        data: {
            split: [
                [
                    {
                        content: 'shard-tree',
                        props: {
                        }
                    }
                ],
                [

                ],
                [

                ]
            ]
        }
    },

    mutations: {
    },

    modules: {
    }
} as StoreOptions<ExplorerStore>);
