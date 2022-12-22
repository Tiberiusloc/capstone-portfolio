import Experience from "../Experience.js";
import * as THREE from "three";
import GSAP from "gsap";
import  { ScrollTrigger }  from "gsap/ScrollTrigger";
import ASScroll from "@ashthornton/asscroll";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.room = this.experience.world.room.actualRoom;

    this.circleFirst = this.experience.world.floor.circleFirst;
    this.circleSecond = this.experience.world.floor.circleSecond;
    this.circleThird = this.experience.world.floor.circleThird;

    GSAP.registerPlugin(ScrollTrigger);

    document.querySelector(".page").style.overflow = "visible";

    this.setSmoothScroll();
    this.setScrollTrigger();
  }

  setupASScroll() {
    // https://github.com/ashthornton/asscroll
    const asscroll = new ASScroll({
      disableRaf: true });
  
  
    GSAP.ticker.add(asscroll.update);
  
    ScrollTrigger.defaults({
      scroller: asscroll.containerElement });
  
  
    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        if (arguments.length) {
          asscroll.currentPos = value;
          return;
        }
        return asscroll.currentPos;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      fixedMarkers: true });
  
  
    asscroll.on("update", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", asscroll.resize);
  
    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]") });
  
    });
    return asscroll;
  }

  setSmoothScroll() {
    this.asscroll = this.setupASScroll();
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
          return this.sizes.width * 0.00047;
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
          return this.sizes.height * 0.002;
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
              return 2.4;
            },
            z: () => {
              return this.sizes.height * 0.0040;
            },
          },
          "same"
          )
          this.secondMoveTimeline.to(this.room.scale, {
            x: 0.60,
            y: 0.60,
            z: 0.60,
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

        this.sections = document.querySelectorAll(".section");
        this.sections.forEach((section) => {
          this.progressWrapper = section.querySelector(".progress-wrapper");
          this.progressBar = section.querySelector(".progress-bar");

          if (section.classList.contains("right")){
            
            GSAP.to(section, {
              borderTopLeftRadius: 10,
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top top",
                scrub: 1,
              }
            });
            GSAP.to(section, {
              borderBottomLeftRadius: 700,
              scrollTrigger: {
                trigger: section,
                start: "bottom bottom",
                end: "bottom top",
                scrub: 1,
              }
            });
            } else {
              GSAP.to(section, {
                borderTopRightRadius: 10,
                scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "top top",
                  scrub: 1,
                }
              });
              GSAP.to(section, {
                borderBottomRightRadius: 700,
                scrollTrigger: {
                  trigger: section,
                  start: "bottom bottom",
                  end: "bottom top",
                  scrub: 1,
                }
              });
            }
            GSAP.from(this.progressBar, {
              scaleY: 0,
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.2,
                pin: this.progressWrapper,
                pinSpacing: false,
              }
            });
          });

        //Animations
        // First section -----------------------------------------
          this.firstCircle = new GSAP.timeline({
              scrollTrigger: {
                  trigger: ".first-move",
                  start: "top top",
                  end: "bottom bottom",
                  scrub: 0.6,
              },
          }).to(this.circleFirst.scale, {
              x: 3,
              y: 3,
              z: 3,
          });

          // Second section -----------------------------------------
          this.secondCircle = new GSAP.timeline({
              scrollTrigger: {
                  trigger: ".second-move",
                  start: "top top",
                  end: "bottom bottom",
                  scrub: 0.6,
              },
          })
              .to(
                  this.circleSecond.scale,
                  {
                      x: 3,
                      y: 3,
                      z: 3,
                  },
                  "same"
              )
              .to(
                  this.room.position,
                  {
                      y: 0.7,
                  },
                  "same"
              );

          // Third section -----------------------------------------
          this.thirdCircle = new GSAP.timeline({
              scrollTrigger: {
                  trigger: ".third-move",
                  start: "top top",
                  end: "bottom bottom",
                  scrub: 0.6,
              },
          }).to(this.circleThird.scale, {
              x: 3,
              y: 3,
              z: 3,
          });

          this.secondPartTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".third-move",
              start: "center center",
            },
          });
            
          this.room.children.forEach((child) => {
            if(child.name === "MiniFloor"){
              this.first = GSAP.to(child.position, {
                x: -3.34083,
                z: 5.49011,
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