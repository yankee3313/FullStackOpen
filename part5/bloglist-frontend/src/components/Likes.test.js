import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog', () => {
  test('clicking like button twice calls event handler twice', async () => {
    const blog = {
      title: 'Testing123',
      author: 'Test Man',
      url: 'https://bigtests.com',
      likes: 0,
      user: {
        name: 'Testguy',
        username: 'testerman',
      },
    }

    const user = {
      name: 'Superuser',
      username: 'root',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…g3Mn0.TIqpPqI8ihU-PETVw20FtQ6VccoXyBQJILFwN8Z3Lso',
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} user={user} addLikes={mockHandler} />)

    const u = userEvent.setup()
    const viewButton = screen.getByText('view')
    await u.click(viewButton)
    const likeButton = screen.getByText('like')
    await u.click(likeButton)
    await u.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
