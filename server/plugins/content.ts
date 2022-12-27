import readingTime from "reading-time";
const formatDate = (date: string | number | Date) => {
  // format the date to be displayed in a readable format
  return new Date(date).toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const generateCoverImage = async ({
  title,
  description,
  updatedAt,
  slug,
}: {
  title: string;
  description: string;
  updatedAt: string;
  slug: string;
}) => {
  const API = process.env.COVERGEN_API as string;

  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      targetURL: "https://cover-gen.netlify.app/",
      document: {
        title,
        description,
        updatedAt,
        slug,
      },
    }),
  });

  const data = await res.json();

  console.log({ data });
};

export default defineNitroPlugin((nitroApp) => {
  let stats = {};

  nitroApp.hooks.hook("content:file:beforeParse", (file) => {
    if (file._id.endsWith(".md")) {
      stats = readingTime(file.body);
      file.readingTime = stats;
      console.log({ readingTime: file.readingTime, stats });
    }
  });
  nitroApp.hooks.hook("content:file:afterParse", async (file) => {
    if (file._id.endsWith(".md")) {
      let dates = { createdAt: file.createdAt, updatedAt: file.updatedAt };
      file.readingTime = stats;
      file.formattedCreatedAt = formatDate(dates.createdAt);
      file.formattedUpdatedAt = formatDate(dates.updatedAt);
      console.log({
        readingTime: file.readingTime,
        stats,
        createdAt: file.formattedCreatedAt,
        updatedAt: file.formattedUpdatedAt,
      });

      try {
        // const image = await generateCoverImage({
        //   title: file.title,
        //   description: file.description,
        //   updatedAt: file.updatedAt,
        //   slug: file.slug,
        // });
        // console.log({ image });
      } catch (error) {
        console.log({ error });
      }
    }
  });
});
