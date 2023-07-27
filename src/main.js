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

import {
  faBell,
  faBriefcase,
  faBrush,
  faBus,
  faChartSimple,
  faClone,
  faLocationDot,
  faMap,
  faPenAlt,
  faRotate,
  faSignOutAlt,
  faUser,
  faUserCog,
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
<<<<<<< HEAD
  faBus
=======
  faBell,
  faClone
>>>>>>> c4b60b8f00cf29de18e440e4ee91b8fb26d864c2
);
const pinia = createPinia();
const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("pagination", VPagination);
app.use(router);

app.use(pinia);
registerComponents(app);
app.mount("#app");
