<template>
  <div>
    <div style="clear: left"></div>
    <img :src="home.images[0]" class="home__image" /><br />
    {{ home.title }}<br />
    {{ home.location.address }} {{ home.location.city }} {{ home.location.state }}<br />
    {{ pluralize(home.guests, 'guest') }}, {{ pluralize(home.bedrooms, 'room') }}, {{ pluralize(home.bathrooms, 'bath') }}<br />
    ${{ home.pricePerNight }} / night<br />
    <img src="/images/star.svg" width="20" height="20" alt="">{{ home.reviewValue }} ({{ home.reviewCount }})<br />

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
  methods: {
    pluralize(number, singularWord) {
      const text = `${number} ${singularWord}`;
      if (number === 1) return text;
      return `${text}s`;
    },
  },
}
</script>

<style scoped>
.home__image {
  width: 200px;
  float: left;
  padding: 10px;
}
</style>
