export class Post {
  constructor({ title, replies }) {
    this.title = title
    this.replies = replies
  }
}

export class Reply {
  constructor({ text, replies }) {
    this.text = text
    this.replies = replies
  }
}
