const express = require('express')
const { join } = require('path')
const app = express()
const shell = require('shelljs');

app.use(express.static(join(__dirname, '/public')))

app.get('/speedtest', (req, res) => {
  // return res.json(['31M', '22B'])
  shell.exec('iperf3 -c 103.82.44.2', function (code, stdout, stderr) {
    const speed = stdout.split('\n').slice(-5, -3).map(line => {
      const output = line.match(/\d+\.\d+ Mbits\/sec/)
      return output ? output[0] : ''
    })
    res.json(speed)
  })
})

app.get('/ping', (req, res) => {
  shell.exec('ping 103.82.44.1 -w 5', function (code, stdout, stderr) {
    res.json(stdout.split('\n'))
  })
})

app.listen(8000, function () {
  console.log('Listening to 8000')
})