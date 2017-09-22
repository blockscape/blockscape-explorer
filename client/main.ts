import _ from 'lodash';
//import VueResource from 'vue-resource';
import Vue, { ComponentOptions, PluginObject } from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import Header from 'views/Header.vue';
import Footer from 'views/Footer.vue';
import ToastStack from 'views/ToastStack.vue';

import 'css/style.scss';

const Spinner = (resolve: any) => require(['views/Spinner.vue'], resolve);

Vue.use(VueRouter);
Vue.use(VueResource);

import store from './lib/store';

interface MainApp extends Vue {
    minPageSize: number;

    onResize(): void;
    updateRouteQuery(params: any): void
}

document.body.innerHTML = '<div id="app"></div>';

var app = new Vue({

    el: '#app',
    store: store,

    computed: {
    },

    methods: {
        onResize() {
            this.minPageSize = document.documentElement.clientHeight -
                document.getElementById('content').offsetTop -
                document.getElementsByTagName('FOOTER')[0].clientHeight;
        }
    },

    router: new VueRouter({
        mode: 'history',
        routes: [
            // sitewide routing table goes here!
            { path: '/', component: Spinner, props: {size: 120} },
        ],
        scrollBehavior(to, from, savedPosition) {
            if(savedPosition)
                return savedPosition;
            else
                return {x: 0, y: 0};
        }
    }),

    render(createElement: any) {
        return createElement(
            'div',
            {
                'class': 'page'
            },
            [
                createElement(Header),
                createElement('div', {
                    style: {
                        'min-height': this.minPageSize + 'px',
                        'width': '100%',
                        'position': 'relative'
                    },
                    attrs: {
                        id: 'content'
                    },

                    ref: 'content'
                }, [
                    createElement('router-view',
                    {
                        on: {'update-route': this.updateRouteQuery}
                    })
                ]),
                createElement(Footer),
                createElement(ToastStack)
            ]
        );

        //template: '<div><bm-header :nav="nav"></bm-header><router-view></router-view><bm-footer></bm-footer></div>',
    },

    mounted() {
        window.addEventListener('resize', this.onResize);
        this.onResize();
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
    },

} as ComponentOptions<MainApp>);