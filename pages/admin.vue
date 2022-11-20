<template>
  <div class="p-4">
    Admin
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
import Cookie from 'js-cookie';
export default {
  name: "admin",
  asyncData({ $config, redirect }) {
    if (!Cookie.get($config.auth.cookieName)) {
      redirect('/no-access/');
      return;
    }
  }
};
</script>

<style scoped>

</style>
