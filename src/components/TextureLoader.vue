<template>
  <div id="texture-loader">
    <input ref="input" type="file" @change="loadTexture">
  </div>
</template>

<script>
import * as blobUtil from 'blob-util'

export default {
  name: 'TextureLoader',
  data() {
    return {
      canvas: document.createElement('canvas'),
      currentTextureData: null
    }
  },
  created() {
    this.$bus.on('updated-configuration', (data) => {
      if (data.textureRefresh) {
        this.refreshTexture();
      }
    });
  },
  mounted() {
    this.canvas.width = 1024;
    this.canvas.height = 1024;
  },
  methods: {
    refreshTexture() {
      this.drawTexture(this.currentTextureData);
    },
    loadTexture(event) {
      this.doLoadTexture(event.target.files[0]);
    },
    doLoadTexture(file) {
      let reader = new FileReader();
      reader.onloadend = (e) => {
        this.drawTexture(e.target.result);
      };
      reader.readAsDataURL(file);
      this.$refs.input.value = '';
    },
    drawTexture(fileData) {
      this.currentTextureData = fileData;

      let context = this.canvas.getContext('2d');

      let image = new Image();
      image.onload = () => {
        // draw flipped image
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.scale(1, -1)
        context.drawImage(image, 0, -1024);

        if (this.$root.$children[0].$refs.viewer.$refs.configuration.numbersOverlay) {
          let numbersOverlay = new Image();
          numbersOverlay.onload = () => {
            context.drawImage(numbersOverlay, 0, -1024);
            context.resetTransform();
            this.computeBlobUrl();
          }
          const fm = this.$root.$children[0].$refs.viewer.$refs.configuration.fm;
          numbersOverlay.src = 'model/fm' + fm + '/numbers.png';
        } else {
          context.resetTransform();
          this.computeBlobUrl();
        }
      }
      image.src = fileData;
    },
    computeBlobUrl() {
      let blob = blobUtil.dataURLToBlob(this.canvas.toDataURL());
      this.$bus.emit('loaded-texture', { textureUrl: URL.createObjectURL(blob) });
    }
  }
}
</script>

<style>
#texture-loader {
  height: 30px;
  line-height: 30px;
  position: absolute;
  top: 0;
  width: 100%;
  text-align: center;
  z-index: 1;
}
</style>
