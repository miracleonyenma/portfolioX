<template>
  <!-- <span class="icon" v-html="svg"></span> -->
  <span class="icon" v-html="require(`~/assets/icons/feather/${name}.svg?raw`)"></span>
</template>

<script>
// import svg from "~/assets/icons/feather/twitter.svg?raw";

export default {
    // data(){
    //     return { svg }
    // },
    props: {
        name: {
            type: String,
            default: "image"
        }
    }
}
</script>

<style>

</style>