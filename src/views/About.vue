<template>
  <div class="about">
    <h1 @click="doAna">This is an about page</h1>
  </div>
</template>

<script>
export default {
  methods: {
    doAna(event) {
      this.$ga.event('category', 'click about', 'label', 123)
    }
  }
}
</script>
