import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

// Mock axios
jest.mock('../../axios', () => ({
  get: jest.fn(),
}));

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Renders the login form', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Ensure that the login form is rendered
    expect(screen.getByLabelText(/Username/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/ })).toBeInTheDocument();
    expect(screen.getByText(/Create an account/)).toBeInTheDocument();
  });

  test('Handles form submission', async () => {
    // Mock axios response
    const mockData = { success: true, msg: 'Login successful', data: { token: 'mockToken' } };
    require('../../axios').get.mockResolvedValue(mockData);

    // Mock useNavigate
    const mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);

    // Render the component
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Fill in the form and submit
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Username/), { target: { value: 'testuser' } });
      fireEvent.change(screen.getByLabelText(/Password/), { target: { value: 'testpassword' } });
      fireEvent.click(screen.getByRole('button', { name: /Login/ }));
    });

    // Ensure that axios is called with the correct parameters
    expect(require('../../axios').get).toHaveBeenCalledWith('/user/login', {
      params: { username: 'testuser', password: 'testpassword' },
    });

    // Ensure that the success message is displayed
    expect(await screen.findByText(/Login successful/)).toBeInTheDocument();

    // Ensure that useNavigate was called
    expect(mockNavigate).toHaveBeenCalledWith('/homepage');
  });
});

