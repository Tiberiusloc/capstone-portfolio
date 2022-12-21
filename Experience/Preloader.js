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

      // this.secondTimeline.to(
    //     this.roomChildren.cube.rotation,
    //     {
    //         y: 2 * Math.PI 
    //     },
    //     "same"
    // )

      if(this.device === "desktop") {
        this.secondTimeline.to(this.room.position, {
          x: 1,
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
            x: .01,
            y: .01,
            z: .01,
          }).to(this.roomChildren.chair.scale, {
            x: 1,
            y: 1,
            z: 1,
          }).to(this.roomChildren.desks.scale, {
            x: 1,
            y: 1,
            z: 1,
          }).to(this.roomChildren.desks.scale, {
            x: 1,
            y: 1,
            z: 1,
          });
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