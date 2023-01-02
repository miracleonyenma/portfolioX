<script setup lang="ts">
const isChristmas = useIsChristmas();
const isNewYear = useIsNewYear();

const siteThemeCookie = useCookie("site-theme");
const theme = useSiteTheme();
const setTheme = useSetSiteTheme;
setTheme(siteThemeCookie.value || "dark");

const specialGreeting = useSpecialGreeting();

const metaTitle = ref(specialGreeting || "Miracleio");

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Miracleio` : "Miracleio";
  },
  title: metaTitle.value,
  meta: [
    {
      name: "description",
      content:
        "Designer & Frontend Developer portfolio site. Built by Miracleio with love ❤, Nuxt 3, Tailwind CSS, and TypeScript.",
      key: "description",
    },
    //Open Graph
    {
      key: "og-type",
      property: "og:type",
      content: "website",
    },
    {
      key: "og-url",
      property: "og:url",
      content: `https://miracleio.me/`,
    },
    {
      key: "og-title",
      property: "og:title",
      content: metaTitle.value,
    },
    {
      key: "og-description",
      property: "og:description",
      content: `Designer & Frontend Developer portfolio site. Built by Miracleio with love ❤`,
    },
    {
      key: "og-image",
      property: "og:image",
      content: `https://miracleio.me/img/cover.png`,
    },
    //Twitter
    {
      key: "twitter-card",
      property: "twitter:card",
      content: "summary_large_image",
    },
    {
      key: "twitter-url",
      property: "twitter:url",
      content: `https://miracleio.me/`,
    },
    {
      key: "twitter-title",
      property: "twitter:title",
      content: metaTitle.value,
    },
    {
      key: "twitter-description",
      property: "twitter:description",
      content: `Designer & Frontend Developer portfolio site. Built by Miracleio with love ❤`,
    },
    {
      key: "twitter-image",
      property: "twitter:image",
      content: `https://miracleio.me/img/cover.png`,
    },
  ],
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: isChristmas ? "/logo-christmas.png" : "/logo.png",
    },
  ],
  htmlAttrs: {
    class: theme.value === "dark" ? "dark" : "light",
  },
});
</script>
<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>
