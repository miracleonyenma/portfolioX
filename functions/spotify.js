const { getNowPlaying } = require('../modules/spotify')

exports.handler = async function (event, context) {
  const response = await getNowPlaying()
  console.log({ response })

  if (response.status == 204 || response.status > 400) {
    return {
      statusCode: 200,
      body: JSON.stringify({ isPlaying: false }),
    }
  }

  const song = await response.json()
  console.log({ song })

  return {
    statusCode: 200,
    body: JSON.stringify({ ...song.item, isPlaying: song.is_playing, progress: song.progress_ms }),
  }
}
