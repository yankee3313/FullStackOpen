const groupBy = require('lodash')

const dummy = () => 1

const totalLikes = array => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
    
  return array.length === 0
    ? 0
    : array.reduce(reducer, 0)
}

const favoriteBlog = array => {
  const likesArray = array.map(x => x.likes)
  return array.filter(x => x.likes == Math.max(...likesArray))
}

const topAuthor = arr => {
  const authorCounts = groupBy.countBy(arr, 'author')
  const maxCount = groupBy.max(groupBy.values(authorCounts))
  return groupBy(authorCounts)
    .toPairs()
    .filter(pair => pair[1] === maxCount)
    .map(pair => ({ author: pair[0], blogs: pair[1] }))
    .value()
}

const topLikes = arr => {
  const likesByAuthor = groupBy.groupBy(arr, 'author')
  const authorLikes = groupBy.mapValues(likesByAuthor, arr =>
    groupBy.sumBy(arr, 'likes'))
  const maxLikes = groupBy.max(groupBy.values(authorLikes))
  return groupBy.chain(authorLikes)
    .pickBy(likes => likes === maxLikes)
    .toPairs()
    .map(pair => ({ author: pair[0], likes: pair[1]}))
    .value()
}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  topAuthor,
  topLikes
}