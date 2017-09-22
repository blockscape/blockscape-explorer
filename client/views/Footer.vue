<template>
<footer>
    <!--<ul id="site-links">
        <li><b><router-link to="/help">help</router-link></b></li>
    </ul>-->

    <div class="statement">©2017 Daniel Beal, Matthew Conover. Licensed under the GNU GPLv3</div>
</footer>
</template>

<style scoped lang="scss">

@import 'common';

footer {

    color: white;

    text-align: center;

    min-height: 80px;

    ul {
        padding: 0;
        &#social-media {
            @extend .no-user-select;
            cursor: default;
            margin: 0 0 2px;
        }
        &#social-media i {
            padding-left: 8px;
            padding-right: 8px;
        }

        li { display: inline-block; }
        &#site-links { margin: 0 0 8px; }
        &#site-links li:not(:last-child) {
            //border-right: 1px solid lighten($color-foot-font, 8%);
            padding-right: 10px;
            margin-right: 6px;
        }
    }


    @media print { display: none; }

    .statement a {
        //font-weight: $font-secondary-bold;
    }
}
</style>

<script lang="ts">
export default {
  
}
</script>
