import {defineConfig} from 'vitepress';
import {readFileSync} from 'fs';

export default defineConfig({
  title: 'Reviewable',
  titleTemplate: 'Reviewable — :title',
  description: 'Reviewable user manual',
  cleanUrls: true,
  lastUpdated: true,

  markdown: {
    config(md) {
      // Prevent VitePress parsing of {{}} as substitutions inside code blocks.
      const defaultCodeInline = md.renderer.rules.code_inline;
      md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
        tokens[idx].attrSet('v-pre', '');
        return defaultCodeInline(tokens, idx, options, env, self);
      }
    }
  },

  themeConfig: {
    logo: 'https://reviewable.io/apple-touch-icon-precomposed.png',
    repo: 'reviewable/reviewable',
    editLink: {
      pattern: 'https://github.com/reviewable/reviewable/edit/master/docs/:path',
      text: 'Edit this page on GitHub'
    },
    outline: false,
    search: {
      provider: 'local'
    },

    nav: [
      {text: 'Docs', link: '/', activeMatch: '^/'},
      {text: 'Examples', link: 'https://github.com/Reviewable/Reviewable/tree/master/examples'},
      {
        text: 'Support', items: [
        {text: 'Blog', link: 'https://www.reviewable.io/blog/'},
        {text: 'Changelog', link: 'https://changelog.reviewable.io/'},
        {text: 'Issues', link: 'https://github.com/reviewable/reviewable/issues'},
        {component: 'missive'},
        {text: 'Email us', link: 'mailto:support@reviewable.io'}
      ]}
    ],

    sidebar: [
      page('index'),
      page('reviews'),
      page('files'),
      page('discussions'),
      page('dashboard'),
      page('accountsettings'),
      page('repositories'),
      page('subscriptions'),
      page('abnormal'),
      page('tips'),
    ],
  },

  head: [
    ['link', {rel: 'stylesheet', href: 'https://reviewable.io/common.css'}],
    ['link', {rel: 'apple-touch-icon', sizes: '57x57', href: 'https://reviewable.io/apple-touch-icon-57x57.png'}],
    ['link', {rel: 'apple-touch-icon', sizes: '114x114', href: 'https://reviewable.io/apple-touch-icon-114x114.png'}],
    ['link', {rel: 'apple-touch-icon', sizes: '72x72', href: 'https://reviewable.io/apple-touch-icon-72x72.png'}],
    ['link', {rel: 'apple-touch-icon', sizes: '144x144', href: 'https://reviewable.io/apple-touch-icon-144x144.png'}],
    ['link', {rel: 'apple-touch-icon', sizes: '60x60', href: 'https://reviewable.io/apple-touch-icon-60x60.png'}],
    ['link', {rel: 'apple-touch-icon', sizes: '120x120', href: 'https://reviewable.io/apple-touch-icon-120x120.png'}],
    ['link', {rel: 'apple-touch-icon', sizes: '76x76', href: 'https://reviewable.io/apple-touch-icon-76x76.png'}],
    ['link', {rel: 'apple-touch-icon', sizes: '152x152', href: 'https://reviewable.io/apple-touch-icon-152x152.png'}],
    ['link', {rel: 'icon', type:'image/png', href: 'https://reviewable.io/favicon-196x196.png', sizes: '196x196'}],
    ['link', {rel: 'icon', type:'image/png', href: 'https://reviewable.io/favicon-160x160.png', sizes: '160x160'}],
    ['link', {rel: 'icon', type:'image/png', href: 'https://reviewable.io/favicon-96x96.png', sizes: '96x96'}],
    ['link', {rel: 'icon', type:'image/png', href: 'https://reviewable.io/favicon-16x16.png', sizes: '16x16'}],
    ['link', {rel: 'icon', type:'image/png', href: 'https://reviewable.io/favicon-32x32.png', sizes: '32x32'}],
    ['meta', {name: 'apple-mobile-web-app-title', content: 'Reviewable'}],
    ['meta', {name: 'msapplication-TileColor', content: '#5a5076'}],
    ['meta', {name: 'msapplication-TileImage', content: '/mstile-144x144.png'}],
    ['meta', {name: 'application-name', content: 'Reviewable'}],
  ]
});

function page(path) {
  const markdown = readFileSync(`${path}.md`).toString().replace(/^```[\s\S\n]+?^```\n/gm, '');
  let currentLevel = 0, itemStack = [];
  for (const match of markdown.matchAll(/^(#+) (.*?)(?: +\{(?:#|id=)(.*?)\})?$/gm)) {
    const level = match[1].length;
    const title = match[2].replace(/`(.*?)`/g, '<code>$1</code>');
    const slug =
      match[3] ||
      match[2].toLowerCase().replace(/[^a-z0-9\-]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/, '');
    const item = {text: title, link: `/${path}#${slug}`};
    if (level === currentLevel) {
      itemStack.pop();
    } else if (level < currentLevel) {
      itemStack.pop();
      itemStack.pop();
    }
    const lastItem = itemStack.length ? itemStack[itemStack.length - 1] : null;
    if (lastItem) {
      lastItem.collapsed = true;
      lastItem.items = lastItem.items || [];
      lastItem.items.push(item);
    }
    itemStack.push(item);
    currentLevel = level;
  }
  return itemStack[0];
}
