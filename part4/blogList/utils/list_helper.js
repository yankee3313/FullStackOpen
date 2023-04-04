const _ = require('lodash')

const dummy = () => {
  return 1
}

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
  const authorCounts = _.countBy(arr, 'author')
  const maxCount = _.max(_.values(authorCounts))
  return _(authorCounts)
    .toPairs()
    .filter(pair => pair[1] === maxCount)
    .map(pair => ({ author: pair[0], blogs: pair[1] }))
    .value()
}

const topLikes = arr => {
  const likesByAuthor = _.groupBy(arr, 'author')
  const authorLikes = _.mapValues(likesByAuthor, arr =>
    _.sumBy(arr, 'likes'))
  const maxLikes = _.max(_.values(authorLikes))
  return _.chain(authorLikes)
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