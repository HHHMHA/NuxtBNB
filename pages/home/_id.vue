<template>
  <div>
    <div class="home__images">
      <img v-for="image in home.images" :key="image" :src="image" alt="">
    </div>
    {{ home.title }}<br />
    ${{ home.pricePerNight }} / night<br />
    <img src="/images/marker.svg" width="20" height="20" alt="">{{ home.location.address }} {{ home.location.city }}
    {{ home.location.state }} {{ home.location.country }}<br />
    <img src="/images/star.svg" width="20" height="20" alt="">{{ home.reviewValue }}<br />
    {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds, {{ home.bathrooms }} bath<br />
    {{ home.description }}
    <div style="height: 800px; width: 800px;" ref="map"></div>
    <div v-for="review in reviews" :key="review.objectID">
      <img :src="review.reviewer.image" alt=""><br/ >
      {{ review.reviewer.name }}<br />
      {{ formatDate(review.date) }}<br />
      <short-text :text="review.comment" :target="150"></short-text><br />
    </div>
    <img :src="user.image" alt="" />
    {{ user.name }}<br />
    {{ formatDate(user.joined) }}<br />
    {{ user.reviewCount }}<br />
    {{ user.description }}<br />
  </div>
</template>

<script>
export default {
  name: "_id",
  head() {
    return {
      title: this.home.title
    };
  },
  data() {
    return {
      home: null,
      reviews: [],
      user: null,
    };
  },
  async asyncData({ params, $dataApi, error }) {
    if (!homeResponse.ok) return error({statusCode: homeResponse.status, message: homeResponse.statusText});

    if (!reviewResponse.ok) return error({statusCode: reviewResponse.status, message: reviewResponse.statusText});

    if (!userResponse.ok) return error({statusCode: reviewResponse.status, message: reviewResponse.statusText});

    const responses = await Promise.all([
      $dataApi.getHome( params.id ),
      $dataApi.getReviewsByHomeId( params.id ),
      $dataApi.getUserByHomeId( params.id ),
    ])

    const badResponse = responses.find(res => !res.ok);
    if (badResponse) return error({statusCode: badResponse.status, message: badResponse.statusText});

    return {
      home: responses[0].json,
      reviews: responses[1].json.hits,
      user: responses[2].json.hits[0],
    };
  },
  methods: {
    formatDate(str) {
      // TODO: use vue filters instead
      const date = new Date(str);
      return date.toLocaleDateString(undefined, {month: "long", year: "numeric", });
    },
  },
  mounted() {
    this.$maps.showMap(this.$refs.map, this.home._geoloc.lat, this.home._geoloc.lng);
  },
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
