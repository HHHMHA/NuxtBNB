<template>
  <div>
    <nuxt-img :src="home.images[0]" width="200" height="150" provider="cloudinary" /><br />
    {{ home.title }}<br />
    {{ home.location.address }} {{ home.location.city }} {{ home.location.state }}<br />
    {{ home.guests }} guests<br />
    ${{ home.pricePerNight }} / night<br />
  </div>
</template>

<script>
export default {
  name: 'HomeCard',
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
img {
  width: 200px;
}
</style>
