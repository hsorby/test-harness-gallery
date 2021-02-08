<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <gallery />
  </div>
</template>
<script>
import Gallery from 'gallery'

export default {
  name: 'App',
  components: {
    Gallery,
  },
}
</script>
