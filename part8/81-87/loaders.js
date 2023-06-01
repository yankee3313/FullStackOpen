const DataLoader = require('dataloader')
const Book = require('./models/book')

const bookCountLoader = new DataLoader(async (authorIds) => {
    
  const books = await Book.find({ author: { $in: authorIds } })

  const bookCounts = authorIds.map((authorId) => {
    const count = books.filter((book) => book.author.toString() === authorId.toString()).length
    return count
  })

  return bookCounts
})

module.exports = bookCountLoader