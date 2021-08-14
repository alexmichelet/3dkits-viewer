<template>
  <div id="app" @drop="onDrop" @dragenter="onDragEnter" @dragleave="onDragLeave" @dragover.prevent>
    <div id="drop-bg" v-show="isDropActive">
      <div id="drop-bg-wrapper">
        <div id="drop-bg-text">
          Drag and drop .PNG file
        </div>
      </div>
    </div>
    <Viewer ref="viewer"/>
    <VersionInfo/>
    <HelpWidget/>
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
  font-family: 'PT Serif', serif;
  overflow: hidden;
}

#drop-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #21283c80;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 2;
  pointer-events: none;
}

#drop-bg-wrapper{
  width: calc(100% - 46px);
  height: calc(100% - 46px);
  margin: 20px;
  border: 3px dashed #ffffff38;
  border-radius: 12px;
  position: relative;
}

#drop-bg-text{
  display: inline-block;
    position: absolute;
    height: 40px;
    width: 100%;
    top: 50%;
    margin-top: -20px;
    text-align: center;
    font-size: 36px;
    color: white;
}

#app {
  overflow: hidden;
}
</style>