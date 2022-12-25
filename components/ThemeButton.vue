<script setup lang="ts">
import {
  SunIcon,
  MoonIcon,
  AcademicCapIcon,
  Bars2Icon,
} from "@heroicons/vue/24/solid/index";

const siteThemeCookie = useCookie("site-theme");
const theme = useSiteTheme();
const setTheme = useSetSiteTheme;

// function to toggle theme
const toggleTheme = () => {
  document.documentElement.classList.remove("dark", "light");
  const setValues = (theme: string) => {
    document.documentElement.classList.add(theme);
    siteThemeCookie.value = theme;
    setTheme(theme);
  };
  if (theme.value === "dark") {
    setValues("light");
  } else {
    setValues("dark");
  }
};
</script>
<template>
  <button class="cta py-2" @click="toggleTheme">
    <span v-if="theme === 'dark'">
      <MoonIcon class="icon" />
    </span>
    <span v-else>
      <SunIcon class="icon" />
    </span>
  </button>
</template>
