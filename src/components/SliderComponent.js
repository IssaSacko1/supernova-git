import React, { useRef, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';


const SliderComponent = ({ images }) => {

  const component = useRef()
  const slider = useRef();
  const history = useHistory();


  useLayoutEffect(() => {
    const gsap = window.gsap;

    let ctx = gsap.context(() => {
      let sliderItems = gsap.utils.toArray(".slider-item");
      gsap.to(sliderItems, {
        xPercent: -100 * (sliderItems.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sliderItems.length - 1),
          start: "top 200vh", // Décale le démarrage
          end: () => "+=" + slider.current.offsetWidth,
        }
      });
    }, component);
    return () => ctx.revert();
  });

  const handleClick = (pageId) => {
    localStorage.setItem('pageId', pageId); // Stocke l'URL dans le local storage
    history.push('/project-detail'); // Navigue vers /project-detail
  };



  return (
    <div className='SliderComponent' ref={component}>
    <section className='slider-section' ref={slider}>
        {images.map((video, index) => (
            <div className='slider-item' key={video.src}>
                <img 
                    src={video.src} 
                    alt={video.figcaption.titre} 
                    className='slider-image' 
                />
                <div className='background'></div> {/* Fond noir ajouté */}
                <a 
              className='text' 
              onClick={() => handleClick(video.figcaption.page_id)}>                  
              <h4>{video.figcaption.titre}</h4>
                    <div className='divider'></div> {/* Trait ajouté */}
                    <p>{video.figcaption.description}</p>
                </a>
            </div>
        ))}
    </section>
</div>
  );
};

export default SliderComponent;
