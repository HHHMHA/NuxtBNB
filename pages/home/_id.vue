<template>
  <div class="app-container">
    <PropertyGallery :images="home.images"></PropertyGallery>
    <PropertyDetails :home="home"></PropertyDetails>
    <PropertyDescription :home="home"></PropertyDescription>
    <PropertyMap :home="home"></PropertyMap>
    <PropertyReviews :reviews="reviews"></PropertyReviews>
    <PropertyHost :user="user"></PropertyHost>
    <script type="application/ld+json" v-html="getSchema"></script>
  </div>
</template>

<script>
import shortDate from "@/utils/shortDate";

export default {
  name: "_id",
  head() {
    return {
      title: this.home.title,
      meta: [
        {
          hid: 'og-type',
          property: 'og:type',
          content: 'website',
        },
        {
          hid: 'og-title',
          'property': 'og:title',
          content: this.home.title,
        },
        {
          hid: 'og-desc',
          'property': 'og:description',
          content: this.home.description,
        },
        {
          hid: 'og-image',
          'property': 'og:image',
          content: this.$img(this.home.images[0], {width: 1200}, {provider: 'cloudinary'}),
        },
        {
          hid: 'og-url',
          'property': 'og:url',
          content: `${this.$config.rootUrl}/home/${this.home.objectID}`,
        },
      ],
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
  computed: {
    getSchema() {
      return JSON.stringify({
        "@conext": "http://schema.org",
        "@type": "BedAndBreakfast",
        "name": this.home.title,
        "image": this.$img(this.home.images[0], {width: 1200}, {provider: 'cloudinary'}),
        "address": {
          "@type": "PostalAddress",
          "addressLocality": this.home.location.city,
          "addressRegion": this.home.location.state,
          "postalCode": this.home.location.zipcode,
          "streetAddress": this.home.location.address,
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": this.home.reviewValue,
          "reviewCount": this.home.reviewCount,
        },
      });
    },
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
