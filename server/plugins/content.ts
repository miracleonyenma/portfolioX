import readingTime from "reading-time";

export default defineNitroPlugin((nitroApp) => {
  let stats = {};
  nitroApp.hooks.hook("content:file:beforeParse", (file) => {
    if (file._id.endsWith(".md")) {
      stats = readingTime(file.body);
      file.readingTime = stats;
    }
  });
  nitroApp.hooks.hook("content:file:afterParse", (file) => {
    if (file._id.endsWith(".md")) {
      file.readingTime = stats;
    }
  });
});
