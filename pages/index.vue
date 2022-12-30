<script setup>
const isChristmasDay = () => {
  const today = new Date();
  const christmasDay = new Date(today.getFullYear(), 11, 25);
  return (
    today.getMonth() === christmasDay.getMonth() &&
    today.getDate() === christmasDay.getDate()
  );
};
</script>
<template>
  <main>
    <header class="site-hero">
      <div class="wrapper">
        <div class="img-cont hero-img-cont">
          <img
            src="/assets/img/miracleio.jpg"
            alt="A picture of Miracle Onyenma"
          />
        </div>
        <div class="hero-content">
          <span v-if="isChristmasDay">
            Seasons Greetings! 🎄
          </span>
          <h1 class="font-heading font-extrabold text-3xl md:text-6xl mb-2">
            Hey there,
            <br />
            I'm Miracle Onyenma
          </h1>
          <p class="text-lg md:text-2xl">
            I'm a Designer and Frontend Developer obsessed with crafting
            beautiful experiences ✨
          </p>
        </div>
      </div>
    </header>
  </main>
</template>
<style scoped>
.site-hero {
  @apply relative p-8 md:mt-32;
}

.site-hero > .wrapper {
  @apply grid md:grid-cols-2 gap-12 max-w-7xl m-auto;
}

.hero-img-cont {
  @apply md:col-start-3 md:col-span-1 max-w-[14rem] md:max-w-xs;
}

.hero-img-cont > img {
  @apply rounded-3xl;
  @apply ring-8 ring-blue-ryb dark:ring-han-purple ring-offset-8 ring-offset-slate-50 dark:ring-offset-slate-900 
}

.site-hero .hero-content {
  @apply md:col-span-2 md:col-start-1 md:row-start-1 w-full max-w-7xl m-auto;
}
</style>
