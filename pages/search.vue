<template>
  <div>{{ lat }} / {{ lng }} / {{ label }}<br />
    <div v-if="homes.length > 0">
      <home-row v-for="home in homes"
                :key="home.objectID"
                :home="home"
      ></home-row>
    </div>
    <div v-else>
      No results found
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  head() {
    return {
      title: `Homes around ${this.label}`
    };
  },
  async beforeRouteUpdate(to, from, next) {
    const data = await this.$dataApi.getHomesByLocation(to.query.lat, to.query.lng);
    this.homes = data.json.hits;
    this.label = to.query.label;
    this.lat = to.query.lat;
    this.lng = to.query.lng;
    next();
  },

  async asyncData({ query, $dataApi }) {
    const data = await $dataApi.getHomesByLocation(query.lat, query.lng);
    return {
      homes: data.json.hits,
      lat: query.lat,
      lng: query.lng,
      label: query.label,
    };
  },
};
</script>

<style scoped>

</style>
