import Experience from "../Experience.js";
import * as THREE from "three";
import GSAP from "gsap";
import  { ScrollTrigger }  from "gsap/ScrollTrigger";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.room = this.experience.world.room.actualRoom;

    GSAP.registerPlugin(ScrollTrigger);

    this.setScrollTrigger();
  }
  

  setScrollTrigger() {

    
    ScrollTrigger.matchMedia({"(min-width: 969px)": () => {

      this.firstMoveTimeline = new GSAP.timeline({
        scrollTrigger: { 
        trigger:".first-move",
        start: "top top",
        bottom: "bottom bottom",
        scrub: 1,
        invalidateOnRefresh: true,
        },
      });
      this.firstMoveTimeline.to(this.room.position, {
        x: () => {
          return this.sizes.width * 0.00055;
        },
      });
      // Second Section
      this.secondMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
        trigger: ".second-move",
        start: "top top",
        bottom: "bottom bottom",
        scrub: 1,
        invalidateOnRefresh: true,
        }
      });
      this.secondMoveTimeline.to(this.room.position, {
        x: () => {
          return 1;
        },
        z: () => {
          return this.sizes.height * 0.0012;
        },
      },
      "same"
      );
      this.secondMoveTimeline.to(this.room.scale, {
        x: 0.45,
        y: 0.45,
        z: 0.45,
      },
      "same"
      );

      
      //Third Section
      this.thirdMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".third-move",
          start: "top top",
          bottom: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
          }).to(this.camera.orthographicCamera.position ,{
            y: 0,
            x: -1.5,
          });
        }
      });
      
        //Mobile Timeline
        ScrollTrigger.matchMedia({"(max-width: 968px)": () => {
          console.log("mobile");
          this.firstMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            bottom: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
            },
          }).to(this.room.scale , {
            x: 0.14,
            y: 0.14,
            z: 0.14,
          });
          // Second Section
          this.secondMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            bottom: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
            },
          })
          this.secondMoveTimeline.to(this.room.position, {
            x: () => {
              return 1.5;
            },
            z: () => {
              return this.sizes.height * 0.0012;
            },
          },
          "same"
          )
          this.secondMoveTimeline.to(this.room.scale, {
            x: 0.45,
            y: 0.45,
            z: 0.45,
          },
          "same"
          )
          
          //Third Section
          this.thirdMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            bottom: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
            },
          }).to(this.camera.orthographicCamera.position ,{
            y: -1,
            x: 0,
          })
          
        },
      });
      
      

      ScrollTrigger.matchMedia({"all": () => {
          this.secondPartTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".third-move",
              start: "center center",
            },
          });
            
          this.room.children.forEach((child) => {
            if(child.name === "MiniFloor"){
              this.first = GSAP.to(child.position, {
                x: 2.4,
                z: 0,
                ease: "back.out(2)",
                duration: 1,
              });
            }
            if (child.name === 'Mailbox') {
              this.second = GSAP.to(child.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2)",
                duration: 0.3,
              });
            }
            if (child.name === 'Lamp') {
              this.third = GSAP.to(child.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2)",
                duration: 0.3,
              });
            }
            if (child.name === 'FloorFirst') {
              this.fourth = GSAP.to(child.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2)",
                duration: 0.3,
              });
            }
            if (child.name === 'FloorSecond') {
              this.fifth = GSAP.to(child.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2)",
                duration: 0.3,
              });
            }
            if (child.name === 'FloorThird') {
              this.sixth = GSAP.to(child.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2)",
                duration: 0.3,
              });
            }
          });
          this.secondPartTimeline.add(this.first);
          this.secondPartTimeline.add(this.second);
          this.secondPartTimeline.add(this.third);
          this.secondPartTimeline.add(this.fourth);
          this.secondPartTimeline.add(this.fifth);
          this.secondPartTimeline.add(this.sixth);

      },
    });
  }
      
      resize() {
        
      }
      
      //To Update scene
      update(){
      }
}