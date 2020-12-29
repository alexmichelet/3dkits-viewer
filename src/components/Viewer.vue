<template>
  <div>
    <TextureLoader @updateTexture="updateTexture"/>
    <ConfigurationSetter ref="configuration" @updateConfiguration="updateTexture"/>
    <div id="three-scene-canvas"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader';
import TextureLoader from './TextureLoader.vue'
import ConfigurationSetter from "@/components/ConfigurationSetter";

export default {
  name: 'Viewer',
  components: {
    TextureLoader,
    ConfigurationSetter
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
    this.loadingManager = new THREE.LoadingManager(() => {}, this.updateRender);
    this.loadingManager.setURLModifier((url) => {
      let prefix;
      if (url.startsWith('model/')) {
        prefix = 'model/'
      } else {
        prefix = '/model/';
      }
      const urlData = url.split(prefix);
      const baseUrl = urlData[0];
      const fileUrl = urlData[1];
      if (fileUrl.indexOf('$TEXTURE$') !== -1) {
        if (this.currentTextureUrl === null) {
          const fmVersion =  fileUrl.substr(0, 4);
          return baseUrl + prefix + fmVersion + '/textures/default.png';
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
    updateRender() {
      this.renderer.render(this.scene, this.camera);
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

      // Renderer
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance"
      })
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.setSize(this.sceneCanvas.offsetWidth, this.sceneCanvas.offsetHeight);
      this.renderer.setClearColor("#adadad");
      this.sceneCanvas.append(this.renderer.domElement);

      // Controls
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.addEventListener('change', this.updateRender);

      // Grid
      const gridHelper = new THREE.GridHelper(100, 100);
      this.scene.add(gridHelper);

      // Lighting
      let ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      this.scene.add(ambientLight);

      let light = new THREE.PointLight(0xffffff, 0.4, 100)
      light.position.set(0, 5, -2)
      light.castShadow = true
      light.shadow.radius = 1
      light.shadow.mapSize.width = 2048
      light.shadow.mapSize.height = 2048
      this.scene.add(light);
    },
    updateTexture(newTextureUrl = null) {
      let modelName = this.$refs.configuration.modelName;

      if (newTextureUrl !== null) {
        this.currentTextureUrl = newTextureUrl;
      }

      let loader = new MTLLoader(this.loadingManager);
      loader.load(
          this.publicPath + 'model/' + modelName + '.mtl',
          (materials) => {
            materials.preload();
            this.loadModel(materials, modelName);
          });
    },
    loadModel(materials, modelName) {
      this.scene.remove(this.model);

      new OBJLoader()
          .setMaterials(materials)
          .load(this.publicPath + 'model/' + modelName + '.obj',
              (object) => {
                this.model = object;
                this.scene.add(this.model);
                this.initNewKitView();
              }
          );
    },
    initNewKitView() {
      this.camera.position.set(0, 1.6, -3);
      this.controls.target.set(0, 1.1, 0);
      this.controls.update();
      this.updateRender();
    }
  }
}
</script>

<style>
#three-scene-canvas {
  width: 100%;
  height: 100vh;
}
</style>
