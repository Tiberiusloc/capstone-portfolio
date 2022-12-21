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
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(0.5)",
          duration: 0.7,
        }, "same").to(this.room.position, {
          x: -0.25,
          y: -0.12,
          z: 0.7,
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
        })
        .to(this.room.position, {
          z: 0,
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
      console.log(this.room.position)

        this.secondTimeline.to(this.room.position, {
          x: 0,
          y: 0,
          z: 0,
          ease: 0.5,

        }).to(this.roomChildren.cube.rotation,
          {
          y: 2 * Math.PI + Math.PI / 4,
          },
      ).to(this.roomChildren.cube.scale, {
          x: 16,
          y: 16,
          z: 16,

        }, "same").to(this.roomChildren.cube.position, {
            y: 7,
            x: -0.1,
            z: 0.5

          }, "same").set(this.roomChildren.body.scale, {
              x: 1,
              y: 1,
              z: 1,
          }).to(this.roomChildren.cube.scale, {
              x: 0,
              y: 0,
              z: 0,
          }).to(this.roomChildren.desks.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2.2)",
              duration: 0.5,
          }).to(this.roomChildren.floor_items.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          }).to(this.roomChildren.desk_items.scale, {
            x: -0.0085,
            y: -0.0085,
            z: -0.0085,
            ease: "back.out(2.2)",
            duration: 0.5,
          }).to(this.roomChildren.computer.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          }).to(this.roomChildren.bed.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          }).set(this.roomChildren.minifloor.scale, {
            x: 1,
            y: 1,
            z: 1,
          }).to(this.roomChildren.chair.scale, {
            x: 1,
            y: 1,
            z: 1,
          }, "chair").to(this.roomChildren.chair.rotation, {
            y: 4 * Math.PI + Math.PI / 4,
            ease: "power2.out",
            duration: 1,
            onComplete: resolve,
          }, "chair")
      });
  }

  onScroll(e) {
    if(e.deltaY > 0){
      console.log("asdf")
      this.removeEventListeners();
      this.playSecondIntro();
    }
  } 

  onTouch(e) {
    this.initialY = e.touches[0].clientY;
  }

  onTouchMove(e){
    let currentY = e.touches[0].clientY;
    let difference = this.initialY - currentY;
    if(difference > 0){
      this.removeEventListeners();
      this.playSecondIntro();
    }
    this.initialY = null;
  }

  removeEventListeners(){
    window.removeEventListener("wheel", this.scrollOnceEvent)
    window.removeEventListener("touchstart", this.touchStart)
    window.removeEventListener("touchmove", this.touchMove)
  }

  async playIntro() {
    await this.firstIntro();
    this.moveFlag = true;
    this.scrollOnceEvent = this.onScroll.bind(this)
    this.touchStart = this.onTouch.bind(this);
    this.touchMove = this.onTouchMove.bind(this);
    window.addEventListener("wheel", this.scrollOnceEvent)
    window.addEventListener("touchstart", this.touchStart)
    window.addEventListener("touchmove", this.touchMove)
  }

  async playSecondIntro() {
    this.moveFlag = false;
    this.scaleFlag = true;
    await this.secondIntro();
    this.scaleFlag = false;
    this.emit("enablecontrols") 
  }


  move() {
    if(this.device === "desktop"){
      this.room.position.set(-0.25,-0.12, 0.72);
    } else {
      this.room.position.set(0, 0, 0);
    }
  }

  scale() {
    if(this.device === "desktop"){
      this.room.scale.set(0.11, 0.11, 0.11);
    } else {
      this.room.position.set(0.07, 0.07, 0.07);
    }
  }

  update() {
    if(this.moveFlag){
      this.move();
    }
    if(this.scaleFlag){
      this.scale();
    }
  }
}