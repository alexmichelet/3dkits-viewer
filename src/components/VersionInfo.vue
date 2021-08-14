<template>
  <div id="version-info">FM 3D Kits Viewer <div id="version-number">v{{ version }}</div></div>
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
  top: 25px;
  left: 0;
  color: white;
  background: #404b63;
  padding: 5px 7px 5px 12px;
  border-radius: 0 5px 5px 0;
  z-index: 5;
  font-size: 14px;
}

#version-number{
  display: inline;
  opacity: 0.3;
  font-size: 10px;
}
</style>