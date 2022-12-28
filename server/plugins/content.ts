import path from "path";
import fs from "fs";
import request from "request";
import readingTime from "reading-time";
import simpleGit from "simple-git";
import { SimpleGit } from "simple-git/dist/typings/simple-git";
import { SimpleGitOptions } from "simple-git/dist/typings/types";

const API = process.env.COVERGEN_API || "http://localhost:3000/api";

const formatDate = (date: string | number | Date) => {
  // format the date to be displayed in a readable format
  return new Date(date).toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const options: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(),
  binary: "git",
};

const git: SimpleGit = simpleGit(options);

const getDates = async (filePath: string) => {
  try {
    const stats = await fs.promises.stat(filePath);
    // console.log({ stats });

    const log = await git.log({
      file: filePath,
    });

    const fileUpdatedAt = stats.mtime;
    const fileCreatedAt = stats.birthtime;
    const gitUpdatedAt = log.latest?.date;
    const gitCreatedAt = log.all[log.all.length - 1]?.date;
    // console.log({
    //   log,
    //   all: log.all,
    //   latest: log.latest,
    //   gitUpdatedAt,
    //   gitCreatedAt,
    //   fileCreatedAt,
    //   fileUpdatedAt,
    // });
    return { gitUpdatedAt, gitCreatedAt, fileUpdatedAt, fileCreatedAt };
  } catch (error) {
    console.log("🎅🏾🎅🏾🎅🏾🎅🏾", { error });
    return {
      gitUpdatedAt: null,
      gitCreatedAt: null,
      fileUpdatedAt: null,
      fileCreatedAt: null,
    };
  }
};

const getCover = async (options: any) => {
  const { title, description, updatedAt, slug } = options;
  console.log("🥶🥶", options);

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
  console.log(`response from ${API}`, { data });

  return data;
};

const createCover = async ({
  filePath,
  url,
}: {
  filePath: string;
  url: string;
}) => {
  return new Promise((resolve, reject) => {
    // save image from cover.url to filepath
    const imageFile = fs.createWriteStream(filePath);

    const coverFile = request(url)
      .pipe(imageFile)
      .on("close", () => {
        console.log("👁️👁️", { coverFile });
        resolve(coverFile);
      })
      .on("error", (error) => {
        console.log("😭😭", { error });
        reject(error);
      });

    console.log({ coverFile });
  });
};

export default defineNitroPlugin((nitroApp) => {
  let stats = {};

  nitroApp.hooks.hook("content:file:beforeParse", async (file) => {
    if (file._id.endsWith(".md")) {
      stats = readingTime(file.body);
      file.readingTime = stats;
      // console.log({ readingTime: file.readingTime, stats });
    }
  });
  nitroApp.hooks.hook("content:file:afterParse", async (file) => {
    if (file._id.endsWith(".md")) {
      file.readingTime = stats;

      const filePath = `./content/${file._file}`;

      // console.log("🎅🏾🎅🏾🎅🏾🎅🏾", {
      //   file,
      //   path: file?._file,
      //   filePath,
      //   options,
      //   cwd: process.cwd(),
      // });

      const gitDates = await getDates(filePath);
      file.gitCreatedAt = gitDates.gitCreatedAt;
      file.gitUpdatedAt = gitDates.gitUpdatedAt;
      file.formattedGitCreatedAt = formatDate(file.gitCreatedAt);
      file.formattedGitUpdatedAt = formatDate(file.gitUpdatedAt);
      file.fileCreatedAt = gitDates.fileCreatedAt;
      file.fileUpdatedAt = gitDates.fileUpdatedAt;
      file.formattedFileCreatedAt = formatDate(file.fileCreatedAt);
      file.formattedFileUpdatedAt = formatDate(file.fileUpdatedAt);

      let dates = {
        createdAt: file.createdAt,
        updatedAt: file.updatedAt,
        ...gitDates,
        formattedGitCreatedAt: file.formattedGitCreatedAt,
        formattedGitUpdatedAt: file.formattedGitUpdatedAt,
        formattedFileCreatedAt: file.formattedFileCreatedAt,
        formattedFileUpdatedAt: file.formattedFileUpdatedAt,
      };

      file.formattedCreatedAt = formatDate(dates.createdAt);
      file.formattedUpdatedAt = formatDate(dates.updatedAt);

      // console.log({ dates });

      try {
        const slug = file._path.split("/").splice(-1)[0];
        console.log({ slug });

        // check if file exists
        const filePath = path.join(
          process.cwd(),
          `public/assets/img/articles/${slug}/cover.png`
        );

        const fileExists = fs.existsSync(filePath);
        console.log({ filePath, fileExists });

        if (!fileExists) {
          // create the directory
          const dirPath = path.join(
            process.cwd(),
            `public/assets/img/articles/${slug}`
          );
          const dir = await fs.promises.mkdir(dirPath, { recursive: true });

          console.log({ dirPath, dir });

          const coverData = {
            slug,
            title: file.title,
            description: file.description,
            updatedAt: dates.updatedAt,
          };

          console.log({ file, coverData });

          const cover = await getCover(coverData);
          console.log({ cover });

          const coverFile = await createCover({
            filePath,
            url: cover.url,
          });

          console.log({ coverFile });

          file.coverUrl = cover.url;
          coverFile &&
            (file.coverPath = `/assets/img/articles/${slug}/cover.png`);

          console.log({ file });
        }
      } catch (error) {
        console.log("🙏🏾🙏🏾🙏🏾", { error });
      }
    }
  });
});
