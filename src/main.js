import Vue from 'vue'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import App from "./App";
import router from './router'
import axios from 'axios'
import VXEUtils from 'vxe-utils'
import XEUtils from 'xe-utils'
import VueGoodTablePlugin from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'
import "vue-easytable/libs/theme-default/index.css";
import * as echarts from 'echarts';

// 引入组件库
import {VeTable} from "vue-easytable";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import apiConfig from "../config/api.config";

Vue.use(VeTable);
Vue.use(ElementUI);
Vue.use(VueGoodTablePlugin);
Vue.use(VXETable)
Vue.use(VXEUtils, XEUtils, {mounts: ['cookie']})
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
// axios.defaults.baseURL = '/api';// 配置接口地址
axios.defaults.baseURL = apiConfig.baseUrl;// 配置接口地址
axios.defaults.withCredentials = false;
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}

})
