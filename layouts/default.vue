<template>
  <div class="app">
    <header class="app-header">
      <div class="app-logo">
        <img src="/images/logo.svg" alt="">
      </div>
      <div class="app-search">
        <input type="search" ref="citySearch" @change="changed" placeholder="Enter your address">
        <client-only>
          <template #placeholder>
            <input class="datepicker">
            <span class="ml-6 mr-2">to</span>
            <input class="datepicker"><br/>
          </template>

          <date-picker v-model="range"
                       is-range
                       timezone="UTC"
                       :modelConfig="{timeAdjust: '00:00:00'}"
          >
            <template v-slot="{ inputValue, inputEvents }">
              <input :value="inputValue.start" v-on="inputEvents.start" class="datepicker">
              <span class="ml-6 mr-2">to</span>
              <input :value="inputValue.end" v-on="inputEvents.end" class="datepicker"><br/>
            </template>
          </date-picker>
        </client-only>
        <button @click="search">
          <img src="/images/icons/search.svg" alt="">
        </button>
      </div>
      <div class="app-user-menu">
        <template v-if="isLoggedIn">
          <img src="/images/icons/house.svg" alt="">
          <div class="name">Host</div>
          <img :src="user.profileUrl" class="avatar">
        </template>
        <div v-show="!isLoggedIn" class="ml-8" id="googleButton"></div>
      </div>
    </header>
    <Nuxt/>
  </div>
</template>

<script>
export default {
  name: "default",
  data() {
    return {
      location: {
        lat: 0,
        lng: 0,
        label: '',
      },
      range: {
        start: new Date(),
        end: new Date(),
      }
    };
  },
  mounted() {
    this.$maps.makeAutoComplete(this.$refs.citySearch);
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
  },
  methods: {
    search() {
      if (!this.location.label) {
        return;
      }

      this.$router.push({
        name: 'search',
        query: {
          ...this.location,
          start: this.range.start.getTime() / 1000,
          end: this.range.start.getTime() / 1000,
        },
      });
    },
    changed(event) {
      const place = event.detail;
      if (!place.geometry) return;

      this.location.lat = place.geometry.location.lat();
      this.location.lng = place.geometry.location.lng();
      this.location.label = this.$refs.citySearch.value;
    }
  }
};
</script>

<style scoped>

</style>
