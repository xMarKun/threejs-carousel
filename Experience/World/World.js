import Experience from '../Experience';
import Carousel from './Carousel';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;

    this.resources.on('ready', () => {
      this.carousel = new Carousel();
    });
  }

  resize() {}

  update() {
    this.carousel && this.carousel.update();
  }
}
