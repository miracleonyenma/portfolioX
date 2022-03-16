const chromium = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')
const fs = require('fs')

// const targetURL = process.env.COVER_GEN_URL || 'http://localhost:3000';
exports.handler = async function (event, context) {
  // parse body of POST request to valid object and
  // use object destructuring to obtain target url
  const { targetURL, document } = JSON.parse(event.body)
  console.log('--> chromium.executablePath', await chromium.executablePath)
  console.log('--> process.env.EXCECUTABLE_PATH', process.env.EXCECUTABLE_PATH)

  // launch browser
  const browser = await puppeteer.launch({
    args: chromium.args,
    // get path to browser
    executablePath:
      process.env.EXCECUTABLE_PATH || (await chromium.executablePath),
    headless: true,
  })

  console.log(browser.isConnected(), await browser.version())

  // open new page in browser
  const page = await browser.newPage()
  console.log(await page.title())

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

  // try {
  // } catch (err) {
  //   console.log('unable to generate image', err)
  // }

  // await browser.close()

  // navigate to target URL and get page details and screenshot
  try {
    //...
    await page.goto(targetURL, {
      timeout: 0,
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

    await page.screenshot({
      path: `./assets/img/articles/${document.slug}/cover.png`,
    })

    document.coverUrl = `${document.slug}/cover.png`

    // close the browser
    await browser.close()

    // send the page details
    return {
      statusCode: 200,
      body: JSON.stringify({
        targetURL,
        coverUrl: document.coverUrl,
      }),
    }
  } catch (err) {
    console.log(err)
    await browser.close()

    return {
      statusCode: 400,
      body: JSON.stringify({
        err,
      }),
    }
  }
}
