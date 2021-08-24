// import puppeteer from 'puppeteer';

// exports.handler = async (req, res, next) => {
//     const browser = await puppeteer.launch();


//     let version = await browser.version()
//     console.log(version)

//     const page = await browser.newPage();

//     await page.goto('http://localhost:3000/article-cover-image');

//     const title = await page.title();

//     const content = await page.content()

//     // await page.setViewport({
//     //     width: 1200,
//     //     height: 628
//     // })

//     // const screenshot = await page.screenshot()


//     // res.end(screenshot)
//     res.end(JSON.stringify({browser: version , title: title}))

//     await browser.close()

// }