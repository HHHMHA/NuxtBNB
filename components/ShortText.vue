<template>
<span>{{ displayText }}
  <button class="link" type="button" v-if="isTooLong && !isExpanded" @click="isExpanded = true">read more</button>
  <button class="link" type="button" v-if="isTooLong && isExpanded" @click="isExpanded = false">read less</button>
</span>
</template>

<script>
export default {
  name: "ShortText",
  props: {
    text: {
      required: true,
      type: String,
    },
    target: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      isExpanded: false,
      chunks: [],
    };
  },
  created() {
    this.chunks = this.getChunks();
  },
  computed: {
    isTooLong() {
      return this.chunks.length === 2;
    },
    displayText() {
      if (!this.isTooLong || this.isExpanded) {
        return this.chunks.join(' ');
      }
      return this.chunks[0] + '...';
    },
  },
  methods: {
    getChunks() {
      if (this.text.length <= this.target)
        return [this.text]

      const position = this.text.indexOf(' ', this.target);

      if (position === -1)
        return [this.text];

      return [
        this.text.substring(0, position),
        this.text.substring(position),
      ]
    },
  }
}
</script>

<style scoped>
  .link {
    color: blue;
    background: white;
    border: none;
    text-decoration: underline;
    cursor: pointer;
  }

  .link:focus {
    border: none;
    outline: none;
  }
</style>
