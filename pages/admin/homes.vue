<template>
  <div>
    [LIST OF HOMES HERE]
    <h2 class="text-xl bold">
      Add a Home
    </h2>
    <form action="" class="form" @submit.prevent="onSubmit">
      Images: <br/>
      <input type="text" v-model="home.images[0]" class="w-3/4"><br/>
      <input type="text" v-model="home.images[1]" class="w-3/4"><br/>
      <input type="text" v-model="home.images[2]" class="w-3/4"><br/>
      <input type="text" v-model="home.images[3]" class="w-3/4"><br/>
      <input type="text" v-model="home.images[4]" class="w-3/4"><br/>

      Title: <br/>
      <input type="text" v-model="home.title" class="w-60"><br/>
      Description: <br/>
      <textarea v-model="home.description" class="w-104"></textarea>
      Note: <br/>
      <textarea v-model="home.note" class="w-104"></textarea>
      Features<br/>
      <input type="text" v-model="home.features[0]" class="w-26">
      <input type="text" v-model="home.features[1]" class="w-26">
      <input type="text" v-model="home.features[2]" class="w-26">
      <input type="text" v-model="home.features[3]" class="w-26">
      <input type="text" v-model="home.features[4]" class="w-26"><br/>
      Price Per Night<br/>
      <input type="number" v-model="home.pricePerNight" class="w-14"><br/>
      Guests / Rooms / Beds / Bathrooms<br/>
      <input type="number" v-model="home.guests" class="w-14"><br/>
      <input type="number" v-model="home.bedrooms" class="w-14"><br/>
      <input type="number" v-model="home.beds" class="w-14"><br/>
      <input type="number" v-model="home.bathrooms" class="w-14"><br/>
      Address: <input type="text" v-model="home.location.address" class="w-60"><br/>
      City: <input type="text" v-model="home.location.city" class="w-26"><br/>
      State: <input type="text" v-model="home.location.state" class="w-26"><br/>
      Postal Code: <input type="text" v-model="home.location.postalCode" class="w-26"><br/>
      Country: <input type="text" v-model="home.location.country" class="w-26"><br/>
      <button class="border px-4 py-2 border-gray-400"></button>
    </form>
  </div>
</template>

<script>
export default {
  name: "homes",
  data() {
    return {
      home: {
        title: '',
        description: '',
        note: '',
        pricePerNight: '',
        guests: '',
        beds: '',
        bedrooms: '',
        bathrooms: '',
        features: ['', '', '', '', ''],
        location: {
          address: '',
          city: '',
          state: '',
          postalCode: '',
          country: '',
        },
        _geoloc: {
          lat: 26.1,
          lng: 26.1,
        },
        images: [],
      },
    };
  },
  methods: {
    async onSubmit() {
      await fetch('/api/homes', {
        method: 'POST',
        body: JSON.stringify(this.home),
        headers: {
          'Content-Type': 'application/json',
        }
      })
    },
  },
};
</script>

<style scoped>
  .form input,
  .form textarea {
    @apply p-1 m-1 bg-gray-200;
  }
</style>