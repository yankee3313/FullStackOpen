const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const bookCountLoader = require('./loaders')

const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const resolvers = {
    Query: {
      authorCount: async () => Author.countDocuments(),
      allBooks: async (root, args) => {
        const author = await Author.findOne({ name: args.author })
        let query = {}
        if (args.author && args.genre) {
          query = { author: author, genres: { $in: args.genre } }
        } else if (args.author) {
          query = { author: author }
        } else if (args.genre) {
          query = { genres: { $in: args.genre } }
        }
        const result = await Book.find(query).populate('author')
        return result
      },
      allAuthors: async () => {
        const result = await Author.find({})
        return result
      },
      allUsers: async () => {
        const result = await User.find({})
        return result
      },
      me: (root, args, context) => {
        return context.currentUser
      },
    },
    Author: {
      bookCount: (author, args,) => {
        return bookCountLoader.load([author._id.toString()])
      },
    },
    Mutation: {
      addBook: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }

        if (args.title.length < 5) {
            throw new GraphQLError('Book title must be at least 5 characters long', {
              extensions: {code: 'FORBIDDEN'}
            })
          }
  
        const newAuthor = await Author.findOne({ name: args.author })
  
        const book = new Book({...args, author: newAuthor.id})
        try {
        const savedBook = await book.save()
        await savedBook.populate('author')

        pubsub.publish('BOOK_ADDED', { bookAdded: savedBook })

        return savedBook

        }catch (error) {
            throw new GraphQLError('Saving user failed', {
              extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.name,
                  error
                }
            })
          }              
      },
  
      editAuthor: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
  
          const author = await Author.findOne({ name: args.name })
          if (!author) {
            return null
          }
          author.born = args.setBornTo
        await author.save()
        return author
    },
  
    addAuthor: async (root, args) => {
      const author = new Author({ name: args.name })
      await author.save()
        return author
    },
  
    createUser: async (root, args) => {
      const user = new User({ username: args.username })
  
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  }, 
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
  }

  module.exports = resolvers