<template>
  <div>Results for {{ label }}<br />
    <div style="height: 800px; width: 800px; float: right;" ref="map"></div>
    <div v-if="homes.length > 0">
      <nuxt-link :to="`/home/${home.objectID}`" v-for="home in homes" :key="home.objectID">
      <home-row :home="home" @mouseover.native="highlightMarker(home.objectID, true)" @mouseout.native="highlightMarker(home.objectID, false)"></home-row>
      </nuxt-link>
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
    this.updateMap();
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
  mounted() {
    this.updateMap();
  },
  methods: {
    highlightMarker(homeId, isHighlighted) {
      const marker = document.getElementsByClassName(`home-${homeId}`)[0];
      marker?.classList?.toggle('marker--highlight', isHighlighted);
    },
    updateMap() {
      this.$maps.showMap(this.$refs.map, this.lat, this.lng, this.getHomeMarkers());
    },
    getHomeMarkers() {
      return this.homes.map(home => {
        return {
          ...home._geoloc,
          pricePerNight: home.pricePerNight,
          id: home.objectID,
        }
      })
    },
  }
};
</script>

<style scoped>
.marker {
  background: white;
  border: 1px solid lightgray;
  font-weight: bold;
  border-radius: 20px;
  padding: 5px 8px;
}

.marker--highlight {
  color: white !important;
  background: black;
  border-color: black;
}
</style>
