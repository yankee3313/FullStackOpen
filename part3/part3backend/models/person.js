const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: function(val) {
        return val.length >= 3
      },
      message: () => 'Name must be at least 3 letters long'
    },
    required: [true, 'Name required'] },
  number: {
    type: String,
    validate: {
      validator: function(v) { return /^([\d]{3})-([\d]{3})-([\d]{4})$/.test(v)
      },
      message: props => `${props.value} is not in the format 000-000-0000`
    },
    required: [true, 'Phone number required'] }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)