<template>
  <div>{{ lat }} / {{ lng }} / {{ label }}<br />
    <div v-for="home in homes" :key="home.objectID">{{ home.title }}</div>
  </div>
</template>

<script>
export default {
  name: "search",
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
