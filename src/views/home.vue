<template>
    <span>主页</span>
    <ul>
        <li v-for="i in list" :key="i.name">{{i.name}}</li>
    </ul>
</template>
<script>
import {ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
export default {
    setup(){
        const route = useRoute();
        const router=new useRouter()
        const list=ref(router.getRoutes())
        console.log(route,router.getRoutes())
        return{
            list
        }
    }
}
</script>