import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
    id
  }
}
`

export const ALL_BOOKS = gql`
query allBooks($author: String, $genre: String) {
  allBooks(author: $author, genre: $genre) {
    title
    author {
      name
    }
    genres
    published
    id
  }
}
`

export const ALL_USERS = gql`
query {
  allUsers  {
    username
    id
    favoriteGenre
  }
}
`

export const UPDATE_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) {
    name
    born
  }
}
`

export const ADD_AUTHOR = gql`
mutation addAuthor($name: String!) {
  addAuthor(
    name: $name
  ) {
    name
    id
    born
    bookCount
  }
}
`

export const CREATE_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author {
      name
    }
    published
    genres
    id
  }
}
`