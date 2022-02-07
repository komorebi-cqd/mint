import { createApp } from 'vue'
import App from './App.vue'
import store from './store'


store.dispatch('subscribeChain');

createApp(App).use(store).mount('#app')
