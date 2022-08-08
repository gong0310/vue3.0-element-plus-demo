<template>
  <div>
    <el-button
      @click="toggle"
      style="margin-left: 8px; vertical-align: middle;"
    >
      切换语言
    </el-button>
  </div>
</template>

<script>
import {getCurrentInstance  } from "vue";
export default {
  setup(props,context) {
     const { proxy } = getCurrentInstance();
    console.log('结果=>',props,context,proxy);

    const toggle = () => {
      let lang= localStorage.getItem("locale");
      if (lang == "zh") {
         localStorage.setItem("locale", "en");
         proxy.$i18n.locale = localStorage.getItem("locale");
         context.emit('updete-lang','en')
      }
      if (lang == "en") {
        localStorage.setItem("locale", "zh");
        proxy.$i18n.locale = localStorage.getItem("locale");
        context.emit('updete-lang','zh')
      }
    };
    return {
      toggle,
    };
  },
};
</script>
