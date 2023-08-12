import { createApp } from "vue";
import { createPinia } from "pinia";

import "@/assets/main.scss";
import "@/style.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import App from "@/App.vue";
import router from "@/router/index.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import axios from "./plugins/axios";

import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import VueApexCharts from "vue3-apexcharts";
import print from 'vue3-print-nb'

import {
  faArrowLeft,
  faArrowRight,
  faBell,
  faBriefcase,
  faBrush,
  faBus,
  faChartSimple,
  faCircleExclamation,
  faClipboard,
  faClone,
  faCreditCard,
  faLightbulb,
  faLocationDot,
  faMap,
  faMoon,
  faPenAlt,
  faRotate,
  faSignOutAlt,
  faSquarePollHorizontal,
  faSun,
  faTriangleExclamation,
  faUser,
  faUserCheck,
  faUserCog,
  faUserLock,
  faUserMd,
  faUserXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { registerComponents } from "./plugins/global-components";

library.add(
  faBrush,
  faSignOutAlt,
  faChartSimple,
  faMap,
  faLocationDot,
  faUser,
  faUserCog,
  faBriefcase,
  faPenAlt,
  faRotate,
  faBell,
  faClone,
  faBus,
  faClipboard,
  faCreditCard,
  faArrowRight,
  faArrowLeft,
  faLightbulb,
  faSun,
  faMoon,
  faSquarePollHorizontal,
  faUserCheck,
  faTriangleExclamation,
  faUserXmark,
  faUserMd,
  faUserLock,
  faCircleExclamation
);
const pinia = createPinia();
const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("pagination", VPagination);
app.use(router);

app.directive("rupiah", {
  mounted(el, binding) {
    const value = binding.value;
    if (value === null || isNaN(value)) {
      el.textContent = "";
    } else {
      const formattedValue = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumSignificantDigits: 12,
      }).format(value);
      el.textContent = formattedValue;
    }
  },
});

app.use(pinia);
app.use(VueApexCharts);
app.use(print)
registerComponents(app);
app.mount("#app");
