(function () {
  const exec = require('child_process').exec
  const latestUrl = 'prue-cdn/portfolio'
  downloadFromUrl(latestUrl)
  function downloadFromUrl (url, cb) {
    console.log('Uploading to:', url)
    exec(`s3-cli --config ~/.s3cfg sync s3://${url} out`, (error) => {
      if (error !== null) {
        console.log('error downloading from S3 url: ' + url)
        console.log(error.toString() || error)
        throw error
      }
      console.log('Successfully downloaded from S3 url:', url)
      if (cb) cb()
    })
  }
})()
