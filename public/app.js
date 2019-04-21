let $state = {
  isLoading: false
}

function reset () {
  $state = {}
  render()
}

function reload () {
  window.location.reload()
}

function showLoader () {
  // disable buttons
  const buttons = document.querySelectorAll('button')
  buttons.forEach(button => button.setAttribute('disabled', true))
  document.getElementById('loader').style.display = "block"
}

function hideLoader () {
  // disable buttons
  const buttons = document.querySelectorAll('button')
  buttons.forEach(button => button.removeAttribute('disabled'))
  document.getElementById('loader').style.display = "none"
}



function speedtest () {
  reset()
  $state.isLoading = true
  axios.get('/speedtest').then(({data}) => {
    const [down, up] = data
    $state.result = `Download Speed: ${down} <br> Upload Speed: ${up}`
  }).catch(err => {
    $state.error = `Can't connect to speedtest server`
  }).then(() => {
    $state.isLoading = false
    render()
  })

  render()
}

function render () {
  const {error, result, isLoading} = $state

  if (error) {
    return document.getElementById('result').innerHTML = error
  }

  if (isLoading) {
    return showLoader ()
  }

  if (!isLoading) {
    hideLoader()
  }

  return document.getElementById('result').innerHTML = result || ''

}

function ping () {
  $state.isLoading = true
  axios.get('/ping').then(({data}) => {
    $state.result = ''
    data.forEach(line => {
      $state.result += `<br>` + line
    })
    $state.isLoading = false
    render()
  })

  render()
}