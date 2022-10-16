<template>
  <div>
    <div class="app-house-header" :style="`background-image: url(${home.images[0]})`"></div>
    <div class="app-house-body">
      <img src="/images/icons/heart.svg" class="app-fav" alt="">
      <h2>{{ home.title }}</h2>
      <div class="app-address">
        {{ home.location.address }} {{ home.location.city }} {{ home.location.state }}<br />
      </div>
      <div class="app-amenities">
        <p>
          {{ pluralize(home.guests, 'guest') }}, {{ pluralize(home.bedrooms, 'room') }}, {{ pluralize(home.bathrooms, 'bath') }}
        </p>
        <p>
          {{ features }}
        </p>
      </div>
      <div class="app-flex">
        <div class="app-rating">{{ home.reviewValue }} <span>({{ home.reviewCount }})</span></div>
        <div class="app-price">
          ${{ home.pricePerNight }} <span>/ night</span>
        </div>
      </div>
    </div>

    <img :src="home.images[0]" class="home__image" /><br />
    {{ home.title }}<br />
    {{ home.location.address }} {{ home.location.city }} {{ home.location.state }}<br />
    {{ pluralize(home.guests, 'guest') }}, {{ pluralize(home.bedrooms, 'room') }}, {{ pluralize(home.bathrooms, 'bath') }}<br />
    ${{ home.pricePerNight }} / night<br />
    <img src="/images/star.svg" width="20" height="20" alt="">{{ home.reviewValue }} ({{ home.reviewCount }})<br />

  </div>
</template>

<script>
import pluralize from "@/utils/pluralize";

export default {
  name: 'HomeCard',
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
  methods: {
    pluralize,
  },
  computed: {
    features() {
      return this.home.features.slice(0, 3).join(", ");
    }
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
