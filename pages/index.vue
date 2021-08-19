<template>
  <main class="home-main">
    <section class="site-hero">
      <div class="sect-wrapper" data-page-trans="children">
        <header class="hero-header" data-page-trans="children">
          <h1 class="header-txt">
            Hey 👋🏾, <br />
            I'm Miracleio.
          </h1>
          <p>
            I'm a Designer and Frontend Developer obsessed with crafting
            beautiful experiences ✨ <br />
          </p>
          <ul class="action-cont socials">
            <li class="socials__item" title="Twitter">
              <a
                class="icon"
                href="https://twitter.com/miracleio"
                target="twitter"
              >
                <feather-icon name="twitter" />
              </a>
            </li>
            <li class="socials__item" title="GitHub" target="github">
              <a class="icon" href="https://github.com/miracleonyenma">
                <feather-icon name="github" />
              </a>
            </li>
            <li class="socials__item" title="Dribbble">
              <a
                class="icon"
                href="https://dribbble.com/miracleio"
                target="dribble"
              >
                <feather-icon name="dribbble" />
              </a>
            </li>

            <div class="decor-description prose-xl">
              <span class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 454.23 235.51"
                >
                  <defs>
                    <style>
                      .cls-1 {
                        fill: url(#linear-gradient);
                      }
                      .arrow-head {
                        fill: url(#linear-gradient-2);
                      }
                    </style>
                    <linearGradient
                      id="linear-gradient"
                      x1="25.83"
                      y1="95.26"
                      x2="454.23"
                      y2="95.26"
                      gradientTransform="matrix(1, 0, 0, -1, 0, 238.02)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stop-color="#12ccff" />
                      <stop offset="1" stop-color="#590be0" />
                    </linearGradient>
                    <linearGradient
                      id="linear-gradient-2"
                      x1="0"
                      y1="62.96"
                      x2="126.89"
                      y2="62.96"
                      gradientTransform="matrix(1, 0, 0, 1, 0, 0)"
                      xlink:href="#linear-gradient"
                    />
                  </defs>
                  <title>hand-drawn-arrow</title>
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                      <path
                        class="cls-1"
                        d="M31.9,50c-3.68,0-7.28,2.87-5.67,7.27,20.65,56.24,70.53,93.46,121.14,121.56,29.51,16.38,60.21,31.7,92.37,42.16a299.5,299.5,0,0,0,92.39,14.51q4.16,0,8.31-.11a305.84,305.84,0,0,0,110.88-24.2c3-1.27,3.61-5.65,2.15-8.21a5.47,5.47,0,0,0-5-2.85,8.38,8.38,0,0,0-3.24.69A290.41,290.41,0,0,1,332.3,223.52,289.3,289.3,0,0,1,254.9,213c-32-8.9-62.12-23.5-91.34-39.06-24.89-13.26-49.34-28-71-46.17-23.71-20-44-44.35-54.79-73.72A6.08,6.08,0,0,0,31.9,50Z"
                      />
                      <path
                        class="arrow-head"
                        d="M61.67,53.41c17.56,12.5,36.59,23.27,57.74,28.16a6.67,6.67,0,0,0,1.5.18c6.41,0,8.7-10.13,1.69-11.75-20.2-4.67-38.1-15-54.84-27C49.4,29.94,31.95,15.51,14.23,1.58A7.63,7.63,0,0,0,9.6,0,5.15,5.15,0,0,0,4.2,4.23,208.88,208.88,0,0,0,14.33,121.92a6.25,6.25,0,0,0,6,4c3.71,0,7.28-2.85,5.57-7.21A193.86,193.86,0,0,1,14,17.81S45.38,41.79,61.67,53.41Z"
                      />
                    </g>
                  </g>
                </svg>
              </span>
              <p class="txt">Let's connect</p>
            </div>
          </ul>
        </header>
        <div class="hero-media slides__container">
          <div class="slides" ref="slides" @mouseenter="startFollowCursor($event)" @mousemove="followCursor($event)" @mouseleave="resetFollowCursor($event)">
            <div class="img-cont hero-media__avatar slides__item">
              <img
                src="@/assets/img/FullSizeRender (2)-edit.webp"
                alt="Miracleio with his halo"
                class="slides__content"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      cursorCoords: {},
      slides: '',
      slidesItem: ''
      // containerCoords: {},
    }
  },

  methods:{
    startFollowCursor(e){
      this.slidesItem.style.setProperty("--S", `1.05`)
      this.slidesContent.style.setProperty("--S", `1.15`)
    },


    followCursor(e){
      this.cursorCoords.x = e.pageX - this.slides.offsetLeft;
      this.cursorCoords.y = e.pageY - this.slides.offsetTop;

      this.cursorCoords.percentX = ((this.cursorCoords.x / this.slides.clientWidth) * 100);
      this.cursorCoords.percentY = ((this.cursorCoords.y / this.slides.clientHeight) * 100);

      // console.log(`X: ${e.pageX} - ${this.slides.offsetLeft} = ${this.cursorCoords.x}`);
      // console.log(`W: ${this.slides.clientWidth}`);
      // console.log(`%X: ${this.cursorCoords.percentX}`);
      // console.log(`%X: ${this.cursorCoords.percentX} - ${50} = ${this.cursorCoords.percentX - 50}`);
      // console.log(`H: ${this.slides.clientHeight}`);
      // console.log(`%Y: ${this.cursorCoords.percentY}`);
      // console.log(`Y: ${e.pageY} - ${this.slides.offsetTop} = ${this.cursorCoords.y}`);

      this.slidesItem.style.setProperty("--X", `${Math.floor(this.cursorCoords.percentX - 70) / 2}%`)
      this.slidesItem.style.setProperty("--Y", `${Math.floor(this.cursorCoords.percentY - 70) / 2}%`)

      this.slidesContent.style.setProperty("--X", `${Math.floor(this.cursorCoords.percentX - 65) / 10}%`)
      this.slidesContent.style.setProperty("--Y", `${Math.floor(this.cursorCoords.percentY - 65) / 10}%`)

      // console.log(`--X: ${Math.floor(this.cursorCoords.percentX - 50) / 2}`);
      // console.log(`--Y: ${Math.floor(this.cursorCoords.percentY - 50) / 2}`);
    },

    resetFollowCursor(e){
      this.slidesItem.style.removeProperty("--X")
      this.slidesItem.style.removeProperty("--Y")
      this.slidesItem.style.removeProperty("--S")

      this.slidesContent.style.removeProperty("--X")
      this.slidesContent.style.removeProperty("--Y")
      this.slidesContent.style.removeProperty("--S")
    }

  },

  mounted(){
      this.slides = this.$refs.slides;
      this.slidesItem = this.slides.querySelector(".slides__item");
      this.slidesContent = this.slides.querySelector(".slides__content");
  }

}
</script>

<style lang="scss" scoped>
@layer components {
  .home-main {
    @apply min-h-screen;
  }

  .sect-wrapper {
    @apply grid md:grid-cols-2 gap-6 items-center text-center h-full;
  }

  .hero-header {
    @apply row-start-2 md:row-start-1;
  }

  .header-txt{
    @apply font-header;
  }

  .hero-media {
    @apply flex justify-center lg:justify-end max-w-3xl h-72 sm:h-96 w-full lg:h-full;
    &__avatar {
      img {
        @apply w-96 m-auto md:ml-auto md:mr-0;
      }
    }
  }

  .socials {
    @apply relative inline-flex items-center gap-4 p-2 mt-4 bg-white shadow-lg rounded-lg;

    &__item {
      @apply rounded-md p-2 inline-flex transform hover:scale-110 hover:bg-gray-200;
    }
  }

  .decor-description {
    @apply absolute right-0 bottom-0 transform translate-x-2/3 md:translate-x-3/4 translate-y-full flex gap-2 md:gap-6 items-center;

    .icon {
      svg {
        @apply w-16 h-6 md:w-20 md:h-12;
      }
    }

    .txt {
      @apply text-left leading-none;
    }
  }

  .slides {
    &__container {
      @apply flex w-full h-full items-center justify-center md:justify-end;

      * {
        @apply transition-all duration-300;
        transition-timing-function: cubic-bezier(0.05, 0.985, 0.32, 1.085);
      }
    }

    & {
      @apply relative cursor-pointer;
    }

    &,
    &__item {
      @apply w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96;
    }

    &__item {
      @apply overflow-hidden rounded-full;

      &:active{
        --S: 0.95;
      }
    }

    &__item,
    &__content {
      @apply absolute;
      --X: 0%;
      --Y: 0%;
      --S: 1;
      transform: translate(var(--X), var(--Y)) scale(var(--S));
    }

    &__content {
      transform: translate(var(--X), var(--Y)) scale(var(--S));
    }
  }
}
</style>