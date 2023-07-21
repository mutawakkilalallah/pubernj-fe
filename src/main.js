import { createApp } from "vue";

import { createPinia } from 'pinia'

import "@/assets/main.scss";
import "@/style.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import App from "@/App.vue";
import router from "@/router/index.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import axios from "./plugins/axios";

import {
  faBrush,
  faChartSimple,
  faLocationDot,
  faMap,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { registerComponents } from "./plugins/global-components";

library.add(faBrush, faSignOutAlt, faChartSimple, faMap, faLocationDot);
const pinia = createPinia();
const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);

app.use(pinia);
registerComponents(app)
app.mount("#app");
