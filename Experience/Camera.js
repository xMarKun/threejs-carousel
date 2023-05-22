import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Experience from './Experience';

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.createPerspectiveCamera();
    this.createOrthographicCamera();
    this.setOrbitControls();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspect, 0.1, 1000);
    this.scene.add(this.perspectiveCamera);
    // デフォルトのカメラ位置 console.logで.positionを表示させると現在位置がわかる
    this.perspectiveCamera.position.x = 21;
    this.perspectiveCamera.position.y = 0;
    this.perspectiveCamera.position.z = 5;
  }

  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera((-this.sizes.aspect * this.sizes.frustum) / 2, (this.sizes.aspect * this.sizes.frustum) / 2, this.sizes.frustum / 2, -this.sizes.frustum / 2, -20, 20);

    this.orthographicCamera.position.y = 3;
    this.orthographicCamera.position.z = 5;
    this.orthographicCamera.rotation.x = -Math.PI / 6;

    this.scene.add(this.orthographicCamera);

    // this.helper = new THREE.CameraHelper(this.orthographicCamera);
    // this.scene.add(this.helper);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.orthographicCamera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = true;
  }

  resize() {
    // Updating Perspective Camera on Resize
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    // Updating Orthographic Camera on Resize
    this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustum) / 2;
    this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustum) / 2;
    this.orthographicCamera.top = this.sizes.frustum / 2;
    this.orthographicCamera.bottom = -this.sizes.frustum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }

  update() {
    this.controls.update();

    // this.helper.matrixWorldNeedsUpdate = true;
    // this.helper.update();
    // this.helper.position.copy(this.orthographicCamera.position);
    // this.helper.rotation.copy(this.orthographicCamera.rotation);
  }
}
