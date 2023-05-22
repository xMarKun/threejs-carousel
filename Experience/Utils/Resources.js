import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { EventEmitter } from 'events';

import Experience from '../Experience';

export default class Resources extends EventEmitter {
  constructor(assets) {
    super();
    this.experience = new Experience();

    this.assets = assets;

    this.items = {};
    this.queue = this.assets.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    // this.loaders.gltfLoader = new GLTFLoader();
    // this.loaders.dracoLoader = new DRACOLoader();
    // this.loaders.dracoLoader.setDecoderPath('/draco/');
    // this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
    this.loaders.textureLoader = new THREE.TextureLoader();
  }

  startLoading() {
    for (const asset of this.assets) {
      // glbModel
      // if (asset.type === 'glbModel') {
      //   this.loaders.gltfLoader.load(asset.path, (file) => {
      //     this.singleAssetLoaded(asset, file);
      //   });
      // }
      // texture
      if (asset.type === 'texture') {
        this.loaders.textureLoader.load(asset.path, (texture) => {
          // texture.flipY = false;
          texture.colorSpace = THREE.SRGBColorSpace;
          this.singleAssetLoaded(asset, texture);
        });
      }
      // videoTexture
      // if (asset.type === 'videoTexture') {
      //   this.video = {};
      //   this.videoTexture = {};

      //   this.video[asset.name] = document.createElement('video');
      //   this.video[asset.name].src = asset.path;
      //   this.video[asset.name].muted = true;
      //   this.video[asset.name].playsInline = true;
      //   this.video[asset.name].autoplay = true;
      //   this.video[asset.name].loop = true;
      //   this.video[asset.name].play();

      //   this.videoTexture[asset.name] = new THREE.VideoTexture(this.video[asset.name]);
      //   this.videoTexture[asset.name].flipY = false;
      //   this.videoTexture[asset.name].minFilter = THREE.NearestFilter;
      //   this.videoTexture[asset.name].magFilter = THREE.NearestFilter;
      //   this.videoTexture[asset.name].generateMipmaps = false;
      //   this.videoTexture[asset.name].colorSpace = THREE.SRGBColorSpace;

      //   this.singleAssetLoaded(asset, this.videoTexture[asset.name]);
      // }
    }
  }

  singleAssetLoaded(asset, file) {
    this.items[asset.name] = file;
    this.loaded++;

    if (this.loaded === this.queue) {
      this.emit('ready');
    }
  }
}
