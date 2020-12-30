<template>
  <div id="app" @drop="onDrop" @dragenter="onDragEnter" @dragleave="onDragLeave" @dragover.prevent>
    <div id="drop-bg" v-show="isDropActive"></div>
    <Viewer ref="viewer"/>
    <VersionInfo/>
  </div>
</template>

<script>
import Viewer from './components/Viewer.vue'
import VersionInfo from './components/VersionInfo.vue'

export default {
  name: 'App',
  data() {
    return {
      'isDropActive': false
    }
  },
  components: {
    VersionInfo,
    Viewer
  },
  methods: {
    onDrop(e) {
      e.preventDefault();
      this.isDropActive = false;
      this.$refs.viewer.$refs.textureLoader.doLoadTexture(e.dataTransfer.files[0]);
    },
    onDragEnter(e) {
      e.preventDefault();
      this.isDropActive = true;
    },
    onDragLeave(e) {
      e.preventDefault();
      this.isDropActive = false;
    }
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
  background: #adadad;
}

#drop-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 2;
  pointer-events: none;
}

#app {
  overflow: hidden;
}
</style>