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
  faBriefcase,
  faBrush,
  faChartSimple,
  faLocationDot,
  faMap,
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
  faBriefcase
);
const pinia = createPinia();
const app = createApp(App);

// import moment from "moment";
// import vueMoment from "vue-moment";
// import "moment/locale/es";

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);

// app.use(moment);

app.use(pinia);
registerComponents(app);
app.mount("#app");
