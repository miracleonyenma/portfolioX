<template>
  <img :src="`${srcUrl}`" :alt="alt">
</template>

<script>
export default {
    props:[
        'src-url',
        'alt'
    ],

    data(){
        return{
            // img: require(this.srcUrl)
        }
    },

    mounted(){

    }

}
</script>

<style>

</style>