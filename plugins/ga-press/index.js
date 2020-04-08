import bootstrap from "./bootstrap";
import lib from "./lib";
import { update } from "./config";
import ga from "./directives/ga";
import { autotracking as expectionAutotracking } from "./lib/exception";

export default function install(Vue, options = {}) {
  update({ ...options, $vue: Vue });

  Vue.directive("ga", ga);
  Vue.prototype.$ga = Vue.$ga = lib;

  expectionAutotracking(Vue);
  bootstrap();
}
