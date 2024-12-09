import React, { useEffect } from "react";

function NotFoundPage() {
  useEffect(() => {
    const gsap = window.gsap;

    gsap.fromTo(".not-found", {
      opacity: 0,
      y: 50,
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".not-found",
        start: "top 80%",
        end: "center 50%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFoundPage;
