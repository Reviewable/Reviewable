import DefaultTheme from 'vitepress/theme';
import More from '../components/More.vue';
import Missive from '../components/Missive.vue';
import './custom.css';

export default {
  ...DefaultTheme,
  enhanceApp({app}) {
    app.component('more', More);
    app.component('missive', Missive);
  }
}
