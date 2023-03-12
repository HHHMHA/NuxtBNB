<template>
  <div>
    <div
      v-for="home in homes"
      :key="home.objectID"
      style="float: left; margin: 10px"
    >
      <nuxt-link :to="`/home/${home.objectID}`"><home-card :home="home"></home-card></nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'default',
  head() {
    return {
      title: 'Homepage',
      meta: [{
        name: 'description',
        content: 'This is a homepage!',
        hid: 'description',
      }],
    };
  },
  async asyncData({$dataAPI}) {
    return {
      homes: (await $dataAPI.getHomes()).json.hits
    }
  }
}
</script>
