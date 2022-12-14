import Experience from "../Experience.js";
import * as THREE from "three";
import GSAP from "gsap";

export default class Room{
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.07,
    };

    this.setModel();
    this.onMouseMove();

  }

  setModel() {
this.actualRoom.children.forEach(child => {
  child.castShadow = true;
  child.receiveShadow = true;

  
  if (child instanceof THREE.Group) {
    child.children.forEach((groupchild) => {
      groupchild.castShadow = true;
      groupchild.receiveShadow = true;
    });
  }
  
  if(child.name === "Computer"){
    child.children[1].material = new THREE.MeshBasicMaterial({
      map: this.resources.items.screen,
    });
  }

  if(child.name === "MiniFloor") {
    child.position.x = 5.19495;
    child.position.z = -2.8068;
  }

  if ( 
    child.name === "Mailbox" ||
    child.name === "FloorFirst" ||
    child.name === "FloorSecond" ||
    child.name === "FloorThird" ||
    child.name === "Lamp") {
    child.scale.set(0, 0, 0);
  }

});

    this.scene.add(this.actualRoom);
    this.actualRoom.scale.set(0.11, 0.11, 0.11)
  }

  setRenderer(){
    
  }

  onMouseMove(){
    window.addEventListener("mousemove", (event) => {
      this.rotation = (event.clientX - window.innerWidth / 2) * 2 / window.innerWidth;
      this.lerp.target = this.rotation * 0.1;
    });
  }


  resize() {
    
  }
  
  //To Update scene
  update(){
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.actualRoom.rotation.y = this.lerp.current;

  }
}