<template>
  <el-config-provider :locale="currentLocale">
    <div style="margin: 20px;">
      <h1>{{ $t("message.title") }}</h1>
      <ul>
        <li v-for="brand in brands" :key="brand">{{ brand }}</li>
      </ul>
      <input
        style="width: 300px;"
        class="form-control"
        :placeholder="$t('placeholder.enter')"
      />
    </div>
    <el-pagination
      v-model:currentPage="currentPage1"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000"
    >
    </el-pagination>
    <HelloWorld @updete-lang="updeteLang" msg="Welcome to Your Vue.js App" />
  </el-config-provider>
  <hr/>
  <router-view></router-view>
</template>

<script>
import { ElConfigProvider } from "element-plus";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n"; //要在js中使用国际化
import HelloWorld from "./components/HelloWorld.vue";

import En from "element-plus/es/locale/lang/en";
import zhCn from "element-plus/es/locale/lang/zh-cn";
export default {
  name: "App",
  components: {
    HelloWorld,
    ElConfigProvider,
  },
  setup() {
    const { t } = useI18n();

    const currentPage1 = ref(5);
    let brands = computed(() => {
      return [
        t("brands.nike"),
        t("brands.adi"),
        t("brands.nb"),
        t("brands.ln"),
      ];
    });
    let locale = ref("zh");
    let currentLocale = computed(() => {
      //控制 element-plus 组件语言
      let lan = "";
      if (locale.value == "zh") {
        lan = zhCn;
      } else {
        lan = En;
      }
      return lan;
    });

    const updeteLang = (i) => {
      locale.value = i;
    };
    return { brands, currentPage1, currentLocale, updeteLang };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
