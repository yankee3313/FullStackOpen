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
      name: 'abcdef',
      username: 'gefae',
      token: '12345',
    }

    const addLikesMock = jest.fn()

    render(<Blog blog={blog} user={user} addLikes={addLikesMock}/>)

    const u = userEvent.setup()
    const viewButton = screen.getByText('view')
    await u.click(viewButton)
    const likeButton = screen.getByText('like')
    await u.click(likeButton)
    await u.click(likeButton)

    expect(addLikesMock.mock.calls).toHaveLength(2)
  })
})
