import { AITAJudgementCounts } from '../models/aita.js'

const abbreviations = ['YTA', 'NTA', 'NAH', 'ESH', 'INFO']

export const parsePostData = post => {
  const aitaJudgementCounts = post.replies
    .map(reply => {
      const { text } = reply
      for (const abbreviation of abbreviations) {
        if (text.startsWith(abbreviation)) {
          return abbreviation
        }
      }
      return undefined
    })
    .filter(abbreviation => abbreviation !== undefined)
    .reduce((acc, cur) => {
      if (acc[cur] !== undefined) {
        return Object.assign(acc, { [cur]: acc[cur] + 1 })
      }
      return Object.assign(acc, { [cur]: 0 })
    }, {})
  return new AITAJudgementCounts(aitaJudgementCounts)
}
