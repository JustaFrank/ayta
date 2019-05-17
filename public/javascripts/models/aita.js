export class AITA {
  constructor({ judgementCounts }) {
    this.judgementCounts = judgementCounts
  }
}

export class AITAJudgementCounts {
  constructor({ YTA, NTA, NAH, ESH, INFO }) {
    this.YTA = YTA || 0
    this.NTA = NTA || 0
    this.NAH = NAH || 0
    this.ESH = ESH || 0
    this.INFO = INFO || 0
  }
}
