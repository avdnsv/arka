import { createApp } from "vue";
import "./style.css";
import "./vs-style.css";
import App from "./App.vue";
import router from "./router";

import vueSelect from "vue-select";

import OpenIndicator from "./components/icons/OpenIndicator.vue";
import Deselect from "./components/icons/Deselect.vue";

vueSelect.props.components.default = () => ({ OpenIndicator, Deselect });

createApp(App).component("v-select", vueSelect).use(router).mount("#app");
