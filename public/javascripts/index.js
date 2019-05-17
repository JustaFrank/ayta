import { parsePostResponse } from './controllers/parsePostResponse.js'
import { parsePostData } from './controllers/parsePostData.js'
import { createChart } from './controllers/createChart.js'
import { validateLink } from './controllers/validateLink.js'

document.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('search')
  const inputUrl = document.getElementById('input-url')
  const textValidation = document.getElementById('text-validation')
  const ctx = document.getElementById('canvas-chart').getContext('2d')
  let chart = undefined

  inputUrl.addEventListener('input', () => {
    const isValidLink = validateLink(inputUrl.value)

    if (isValidLink || inputUrl.value === '') {
      textValidation.classList.add('ayta-hidden')
      inputUrl.classList.remove('ayta-form-error-input')
    } else {
      textValidation.classList.remove('ayta-hidden')
      inputUrl.classList.add('ayta-form-error-input')
    }

    if (isValidLink) {
      fetch(`${inputUrl.value}.json`)
        .then(res => res.json())
        .then(parsePostResponse)
        .then(parsePostData)
        .then(aitaJudgementCounts => {
          chart = createChart(ctx, aitaJudgementCounts)
        })
      search.classList.remove('ayta-translate-y')
    } else {
      search.classList.add('ayta-translate-y')
      if (chart) {
        chart.destroy()
      }
    }
  })
})
