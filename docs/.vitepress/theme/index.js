import DefaultTheme from 'vitepress/theme';
import More from '../components/More.vue';
import Missive from '../components/Missive.vue';
import {redirects} from './redirects';
import './custom.css';

function normalize(raw) {
  return raw.replace(/\.html$/i, '').replace(/\/+$/, '') || '/';
}

function resolveRedirect(raw) {
  const [, path, extra] = raw.match(/^([^?#]*)(.*)$/);
  const sourcePath = normalize(path);
  if (!Object.hasOwn(redirects, sourcePath)) return null;
  return `${redirects[sourcePath]}${extra}`;
}

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