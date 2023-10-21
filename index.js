class App {
  constructor() {
    this.heroImages = [...document.querySelectorAll('.hero__images img')];
    this.texts = [...document.querySelectorAll('.text__effect')];
    this._initialize();
    this._render();
  }
  _initialize() {
    this._setInitialState();
    this._createLenis();
    this._createIntro();
    this._createHero();
    this._createTextAnim();
  }
  _setInitialState() {
    gsap.set('.hero__title span, .fullwidth-image__text', {
      y: 32,
      opacity: 0,
    });

    gsap.set('.hero__images img', {
      opacity: 0,
      y: gsap.utils.random(100, 50),
    });

    gsap.set('.fullwidth-image img', {
      scale: 1.2,
    });
  }
  _createLenis() {
    this.lenis = new Lenis({
      lerp: 0.1,
    });
  }

  _createIntro() {
    const tl = gsap.timeline();

    tl.to('.hero__title div', {
      opacity: 1,
    })
      .to('.hero__title span', {
        y: 0,
        opacity: 1,
        ease: 'expo.out',
        duration: 2,
        stagger: 0.08,
      })
      .to(
        '.hero__images img',
        {
          opacity: 1,
          y: 0,
          ease: 'power3.out',
          duration: 2,
          stagger: 0.03,
        },
        0.5
      );
  }

  _createHero() {
    const yl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        markers: false,
        scrub: true,
      },
    });
    this.heroImages.forEach(image => {
      yl.to(image, {
        ease: 'none',
        yPercent: gsap.utils.random(-100, -50),
      }, 0.01);
    });
  }
  _createTextAnim(){
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.text-block',
            start: 'top center',
            end: 'bottom top+=10%',
            markers: false,
            scrub: true,
        },
    });

    this.texts.forEach((text, index) => {
        const overlay = text.querySelector('.text__overlay');
        const content = text.querySelector('p');

        tl.to(overlay, {
           scaleX: 0,
        })
    });
  }
  _render(time) {
    this.lenis.raf(time);

    requestAnimationFrame(this._render.bind(this));
  }
}

new App();
