<template>
  <span @click="go">登陆页</span>
  |
  <span @click="sendhttp">请求</span>
</template>
<script>
import { useRouter } from "vue-router";
import {getBanner} from "../axios";
export default {
  setup() {
    const router = new useRouter();
    const go = () => {
      router.push("/home");
    };
    const sendhttp = async () => {
      const req =await getBanner();
      console.log("-----", req);
    };
    return {
      go,
      sendhttp,
    };
  },
};
</script>
