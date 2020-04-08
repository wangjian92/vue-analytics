import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import VueAnalytics from "vue-analytics";
import VueAnalytics from "../plugins/ga";

const isProd = process.env.NODE_ENV == "production";

Vue.use(VueAnalytics, {
  id: "UA-162666607-1",
  checkDuplicatedScript: true,
  router,
  // debug: {
  //   enabled: !isProd,
  //   sendHitTask: isProd,
  // },
  // autoTracking: {
  //   pageviewOnLoad: false,
  // },
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
