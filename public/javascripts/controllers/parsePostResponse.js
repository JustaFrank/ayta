import { Reply, Post } from '../models/post.js'

export const parsePostResponse = res => {
  if (res.length !== 2) {
    throw new Error('Length of response is not 2!')
  } else if (res[0].kind !== 'Listing' || res[1].kind !== 'Listing') {
    throw new Error('Top level post items are not listings!')
  }

  const [t3] = getPostListingChildren(res[0])
  const title = parsePostT3(t3)
  const replies = parsePostT1Array(getPostListingChildren(res[1]))
  return new Post({ title, replies })
}

export const getPostListingChildren = listing => {
  return listing.data.children
}

export const parsePostT1Array = t1s => {
  return t1s
    .filter(t1 => t1.kind !== 'more')
    .map(t1 => {
      const { body, replies } = t1.data
      return new Reply({
        text: body,
        replies: replies ? parsePostT1Array(replies.data.children) : []
      })
    })
}

export const parsePostT3 = t3 => t3.data.title
