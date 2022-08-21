<template>
<div style="text-align: center">
  <h1>Error!</h1>
  {{ error.message }} {{ error.statusCode }}
</div>
</template>

<script>
export default {
  name: "error",
  head() {
    return {
      title: 'Big Problems'
    };
  },
  props: {
    error: {
      type: Object,
      required: true,
    }
  }
};
</script>

<style scoped>

</style>
