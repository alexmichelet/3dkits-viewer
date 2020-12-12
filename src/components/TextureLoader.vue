<template>
  <div id="texture-loader">
    <input type="file" @change="loadTexture">
  </div>
</template>

<script>
import * as blobUtil from 'blob-util'

export default {
  name: 'TextureLoader',
  data() {
    return {
      'canvas': document.createElement('canvas'),
    }
  },
  mounted() {
    this.canvas.width = 1024;
    this.canvas.height = 1024;
  },
  methods: {
    loadTexture(event) {
      let reader = new FileReader();
      reader.onloadend = (e) => {
        this.drawTexture(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    },
    drawTexture(file) {
      let context = this.canvas.getContext('2d');

      let image = new Image();
      image.onload = () => {
        // draw flipped image
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.scale(1, -1)
        context.drawImage(image, 0, -1024);
        context.resetTransform();

        this.computeBlobUrl();
      }
      image.src = file;
    },
    computeBlobUrl() {
      let blob = blobUtil.dataURLToBlob(this.canvas.toDataURL());
      this.$emit('updateTexture', URL.createObjectURL(blob));
    }
  }
}
</script>

<style>
#texture-loader {
  height: 50px;
  line-height: 50px;
  background: #adadad;
}
</style>
