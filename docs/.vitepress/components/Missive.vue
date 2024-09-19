<template>
  <a @click="openChat">Chat</a>
</template>

<script setup>

import {onMounted} from 'vue';

const LIGHT_COLORS = {
  'background-color': '#fff',
  'bubble-dark-color': 'hsl(0deg, 0%, 50.2%)',  // grey-3
  'bubble-light-color': 'hsl(0deg, 0%, 94.9%)',
  'light-text-color': '#fff',
  'text-color': '#34363a',
};

const DARK_COLORS = {
  'background-color': '#161616', // Dark mode --grey-7
  'bubble-dark-color': 'hsl(0deg, 0%, 50.2%)',  // grey-3
  'bubble-light-color': '#808080', // Dark mode --grey-5
  'light-text-color': '#7b7c7f',
  'text-color': '#ffffffd9', // Dark mode --text-color-normal
};

const variables = {
  'font-family': 'DroidSans, Roboto, sans-serif',
  'font-size': '13px',
  'opened-border-radius': '5px',
  'transition-duration': '300ms',
  width: '450px',
  margin: '10px'
};

let opened = false;

onMounted(() => {
  const observer = new MutationObserver(mutations => {
    detectDarkMode();
  });
  observer.observe(document.documentElement, {attributes: true, attributeFilter: ['class']});
  detectDarkMode();

  window.MissiveChatConfig = {
    id: '236a42af-a112-4637-9ad6-fa228db5ae9b',
    chat: {hidden: true, variables},
    visitor: {requireEmail: true},
    meta: {instance: 'docs'},
    onOpen: () => {
      window.MissiveChat.showButton();
      opened = true;
    }
  };
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://webchat.missiveapp.com/' + window.MissiveChatConfig.id + '/missive.js';
  document.head.appendChild(script);
});


function openChat() {
  if (window.MissiveChat) window.MissiveChat.open();
}

function detectDarkMode() {
  const dark = document.documentElement.classList.contains('dark');
  Object.assign(variables, dark ? DARK_COLORS : LIGHT_COLORS);
  const chat = window.MissiveChat;
  if (chat) {
    try {
      chat.setVariables(variables);
      if (opened) chat.showButton();
    } catch (e) {
      // ignore
    }
  }
}

</script>

<style scoped>

a {
  cursor: pointer;
  /* styling copied from VitePress .link, which is unfortunately scoped */
  display: block;
  border-radius: 6px;
  padding: 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  transition: background-color 0.25s, color 0.25s;
}

a:hover {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-default-soft);
}

</style>
