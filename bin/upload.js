(function () {
  const exec = require('child_process').exec
  const url = 'prue-cdn/portfolio'
  uploadToUrl(url)
  function uploadToUrl (url, cb) {
    console.log('Uploading to:', url)
    exec(`s3-cli --config ~/.s3cfg sync s3://${url} out`, (error) => {
      if (error !== null) {
        console.log('error uploading to S3 url: ' + url)
        console.log(error.toString() || error)
        throw error
      }
      console.log('Successfully uploaded to S3 url:', url)
      if (cb) cb()
    })
  }
})()
