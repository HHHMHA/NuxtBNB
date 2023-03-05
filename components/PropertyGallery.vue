<template>
 <div class="app-section">
   <div class="app-wrapper">
     <div class="app-masonry">
       <div v-for="publicId in images"
            :key="publicId"
            :style="`background-image: url(${getImageUrl(publicId)})`"
       >
       </div>
     </div>
   </div>
 </div>
</template>

<script>
export default {
  name: "PropertyGallery",
  props: {
    images: {
      type: Array,
      required: true,
    }
  },
  methods: {
    getImageUrl(publicId) {
      return this.$img(publicId, {
        width: 600,
      }, {
        provider: "cloudinary",
      });
    },
  }
};
</script>

<style scoped>

</style>
