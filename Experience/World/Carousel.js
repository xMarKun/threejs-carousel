import * as THREE from 'three';
import { gsap } from 'gsap';

import Experience from '../Experience';

export default class Carousel {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.textures = this.experience.resources.items;

    this.setCarousel();
    this.onWheel();
  }

  setCarousel() {
    this.carousel = {};

    this.carousel.options = {};
    this.carousel.options.cardCount = Object.keys(this.textures).length;
    this.carousel.options.cardWidth = 1.266;
    this.carousel.options.cardHeight = 1.875;
    this.carousel.options.radius = 20; // 円の半径

    this.carousel.group = new THREE.Group();

    this.carousel.geometry = new THREE.PlaneGeometry(this.carousel.options.cardWidth, this.carousel.options.cardHeight);

    for (let i = 0; i < this.carousel.options.cardCount; i++) {
      const material = new THREE.MeshBasicMaterial();
      material.map = this.textures[`img_${('00' + (i + 1)).slice(-2)}`];

      const mesh = new THREE.Mesh(this.carousel.geometry, material);

      // 円周上に配置
      const angle = (i / this.carousel.options.cardCount) * Math.PI * 2;
      const x = this.carousel.options.radius * Math.cos(angle); // X座標を計算
      const z = -this.carousel.options.radius * Math.sin(angle); // Y座標を計算
      mesh.position.set(x, 0, z);
      mesh.name = `card_${('00' + (i + 1)).slice(-2)}`;

      this.carousel.group.add(mesh);
    }

    this.scene.add(this.carousel.group);
  }

  onWheel() {
    this.wheel = {};

    this.wheel.lerp = {};
    this.wheel.lerp.current = 0;
    this.wheel.lerp.target = 0;
    this.wheel.lerp.ease = 0.05;

    window.addEventListener('wheel', (e) => {
      if (e.deltaY > 0) {
        this.wheel.lerp.target += 0.01;
      } else {
        this.wheel.lerp.target -= 0.01;
      }
    });
  }

  resize() {}

  update() {
    // mouseWheel
    this.wheel.lerp.current = gsap.utils.interpolate(this.wheel.lerp.current, this.wheel.lerp.target, this.wheel.lerp.ease);
    this.carousel.group.rotation.y = this.wheel.lerp.current;
    // Face the mesh to the camera
    for (let i = 0; i < this.carousel.group.children.length; i++) {
      const child = this.carousel.group.children[i];
      child.lookAt(new THREE.Vector3(20, 0, 40));
      // メッシュのx座標が19.5より上の場合、メッシュ(i)に適した要素を表示
      const meshPosition = child.position.clone();
      meshPosition.applyMatrix4(this.carousel.group.matrixWorld);
      if (meshPosition.x > 19.5) {
        document.querySelector('.lcl-main-hero--active')?.classList.remove('lcl-main-hero--active');
        document.querySelector(`.lcl-main-hero:nth-child(${i + 1})`)?.classList.add('lcl-main-hero--active');
      }
    }
  }
}
