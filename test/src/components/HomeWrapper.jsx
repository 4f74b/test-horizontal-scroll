import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './HomeWrapper.css'

const ScrollComponent = () => {
    const chapterWrapperRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const container = chapterWrapperRef.current;
        const sections = container.querySelectorAll('section');

        ScrollTrigger.matchMedia({
            "(min-width: 1024px)": function () {
                gsap.to(container, {
                    x: () => -(container.scrollWidth - document.documentElement.clientWidth) + "px",
                    ease: "none",
                    scrollTrigger: {
                        trigger: container,
                        invalidateOnRefresh: true,
                        pin: true,
                        scrub: 0.3,
                        snap: 1 / (sections.length - 1),
                        end: () => "+=" + container.offsetWidth
                    }
                });
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div ref={chapterWrapperRef} id="home-wrapper">
            <section>1</section>
            <section>2</section>
            <section>3</section>
            <section>4</section>
            <section>5</section>
        </div>
    );
};

export default ScrollComponent;
