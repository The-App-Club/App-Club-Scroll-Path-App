import {useRef, useId, useEffect, useMemo} from 'react';
import {css} from '@emotion/css';
import {createRoot} from 'react-dom/client';
import '@fontsource/kaushan-script';
import './styles/index.scss';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

const App = () => {
  const reqId = useRef(null);
  const id = useId();
  const svgDomRef = useRef(null);
  const pathDomRef = useRef(null);

  const lenis = useMemo(() => {
    // Smooth scrolling initialization (using Lenis https://github.com/studio-freight/lenis)
    return new Lenis({
      lerp: 0.1,
      smooth: true,
    });
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const svgDom = svgDomRef.current;
    const pathDom = pathDomRef.current;
    gsap
      .timeline({
        scrollTrigger: {
          trigger: svgDom,
          start: 'top bottom',
          end: 'bottom top',
          markers: true,
          scrub: true,
        },
      })
      .to(pathDom, {
        ease: 'none',
        attr: {
          d: `M 40.185 33.49 C 48.118 21.773 59.756 22.799 75.15 38.316 C 86.578 49.835 78.14 65.96 62.042 77.212 C 48.267 86.841 29.623 79.343 21.566 64.069 C 16.111 53.731 33.832 42.873 40.185 33.49 Z`,
        },
      });

    return () => {};
  }, []);

  useEffect(() => {
    (() => {
      const animate = (time) => {
        lenis.raf();
        reqId.current = window.requestAnimationFrame(animate);
      };
      animate();
    })();

    return () => {
      if (reqId.current) {
        window.cancelAnimationFrame(reqId.current);
      }
    };
  }, []);

  return (
    <div>
      <header
        className={css`
          width: 100%;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 4rem;
        `}
      >
        Hello
      </header>
      <main>
        <article
          className={css`
            width: 100%;
            height: 100%;
          `}
        >
          <section
            className={css`
              width: 100%;
              min-height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 4rem;
              position: relative;
            `}
          >
            <svg
              ref={svgDomRef}
              width={300}
              viewBox="0 0 100 100"
              className={css`
                display: block;
              `}
            >
              <g>
                <defs>
                  <clipPath id={`morph-${id}`}>
                    <path
                      ref={pathDomRef}
                      d={`M 16.71 24.473 C 33.912 -3.363 53.826 13.712 75.935 44.812 C 84.482 56.834 85.419 69.487 75.797 77.664 C 59.844 91.222 29.035 89.003 19.094 70.004 C 12.368 57.148 5.621 42.416 16.71 24.473 Z`}
                      className={css`
                        stroke-linejoin: round;
                      `}
                    />
                  </clipPath>
                </defs>
                <image
                  clipPath={`url(#morph-${id})`}
                  href={`https://media.giphy.com/media/4ilFRqgbzbx4c/giphy.gif`}
                  width={'100%'}
                  height={'100%'}
                ></image>
              </g>
            </svg>
          </section>
          <section
            className={css`
              width: 100%;
              min-height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 4rem;
            `}
          >
            2
          </section>
        </article>
      </main>
      <footer
        className={css`
          width: 100%;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 4rem;
        `}
      >
        Bye
      </footer>
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
