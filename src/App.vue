<template>
  <div id="app">
    <Viewer/>
  </div>
</template>

<script>
import Viewer from './components/Viewer.vue'

export default {
  name: 'App',
  components: {
    Viewer
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
  text-align: center;
}
</style>