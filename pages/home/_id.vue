<template>
  <div>
    <div class="home__images">
      <img v-for="image in home.images" :key="image" :src="image" alt="">
    </div>
    {{ home.title }}<br />
    ${{ home.pricePerNight }} / night<br />
    <img src="/images/marker.svg" width="20" height="20" alt="">{{ home.location.address }} {{ home.location.city }} {{ home.location.state }} {{ home.location.country }}<br />
    <img src="/images/star.svg" width="20" height="20" alt="">{{ home.reviewValue }}<br />
    {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds, {{ home.bathrooms }} bath<br />
  </div>
</template>

<script>
import homes from "~/data/homes";

export default {
  name: "_id",
  head() {
    return {
      title: this.home.title,
    };
  },
  data() {
    return {
      home: null
    };
  },
  created() {
    this.home = homes.find(home => home.objectID === this.$route.params.id);
  }
};
</script>

<style scoped>
.home__images {
  display: flex;
}

.home__images img {
  width: 200px;
  height: 150px;
}
</style>
