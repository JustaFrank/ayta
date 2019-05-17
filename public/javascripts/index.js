import { parsePostResponse } from './controllers/parsePostResponse.js'
import { parsePostData } from './controllers/parsePostData.js'
import { createChart } from './controllers/createChart.js'
import { validateLink } from './controllers/validateLink.js'

document.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('search')
  const inputUrl = document.getElementById('input-url')
  const textValidation = document.getElementById('text-validation')
  const canvasChart = document.getElementById('canvas-chart')
  const ctx = canvasChart.getContext('2d')

  let chart = undefined

  const showFormError = () => {
    textValidation.classList.remove('ayta-hidden')
    inputUrl.classList.add('ayta-form-error-input')
  }

  const hideFormError = () => {
    textValidation.classList.add('ayta-hidden')
    inputUrl.classList.remove('ayta-form-error-input')
  }

  const activate = () => {
    search.classList.remove('ayta-translate-y')
    canvasChart.style.display = 'block'
  }

  const deactivate = () => {
    search.classList.add('ayta-translate-y')
    canvasChart.style.display = 'none'
  }

  inputUrl.addEventListener('input', async () => {
    const isValidLink = validateLink(inputUrl.value)

    if (isValidLink || inputUrl.value === '') {
      hideFormError()
    } else {
      showFormError()
    }

    if (isValidLink) {
      fetch(`${inputUrl.value}.json`)
        .then(res => res.json())
        .then(parsePostResponse)
        .then(parsePostData)
        .then(aitaJudgementCounts => {
          if (chart) chart.destroy()
          chart = createChart(ctx, aitaJudgementCounts)
        })
        .then(activate)
        .catch(() => {
          showFormError()
          deactivate()
        })
    } else {
      deactivate()
    }
  })
})
