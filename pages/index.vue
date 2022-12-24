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
    <header>
      <div class="warpper p-24">
        <span v-if="isChristmasDay"> Merry Christmas! 🎄 </span>
        <h1 class="font-heading font-bold text-5xl text-blue-ryb">
          Work in progress. Hang tight!
        </h1>
      </div>
    </header>
  </main>
</template>
