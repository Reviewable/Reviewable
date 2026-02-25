import DefaultTheme from 'vitepress/theme';
import More from '../components/More.vue';
import Missive from '../components/Missive.vue';
import {redirects} from './redirects';
import './custom.css';

const normalize = (raw) =>
  raw.replace(/\.html$/i, '').replace(/\/+$/, '') || '/';

const resolveRedirect = (raw) => {
  const [path, hash = ''] = raw.split('#');
  const from = normalize(path);
  const to = redirects[from];
  return to ? (hash ? `${to}#${hash}` : to) : null;
};

export default {
  ...DefaultTheme,
  enhanceApp({app, router}) {
    app.component('more', More);
    app.component('missive', Missive);

    router.onBeforeRouteChange = (to) => {
      const target = resolveRedirect(to);
      if (target) {
        setTimeout(() => router.go(target));
        return false;
      }
      return true;
    };
  }
};