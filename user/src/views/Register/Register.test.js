import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import Register from './Register';

// Mock axios
jest.mock('../../axios', () => ({
  post: jest.fn(),
}));

describe('Register Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders register form', async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Ensure that the register form is rendered
    expect(screen.getByLabelText(/Username/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Repassword/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/ })).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    // Mock axios response
    const mockData = { success: true, msg: 'Registration successful' };
    require('../../axios').post.mockResolvedValue(mockData);

    // Render the component
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Fill in the form and submit
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Username/), { target: { value: 'testuser' } });
      fireEvent.change(screen.getByLabelText(/Password/), { target: { value: 'testpassword' } });
      fireEvent.change(screen.getByLabelText(/Repassword/), { target: { value: 'testpassword' } });
      fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'test@example.com' } });
      fireEvent.click(screen.getByRole('button', { name: /Sign in/ }));
    });

    // Ensure that axios is called with the correct parameters
    expect(require('../../axios').post).toHaveBeenCalledWith('/user/register', {
      username: 'testuser',
      password: 'testpassword',
      repassword: 'testpassword',
      email: 'test@example.com',
    });

    // Ensure that the success message is displayed
    expect(await screen.findByText(/Registration successful/)).toBeInTheDocument();
  });
});
