import EventEmitter from "events";
import Experience from "./Experience";
import GSAP from "gsap";

export default class Preloader extends EventEmitter{
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.world = this.experience.world;
    this.device = this.sizes.device;

    this.sizes.on("switchdevice", (device) => {
      this.device = device;
    })

    this.world.on("worldready", () => {
      this.setAssets();
      this.playIntro();
    });
  }

  setAssets() {
    this.room = this.experience.world.room.actualRoom;
    this.roomChildren = this.experience.world.room.roomChildren;
    console.log(this.roomChildren);
  }

  firstIntro() {

    return new Promise ((resolve) => {       
      this.timeline = new GSAP.timeline();
      
      if(this.device === "desktop") {
        this.timeline.to(this.roomChildren.cube.scale, {
          x: 2,
          y: 2,
          z: 2,
          ease: "back.out(.2)",
          duration: 0.7,
        }).to(this.room.position, {
          x: 0,
          y: 0,
          z: 0,
          ease: "power1.out",
          duration: 0.7,
          onComplete: resolve,
        }, "same")
      } else {
        this.timeline.to(this.roomChildren.cube.scale, {
          x: 2,
          y: 2,
          z: 2,
          ease: "back.out(.01)",
        }, "same")
        .to(this.room.position, {
          z: -.4,
          x: 0,
          y: 0,
          ease: "power1.out",
          duration: 1,
          onComplete: resolve,
        })
      }
    })
  }
  
  secondIntro() {
    
    return new Promise ((resolve) => {
      this.secondTimeline = new GSAP.timeline();
      
      if(this.device === "desktop") {
        this.secondTimeline.to(this.room.position, {
          x: 1,
          y: 0,
          z: 0,
          ease: 0.5,

        }).to(this.roomChildren.cube.rotation.y, { 
           y: 2 * Math.PI + Math.PI / 4,

        }, "same").to(this.roomChildren.cube.scale, {
          x: 10,
          y: 10,
          z: 10,
          ease: 0.5,

        }, "same").to(this.roomChildren.cube.position, {
            y: 28,
            x: 61.8,
            z: 65,
            ease: 0.5,

        }, "same")
      } else {
        this.secondTimeline.to(this.room.position, {
          x: 0,
          y: 0,
          z: 0,
          ease: "power1.out",

        });
      }
    });
  }

  onScroll(e) {
    if(e.deltaY > 0){
      console.log("asdf")
      window.removeEventListener("wheel", this.scrollOnceEvent)
      this.secondIntro();
    }
  } 

  async playIntro() {
    await this.firstIntro();
    this.scrollOnceEvent = this.onScroll.bind(this)
    window.addEventListener("wheel", this.scrollOnceEvent)
  }

  async playSecondIntro() {
    await this.secondIntro(); 
  }
}