gsap.registerPlugin(ScrollTrigger);

// Fade text gently when scrolling hero
gsap.from(".hero-text h1", {
    y: 80,
    opacity: 0,
    duration: 2,
    ease: "power4.out"
});

// Parallax video scroll
gsap.to(".hero-video", {
    scale: 1.2,
    scrollTrigger: {
        trigger: ".hero",
        scrub: true
    }
});

// Section fade stagger
gsap.utils.toArray(".section").forEach(sec => {
    gsap.from(sec, {
        opacity: 0,
        y: 60,
        duration: 2,
        scrollTrigger: {
            trigger: sec,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});
// Rolex-like scroll gallery
gsap.utils.toArray(".frame").forEach((frame, i) => {
    gsap.fromTo(frame,
        { opacity: 0, scale: 1.1 },
        {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
                trigger: frame,
                start: "top 85%",
                end: "bottom 20%",
                scrub: true,
            }
        }
    );
});

// Fade in "Gabès is choking."
gsap.to(".warning-text", {
    opacity: 1,
    duration: 2,
    scrollTrigger: {
        trigger: ".warning-text",
        start: "top 80%",
    }
});
