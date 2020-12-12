<template>
  <div>
    <TextureLoader @updateTexture="updateTexture"/>
    <div id="three-scene-canvas"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader";
import TextureLoader from './TextureLoader.vue'

export default {
  name: 'Viewer',
  components: {
    TextureLoader
  },
  data() {
    return {
      sceneCanvas: null,
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      publicPath: process.env.BASE_URL,
      model: null,
      currentTextureUrl: null,
      loadingManager: null,
    }
  },
  mounted() {
    // Custom loading manager to interpolate dynamic textures
    this.loadingManager = new THREE.LoadingManager();
    this.loadingManager.setURLModifier((url) => {
      const urlData = url.split('/model/');
      const baseUrl = urlData[0];
      const fileUrl = urlData[1];
      if (fileUrl === '$TEXTURE$') {
        if (this.currentTextureUrl === null) {
          return baseUrl + '/model/textures/default.png';
        } else {
          return this.currentTextureUrl;
        }
      } else {
        return url;
      }
    });

    // Init and load default texture
    this.initScene();
    this.updateTexture();
  },
  methods: {
    animateThreeJs() {
      this.renderer.render(this.scene, this.camera);
      this.renderer.shadowMap.needsUpdate = true;
    },
    initScene() {
      // Scene
      this.sceneCanvas = document.getElementById('three-scene-canvas');
      this.scene = new THREE.Scene();

      // Camera
      this.camera = new THREE.PerspectiveCamera(
          40,
          this.sceneCanvas.getBoundingClientRect().width / this.sceneCanvas.getBoundingClientRect().height,
          0.1,
          1000
      );
      this.camera.position.set(0, 1.6, -3);
      // this.camera.lookAt(0, 1.1, 0);

      // Renderer
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance"
      })
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.setSize(this.sceneCanvas.offsetWidth, this.sceneCanvas.offsetHeight);
      this.renderer.setClearColor("#adadad");
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.shadowMapSoft = true;
      this.renderer.shadowMap.autoUpdate = false;
      this.renderer.shadowMap.needsUpdate = true;
      this.sceneCanvas.append(this.renderer.domElement);

      // Controls
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.addEventListener('change', this.animateThreeJs);
      this.controls.target.set(0, 1.1, 0);
      this.controls.update();

      // Grid
      const gridHelper = new THREE.GridHelper(100, 100);
      this.scene.add(gridHelper);

      // Lighting
      let ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      this.scene.add(ambientLight);

      let light = new THREE.PointLight(0xfc831d, 0.4, 100)
      light.position.set(0, 5, -2)
      light.castShadow = true
      light.shadow.radius = 1
      light.shadow.mapSize.width = 2048
      light.shadow.mapSize.height = 2048
      this.scene.add(light);
    },
    updateTexture(newTextureUrl = null) {
      this.currentTextureUrl = newTextureUrl;

      let loader = new MTLLoader(this.loadingManager);
      loader.load(
          this.publicPath + 'model/material.mtl',
          (materials) => {
            materials.preload();
            this.loadModel(materials);
          });
    },
    loadModel(materials) {
      this.scene.remove(this.model);
      new OBJLoader()
          .setMaterials(materials)
          .load(this.publicPath + 'model/model.obj',
              (object) => {
                this.model = object;
                this.scene.add(this.model);
                this.animateThreeJs();
              }
          );
    }
  }
}
</script>

<style>
#three-scene-canvas {
  width: 100%;
  height: calc(100vh - 50px);
}
</style>
