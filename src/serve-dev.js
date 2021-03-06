import Vue from 'vue';
import Dev from '@/serve-dev.vue';
import Demo from '@/demo';

Vue.config.productionTip = false;

const isDev = process.env.NODE_ENV === 'development';

new Vue({
	render: h => h(isDev ? Dev : Demo),
}).$mount('#app');
