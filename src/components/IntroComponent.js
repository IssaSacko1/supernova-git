import React, { useEffect } from 'react';
import ImageComponent from './ImageComponent';
import supernovawhite from '../image/Supernova long texte Final B.png';
import supernovastars from '../image/Supernova long texte Final.png';

const IntroComponent = ({ images }) => {

  useEffect(() => {
    const gsap = window.gsap;

    // gsap.registerPlugin(ScrollTrigger);
    const h = window.innerHeight;
    
    let $h2M = gsap.timeline();
    $h2M
      .to('.mn_screen .intro_hold .intro_img07', 1.8, { scale: 1, clipPath: 'inset(0%)', ease: "expo.out" })
      .add('a')
      .to('.mn_screen .intro_hold .intro_img02', 1.8, { scale: 1, clipPath: 'inset(0%)', ease: "expo.out" }, `-=${0.85 * 1.8}`)
      .to('.mn_screen .intro_hold .intro_img05', 1.8, { scale: 1, clipPath: 'inset(0%)', ease: "expo.out" }, `-=${0.85 * 1.8}`)
      .to('.mn_screen .intro_hold .intro_img04', 1.8, { scale: 1, clipPath: 'inset(0%)', ease: "expo.out" }, `-=${0.85 * 1.8}`)
      .to('.mn_screen .intro_hold .intro_img03', 1.8, { scale: 1, clipPath: 'inset(0%)', ease: "expo.out" }, `-=${0.85 * 1.8}`)
      .to('.mn_screen .intro_hold .intro_img01', 1.8, { scale: 1, clipPath: 'inset(0%)', ease: "expo.out" }, `-=${0.85 * 1.8}`)
      .to('.mn_screen .intro_hold .intro_img06', 1.8, { scale: 1, clipPath: 'inset(0%)', ease: "expo.out" }, `-=${0.85 * 1.8}`)
      .to('.intro_hold_h1 .h2g', 1.8, {y: 0, ease: 'expo.out' }, `-=1.9`)
      .to('.ms_txt', 1.8, { autoAlpha: 1, y: 0, ease: 'expo.out' }, 'a+=.7')

      let tlFixFirstScreen = gsap.timeline({
        scrollTrigger: {
          id: "tlFixFirstScreen",
          trigger: '.mn_screen',
          pin: true,
          pinSpacing: true,
          scrub: 1,
          start: `top top`,
          end: `+=${h * 1.25}`,
          //immediateRender: true, 
        }
      });

      let tlFixFirstScreenMove01 = gsap.timeline({
        scrollTrigger: { 
          id: "tlFixFirstScreen",
          trigger: '#mns_id_set1',
          pin: false,
          pinSpacing: false,
          scrub: 3,
          start: `top top`,
          end: `+=${h}`,
          //immediateRender: true, 
        }
      });
      tlFixFirstScreenMove01
        .add('f')
        .to('.intro_img01', 1, {xPercent: -250, yPercent: 220, ease: 'none'}, 'f')
        .to('.ms_txt', .5, {autoAlpha: 0, ease: 'none'}, 'f')

      let tlFixFirstScreenMove01Ops = gsap.timeline({
        scrollTrigger: {
          id: "tlFixFirstScreenMove01Ops",
          trigger: '#mns_id_set1_ops',
          pin: false,
          pinSpacing: false,
          scrub: 3,
          start: `top top`,
          end: `+=50`,
          //immediateRender: true, 
          //markers: true
        }
      });
      tlFixFirstScreenMove01Ops
        .to('.intro_img01', {autoAlpha: 0,  ease: 'none'});


      let tlFixFirstScreenMove02 = gsap.timeline({
        scrollTrigger: { 
          id: "tlFixFirstScreenMove02",
          trigger: '#mns_id_set2',
          pin: false,
          pinSpacing: false,
          scrub: 3,
          start: `top top`,
          end: `+=${h}`,
          //immediateRender: true, 
          //markers: true
        }
      });
      tlFixFirstScreenMove02
        .to('.intro_img02', {xPercent: -180, yPercent: -250, ease: 'none'});
        
      let tlFixFirstScreenMove02Ops = gsap.timeline({
        scrollTrigger: {
          id: "tlFixFirstScreenMove02Ops",
          trigger: '#mns_id_set2_ops',
          pin: false,
          pinSpacing: false,
          scrub: 3,
          start: `top top`,
          end: `+=50`,
          //immediateRender: true, 
          //markers: true
        }
      });
      tlFixFirstScreenMove02Ops
        .to('.intro_img02', {autoAlpha: 0,  ease: 'none'});

      let tlFixFirstScreenMove06 = gsap.timeline({
        scrollTrigger: { 
          id: "tlFixFirstScreenMove06",
          trigger: '#mns_id_set6',
          pin: false,
          pinSpacing: false,
          scrub: 3,
          start: `top top`,
          end: `+=${h}`,
          //immediateRender: true, 
        }
      });
      tlFixFirstScreenMove06
        .to('.intro_img06', {xPercent: 195, yPercent: 235, ease: 'none'});

      let tlFixFirstScreenMove06Ops = gsap.timeline({
        scrollTrigger: {
          id: "tlFixFirstScreenMove06Ops",
          trigger: '#mns_id_set6_ops',
          pin: false,
          pinSpacing: false,
          scrub: 3,
          start: `top top`,
          end: `+=50`,
          //immediateRender: true, 
        }
      });
      tlFixFirstScreenMove06Ops
        .to('.intro_img06', {autoAlpha: 0,  ease: 'none'});

      let tlFixFirstScreenMove05 = gsap.timeline({
      	scrollTrigger: { 
      		id: "tlFixFirstScreenMove05",
      		trigger: '#mns_id_set5',
      		pin: false,
      		pinSpacing: false,
      		scrub: 3,
      		start: `top top`,
      		end: `+=${h}`,
      	}
      });
      tlFixFirstScreenMove05
      	.to('.intro_img05', {xPercent: 165, yPercent: -150, ease: 'none'});	

      let tlFixFirstScreenMove05Ops = gsap.timeline({
      	scrollTrigger: {
      		id: "tlFixFirstScreenMove05Ops",
      		trigger: '#mns_id_set5_ops',
      		pin: false,
      		pinSpacing: false,
      		scrub: 3,
      		start: `top top`,
      		end: `+=50`,
      	}
      });
      tlFixFirstScreenMove05Ops
      	.to('.intro_img05', {autoAlpha: .3,  ease: 'none'});



      let tlFixFirstScreenMove04 = gsap.timeline({
        scrollTrigger: { 
          id: "tlFixFirstScreenMove04",
          trigger: '#mns_id_set4',
          pin: false,
          pinSpacing: false,
          scrub: 3,
          start: `top top`,
          end: `+=${h}`,
          //immediateRender: true, 
        }
      });
      tlFixFirstScreenMove04
        .to('.intro_img04', {xPercent: 50, yPercent: 270, ease: 'none'});	
        
      let tlFixFirstScreenMove04Ops = gsap.timeline({
        scrollTrigger: {
          id: "tlFixFirstScreenMove04Ops",
          trigger: '#mns_id_set4_ops',
          pin: false,
          pinSpacing: false,
          scrub: 3,
          start: `top top`,
          end: `+=50`,
          //immediateRender: true, 
        }
      });
      tlFixFirstScreenMove04Ops
        .to('.intro_img04', {autoAlpha: 0,  ease: 'none'});							


      let tlFixFirstScreenMove07 = gsap.timeline({
        scrollTrigger: { 
          id: "tlFixFirstScreenMove07",
          trigger: '#mns_id_set7',
          pin: false,
          pinSpacing: false,
          scrub: 3,
          start: `top top`,
          end: `+=${h}`,
          //immediateRender: true, 
        }
      });
      tlFixFirstScreenMove07
        .to('.intro_img07', {xPercent: 135, yPercent: -260, ease: 'none'});

      let tlFixFirstScreenMove07Ops = gsap.timeline({
        scrollTrigger: {
          id: "tlFixFirstScreenMove07Ops",
          trigger: '#mns_id_set7_ops',
          pin: false,
          pinSpacing: false,
          scrub: 3,
          start: `top top`,
          end: `+=50`,
          //immediateRender: true, 
        }
      });
      tlFixFirstScreenMove07Ops
        .to('.intro_img07', {autoAlpha: 0,  ease: 'none'});

      let tlFixFirstScreenMove03 = gsap.timeline({
        scrollTrigger: { 
          id: "tlFixFirstScreenMove03",
          trigger: '#mns_id_set3',
          pin: false,
          pinSpacing: false,
          scrub: 3,
          start: `top top`,
          end: `+=${h}`,
          //immediateRender: true, 
        }
      });
      tlFixFirstScreenMove03
        .to('.intro_img03', {xPercent: -120, yPercent: -180, ease: 'none'});	
        
      let tlFixFirstScreenMove03Ops = gsap.timeline({
        scrollTrigger: {
          id: "tlFixFirstScreenMove03Ops",
          trigger: '#mns_id_set3_ops',
          pin: false,
          pinSpacing: false,
          scrub: 3,
          start: `top top`,
          end: `+=50`,
          //immediateRender: true, 
        }
      });
      tlFixFirstScreenMove03Ops
        .to('.intro_img03', {autoAlpha: 0,  ease: 'none'});
        
    tlFixFirstScreen.fromTo('#supernova-white', 
      { autoAlpha: 1 },  // Début : opacité 1
      { 
          autoAlpha: 0,  // Fin : opacité 0
          ease: 'power2.out'
      }
  );

  tlFixFirstScreen.fromTo('#supernova-stars', 
    { autoAlpha: 0 },  // Début : opacité 1
    { 
        autoAlpha: 1,  // Fin : opacité 0
        ease: 'power2.out'
    }
);
        
        
  }, []);

  return (
    <div className='mn_screen'>
      <div className='intro'>
        <div className='intro_hold'>
        <div className='intro_hold_h1'>
            <div className='h2g'>
            {/* <h1>Supernova.</h1> */}
            <img id="supernova-white" src={supernovawhite}></img>
            <img id="supernova-stars" src={supernovastars}></img>
            </div>
          </div>
          {images.map((img) => (
            <ImageComponent key={img.id} src={img.src} alt={img.figcaption.titre} className={img.figcaption.description} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroComponent;
