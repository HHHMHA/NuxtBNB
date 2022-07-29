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
import homes from '~/data/homes'

export default {
  name: 'IndexPage',
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
  data() {
    return {
      homes: homes.slice(0, 3),
    }
  },
}
</script>
