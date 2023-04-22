import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()
  const dummyUser = { name: 'Dumb Dumb' }

  render(<BlogForm createBlog={createBlog} user={dummyUser} />)

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('save')

  await act(async () => {
    await user.type(inputs[0], 'Big Titles')
    await user.type(inputs[1], 'Big Authors')
    await user.type(inputs[2], 'www.BigUrls.com')
    await user.click(sendButton)
  })

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Big Titles')
  expect(createBlog.mock.calls[0][0].author).toBe('Big Authors')
  expect(createBlog.mock.calls[0][0].url).toBe('www.BigUrls.com')
})