const app = require('express')()
const shell = require('shelljs');


app.get('/', (req, res) => {
  shell.exec('iperf3 -c 103.82.44.2', function (code, stdout, stderr) {
    const speed = stdout.split('\n').slice(-5, -3).map(line => {
      const output = line.match(/\d+\.\d+ Mbits\/sec/)
      return output ? output[0] : ''
    })
    res.json(speed)
  })
})

app.listen(8000, function () {
  console.log('Listening to 8000')
})