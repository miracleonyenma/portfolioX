const fs = require('fs')
const chromium = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')

module.exports = async ({ targetURL, document, wsEndpoint }) => {
  console.log('options ==-->', { targetURL, document })
  // launch browser
  // const browser = await puppeteer.launch({
  //   args: chromium.args,
  //   // get path to browser
  //   executablePath:
  //     process.env.EXCECUTABLE_PATH || (await chromium.executablePath),
  //   headless: true,
  // })
  const browser = await puppeteer.connect({
    browserWSEndpoint: wsEndpoint,
    ignoreHTTPSErrors: true,
    headless: true,
  })

  console.log(browser.isConnected(), await browser.version())

  // open new page in browser
  const page = await browser.newPage()

  // set the viewport of the page
  await page.setViewport({
    width: 1200,
    height: 628,
    deviceScaleFactor: 1,
  })

  // set the prefers-color-scheme to dark
  await page.emulateMediaFeatures([
    { name: 'prefers-color-scheme', value: 'dark' },
  ])

  try {
    //...
    await page.goto(targetURL, {
      waitUntil: 'networkidle2',
    })

    const formCont = await page.waitForSelector('#form-cont', {
      hidden: true,
    })

    const h1 = await page.waitForSelector('#content h1')

    await h1.click()

    const titleInput = await page.waitForSelector('#title')
    const descInput = await page.waitForSelector('#description')
    const dateInput = await page.waitForSelector('#updatedAt')

    await titleInput.type(`${document.title}`)
    await descInput.type(`${document.description}`)
    await dateInput.type(`${document.updatedAt}`)

    console.log(
      'titleInput',
      await titleInput.evaluate((x) => {
        return x.value
      })
    )
    console.log(
      'descInput',
      await descInput.evaluate((x) => {
        return x.value
      })
    )
    console.log(
      'dateInput',
      await dateInput.evaluate((x) => {
        return x.value
      })
    )

    await h1.click()

    try {
      await fs.promises.access(
        `./assets/img/articles/${document.slug}/cover.png`
      )
    } catch (error) {
      console.log('ERROR --- fs.promises.access -->', error)

      try {
        await fs.promises.mkdir(`./assets/img/articles/${document.slug}`)
      } catch (err) {
        console.log(err, 'unable to create path')
      }
    }

    const screenshot = await page.screenshot({
      path: `./assets/img/articles/${document.slug}/cover.png`,
      // encoding: 'binary',
    })

    // document.coverUrl = `${document.slug}/cover.png`;

    // close the browser
    await browser.close()

    // send the page details
    return screenshot
  } catch (err) {
    console.log(err)
    await browser.close()

    return null
  }
}
