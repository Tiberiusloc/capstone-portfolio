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
    this.scrollers = GSAP.matchMedia();

    this.scrollers.add("(min-width: 969px)", () => {
      this.firstMoveTimeline = new GSAP.timeline({
        scrollTrigger: ".first-move",
          start: "top top",
          bottom: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
      });
      this.firstMoveTimeline.to(this.room.position, {
        x: () => {
          return this.sizes.width * 0.00055;
        },
      });
            // Second Section
          this.secondMoveTimeline = new GSAP.timeline({
            scrollTrigger:".second-move",
              start: "top top",
              bottom: "bottom bottom",
              scrub: 1,
              invalidateOnRefresh: true,
          });
          this.secondMoveTimeline.to(this.room.position, {
            x: () => {
              return 0.7;
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
            scrollTrigger: ".third-move",
              start: "top top",
              bottom: "bottom bottom",
              scrub: 1,
              invalidateOnRefresh: true,
          }).to(this.camera.orthographicCamera.position ,{
            y: 0,
            x: -1.5,
          });
      });
      //Mobile Timeline
      this.scrollers.add("(max-width: 968px)", () => {
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: ".first-move",
            start: "top top",
            bottom: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
        }).to(this.room.scale , {
          x: 0.14,
          y: 0.14,
          z: 0.14,
        });
              // Second Section
            this.secondMoveTimeline = new GSAP.timeline({
              scrollTrigger:".second-move",
                start: "top top",
                bottom: "bottom bottom",
                scrub: 0.6,
                invalidateOnRefresh: true,
            })
            this.secondMoveTimeline.to(this.room.position, {
              x: () => {
                return 1;
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
              scrollTrigger: ".third-move",
                start: "top top",
                bottom: "bottom bottom",
                scrub: 0.6,
                invalidateOnRefresh: true,
            }).to(this.camera.orthographicCamera.position ,{
              y: 0,
              x: -1,
            })
      })
    }

  resize() {
    
  }
  
  //To Update scene
  update(){

  }
}