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

// vuedatepicker
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

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
  faCheckCircle,
  faTimesSquare,
  faFilePen,
  faCog,
  faStopwatch,
  faEye,
  faEyeSlash,
  faTrash,
  faUpload,
  faWallet,
  faRightToBracket,
  faPaperPlane,
  faCopy,
  faCheckDouble,
  faCheckSquare,
  faPlus,
  faInfoCircle,
  faTimes,
  faCheck,
  faInfo,
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
  faWallet,
  faRotate,
  faTriangleExclamation,
  faRightToBracket,
  faPaperPlane,
  faCopy,
  faCheckDouble,
  faCheckSquare,
  faPlus,
  faInfoCircle,
  faTimes,
  faCheck,
  faInfo
);
const pinia = createPinia();
const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("pagination", VPagination);
app.component("datetime-picker", DatetimePicker);
app.use(router);
app.component("VueDatePicker", VueDatePicker);
app.use(pinia);
app.use(VueApexCharts);
app.use(print);
registerComponents(app);
app.mount("#app");
