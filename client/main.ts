import _ from 'lodash';
//import VueResource from 'vue-resource';
import Vue, { Component, ComponentOptions, PluginObject } from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import Header from './views/Header';
import Footer from './views/Footer';
import ToastStack from './views/ToastStack';

import 'css/style.scss';

const Spinner = (resolve: any) => require(['./views/Spinner.vue'], resolve);
const Home = (resolve: any) => require(['./views/Home.vue'], resolve);
const ViewBlock = (resolve: any) => require(['./views/ViewBlock.vue'], resolve);
const ViewTxn = (resolve: any) => require(['./views/ViewTxn.vue'], resolve);
const ListBlock = (resolve: any) => require(['./views/ListBlock.vue'], resolve);
const ListTxn = (resolve: any) => require(['./views/ListTxn.vue'], resolve);

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
            { path: '/', component: <ComponentOptions<Vue>>Home },
            { path: '/block', component: <ComponentOptions<Vue>>ListBlock },
            { path: '/block/:hash', component: <ComponentOptions<Vue>>ViewBlock, props: true },
            { path: '/txn', component: <ComponentOptions<Vue>>ListTxn },
            { path: '/txn/:hash', component: <ComponentOptions<Vue>>ViewTxn, props: true }
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
                        'position': 'relative'
                    },
                    attrs: {
                        id: 'content'
                    },

                    ref: 'content'
                }, [
                    createElement('router-view')
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