import {createApp} from "vue";
import app from "./src/App.vue";
import router from "./src/router/index.js";
import store from "./src/store/index.js"

createApp(app)
    .use(router)
    .use(store)
    .mount('#app');
