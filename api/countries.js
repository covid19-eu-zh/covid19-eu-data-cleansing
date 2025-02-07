const fs = require('fs')
const path = require('path')

// req.params doesn't get read in Zeit, so use req.query instead
// res.status(200).send({
//   body: req.body,
//   query: req.query,
//   cookies: req.cookies,
//   params: req.params
// })

module.exports = (req, res) => {
  const alpha2 = req.query.alpha2
  const days = req.query.days || 30 //getting the last 30 days data by default
  const directoryPath = path.join(__dirname, './db/', `${alpha2}.json`)

  // const dataPath = `./db/${alpha2}.json`

  fs.readFile(directoryPath, 'utf8', (err, data) => {
    if (err) {
      res.status(503).send('Unable to scan directory: ' + err)
      throw err
    }
    const dataObj = JSON.parse(data).slice(-days)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).send(dataObj)
  })
}

// const dataPath = `./db/at.json`

// fs.readFile(directoryPath, 'utf8', (err, data) => {
//   if (err) {
//     throw err
//   }
//   console.log('data',data)
// })
