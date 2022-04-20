const fs = require('fs')

const checkImage = async (slug) => {
  try {
    await fs.promises.access(`./assets/img/articles/${slug}/cover.png`)
    return true
  } catch (error) {
    console.log('ERROR --- fs.promises.access -->', error)

    try {
      await fs.promises.mkdir(`./assets/img/articles/${slug}`)
      console.log(`new path ./assets/img/articles/${slug} created`)
    } catch (err) {
      console.log(err, 'unable to create path')
    }

    return false
  }
}

module.exports = checkImage
