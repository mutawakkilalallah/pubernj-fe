import { createApp } from "vue";
import { createPinia } from "pinia";

import "@/assets/main.scss";
import "@/style.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import App from "@/App.vue";
import router from "@/router/index.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import axios from "./plugins/axios";
import {
  Datepicker,
  Timepicker,
  DatetimePicker,
  DateRangePicker,
} from "@livelybone/vue-datepicker";

import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import VueApexCharts from "vue3-apexcharts";
import print from "vue3-print-nb";

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
  faPen,
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
  faFileImport,
  faDownload,
  faPrint,
  faFileAlt,
  faTimes,
  faCheckCircle,
  faTimesCircle,
  faCheck,
  faExclamation,
  faTimesSquare,
  faTimesRectangle,
  faFilePen,
  faFileCircleQuestion,
  faCog,
  faStopwatch,
  faEye,
  faEyeSlash,
  faTrash,
  faUpload,
  faWallet,
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
  faCircleExclamation,
  faPen,
  faFileImport,
  faDownload,
  faPrint,
  faFileAlt,
  faCheckCircle,
  faTimesSquare,
  faFilePen,
  faCog,
  faStopwatch,
  faDownload,
  faEye,
  faEyeSlash,
  faTrash,
  faUpload,
  faWallet
);
const pinia = createPinia();
const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("pagination", VPagination);
app.component("datetime-picker", DatetimePicker);
app.use(router);

app.use(pinia);
app.use(VueApexCharts);
app.use(print);
registerComponents(app);
app.mount("#app");
