import { createI18n } from "vue-i18n";
import { localesConfigs } from "./consfig";

//如果没有，获取系统语言
const language = navigator.language.toLowerCase()
console.log('结果',language);

const i18n = createI18n({
    fallbackLocale: 'zn',
    locale: localStorage.getItem('locale') || language || 'zh',  // 语言标识
    messages: localesConfigs
})

export default i18n