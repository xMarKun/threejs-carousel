import * as THREE from 'three';
import GUI from 'lil-gui';
import Stats from 'stats.js';

import Experience from '../Experience';

export default class Debug {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.renderer = this.experience.renderer;
    this.gui = new GUI();

    this.params = { clearColor: 0x07001f, gridHelper: false, axesHelper: false };

    this.setToneMappingDebug();
    this.setExposureDebug();
    this.setClearColorDebug();
    this.setGridHelper();
    this.setAxesHelper();
    this.setStats();
  }

  setToneMappingDebug() {
    const toneMappingOptions = {
      None: THREE.NoToneMapping,
      Linear: THREE.LinearToneMapping,
      Reinhard: THREE.ReinhardToneMapping,
      Cineon: THREE.CineonToneMapping,
      ACESFilmic: THREE.ACESFilmicToneMapping,
      Custom: THREE.CustomToneMapping,
    };
    this.gui.add(this.renderer.renderer, 'toneMapping', toneMappingOptions);
  }

  setExposureDebug() {
    this.gui.add(this.renderer.renderer, 'toneMappingExposure', 0, 2);
  }

  setClearColorDebug() {
    this.gui.addColor(this.params, 'clearColor').onChange(() => {
      this.renderer.renderer.setClearColor(this.params.clearColor);
    });
  }

  setGridHelper() {
    const size = 20;
    const divisions = 20;
    let gridHelper = null;
    this.gui.add(this.params, 'gridHelper').onChange(() => {
      if (this.params.gridHelper && gridHelper === null) {
        gridHelper = new THREE.GridHelper(size, divisions);
        this.scene.add(gridHelper);
      } else {
        this.scene.remove(gridHelper);
        gridHelper.dispose();
        gridHelper = null;
      }
    });
  }

  setAxesHelper() {
    let axesHelper = null;
    this.gui.add(this.params, 'axesHelper').onChange(() => {
      if (this.params.axesHelper && axesHelper === null) {
        axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);
      } else {
        this.scene.remove(axesHelper);
        axesHelper.dispose();
        axesHelper = null;
      }
    });
  }

  setStats() {
    this.stats = new Stats();
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);
  }
}
