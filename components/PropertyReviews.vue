<template>
 <div class="app-padded-vertical">
   <div class="app-wrapper">
     <div class="app-testimonials">
       <div v-for="(review, index) in reviews"
            :key="index"
       >
         <div class="app-testimonial-header">
           <div><img :src="review.reviewer.image" alt=""></div>
           <div>
             <p class="app-testimonial-name">{{ review.reviewer.name }}</p>
             <p class="app-testimonial-date">
               {{ shortDate(review.date) }}
             </p>
           </div>
         </div>
         <div class="app-testimonial-body">
           <short-text :text="review.comment" :target="150"></short-text>
         </div>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
import shortDate from "@/utils/shortDate";

export default {
  name: "PropertyReviews",
  props: {
    reviews: {
      type: Object,
      required: true,
    },
  },
  methods: {
    shortDate,
  }
};
</script>

<style scoped>

</style>
