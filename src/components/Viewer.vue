<template>
  <div>
    <button id="config-toggle" onclick="toggleConfig();">
      <div id="toggle-icon"></div>
    </button>
    <div id="scene-config">
      <TextureLoader ref="textureLoader"/>
      <ConfigurationSetter ref="configuration"/>
    </div>
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
  created() {
    this.$bus.on('updated-configuration', (data) => {
      // do not update the texture if it needs to be refreshed, because TextureLoader will do it
      if (!data.textureRefresh) {
        this.updateTexture(null);
      }
    });
    this.$bus.on('loaded-texture', (data) => this.updateTexture(data.textureUrl));
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

      window.addEventListener('resize', () => {
        this.camera.aspect = this.sceneCanvas.getBoundingClientRect().width / this.sceneCanvas.getBoundingClientRect().height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.sceneCanvas.offsetWidth, this.sceneCanvas.offsetHeight);
        this.updateRender();
      });
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

#three-scene-canvas canvas:focus-visible{
  outline: none !important;
}

#scene-config{
  width: 350px;
  position: absolute;
  right: 0;
  top: 0;
  background: #21283cf7;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  border: none;
  border-radius: 0 0 0 10px;
  z-index: 3;
  color: #f1f1f3;
  -webkit-transition: right .3s ease-in-out;
  -moz-transition: right .3s ease-in-out;
  -ms-transition: right .3s ease-in-out;
  -o-transition: right .3s ease-in-out;
  transition: right .3s ease-in-out;
}

#config-toggle{
  position: absolute;
  right: 350px;
  top: 25px;
  background-color: #404b63;
  color: white;
  padding: 7px 5px 7px 7px;
  border: none;
  border-radius: 5px 0 0 5px;
  cursor: pointer;
  -webkit-transition: right .3s ease-in-out;
  -moz-transition: right .3s ease-in-out;
  -ms-transition: right .3s ease-in-out;
  -o-transition: right .3s ease-in-out;
  transition: right .3s ease-in-out;
}

#toggle-icon{
  background-image: url('/chevron-right-solid.svg');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 15px;
  height: 15px;
}

.config-hidden #config-toggle{
  right: 0px !important;
}

.config-hidden #scene-config{
  right: -350px !important;
}

.config-hidden #toggle-icon{
  transform: rotate(180deg);
}
</style>