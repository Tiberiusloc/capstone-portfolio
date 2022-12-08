import Experience from "../Experience.js";
import * as THREE from "three";
import GSAP from "gsap";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;

    this.progress = 0;
    this.dummyCurve = new THREE.Vector3(0, 0, 0);

  }

  resize() {
    
  }
  
  //To Update scene
  update(){

  }
}