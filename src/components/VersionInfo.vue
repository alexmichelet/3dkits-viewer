<template>
  <div id="version-info">v{{ version }}</div>
</template>

<script>
export default {
  name: 'VersionInfo',
  data() {
    return {
      'version': process.env.VUE_APP_VERSION
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300&display=swap');

#version-info {
  position: absolute;
  top: 2px;
  left: 2px;
  color: rgba(255, 255, 255, 0.8);
  z-index: 1;
  font-size: 14px;
  font-family: 'Roboto Condensed', sans-serif;
}
</style>