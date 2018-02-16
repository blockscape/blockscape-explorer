<template>
<header class="header">
<div class="infobar">
    <div class="kv">
        <span class="key"># Nodes:</span>
        <span class="value">{{stats.connected_peers}}</span>
    </div>
    <div class="kv">
        <span class="key">Root Height:</span>
        <span class="value">0</span>
    </div>
</div>
<div class="actionbar">
    <router-link to="/">
        <div class="logo">
            <img :src="require('img/logo.png')" />
            <span style="color: white">SCAPE</span>
        </div>
    </router-link>
    <div class="searchbar">
        <form @submit.prevent="doSearch">
            <input type="text" v-model="searchQuery" placeholder="Block, Txn, Account..." />
        </form>
    </div>
</div>
</header>
</template>

<style lang="scss">

.header {

    color: white;

    .infobar {
        display: block;
        width: 100%;

        background-color: #383838;
        height: 35px;
        line-height: 35px;

        padding-left: 10px;
        padding-right: 10px;

        box-sizing: border-box;

        .kv {
            display: inline-block;
            margin-right: 20px;

            .key {
                min-width: 100px;
            }

            .value {
                min-width: 40px;
                text-align: right;
            }
        }
    }

    .logo {
        img {
            width: 50px;
            height: 50px;
        }

        span {
            vertical-align: super;
            font-size: 50px;
            font-family: Quicksand;
            font-weight: lighter;
        }

        display: inline-block;
        margin-right: 20px;
    }

    .actionbar {
        padding: 10px;
    }

    .searchbar {
        vertical-align: super;
        display: inline-block;

        width: 480px;
        max-width: 100%;

        form {
            width: 100%;
        }

        input {
            //height: 50px;
            vertical-align: bottom;
            font-size: 16px;
            padding-top: 10px;
            padding-bottom: 10px;
            padding-left: 10px;
            padding-right: 10px;
            box-sizing: border-box;
            border: none;
            outline: none;
            width: 100%;
            overflow: auto;
            //border-radius: 3px;
        }
    }
}

</style>

<script lang="ts">
import _ from 'lodash';
import Vue, { ComponentOptions } from 'vue';
import Component from 'vue-class-component';

import { NetworkStatistics } from 'lib/primitives/stats';

const HEADER_POLL_INTERVAL = 5000;

@Component({
})
export default class Header extends Vue {

    interval: any;

    searchQuery: string = "";

    stats: NetworkStatistics = {
        attached_networks: 0,
        connected_peers: 0,
        rx: 0,
        tx: 0,
        avg_latency: 0
    };

    created() {
        // start
        this.interval = setInterval(this.getData, HEADER_POLL_INTERVAL);
        this.getData();
    }

    destroyed() {
        clearInterval(this.interval);
    }

    async getData() {
        try {
            this.stats = (await this.$http.get('/api/stats/net')).data;
        }
        catch(err) {
            console.error('Could not load network statistics: ', err);
        }
    }

    // TODO: This function could be made a bit more efficient
    // if it sent the data directly to the page rather than just redirecting.
    async doSearch() {

        console.log('Doing search');

        this.$store.commit('setLoading', false);

        try {
            let res = (
                await this.$http.get('/api/chain/resolve?q=' + encodeURIComponent(this.searchQuery))
            ).data;

            let redir = `/${res.type}/${res.key}`;

            this.$router.push(redir);
        }
        catch(err) {
            if(err.code == 404) {
                // Push toast indicating that it cannot be found

            }
            else {
                // Push toast indicating that we are having server issues or something
            }
        }

        this.$store.commit('setLoading', false);
    }
};

</script>
