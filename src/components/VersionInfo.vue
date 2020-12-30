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
#version-info {
  position: absolute;
  top: 2px;
  left: 2px;
  color: rgba(255, 255, 255, 0.8);
  z-index: 1;
}
</style>