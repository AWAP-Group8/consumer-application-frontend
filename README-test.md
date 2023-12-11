# React Authentication Components Testing

This repository contains tests for two authentication components: `Register` and `Login` in a React application. The testing is done using the `@testing-library/react` library and Jest.

## Register Component Tests

### Test 1: Renders Register Form

**File:** `Register.test.js`

**Objective:** Ensure that the registration form renders correctly.

**Steps:**
1. Render the `Register` component within a `BrowserRouter`.
2. Check the presence of form elements: username, password, repassword, email, and the submit button.

### Test 2: Handles Form Submission

**File:** `Register.test.js`

**Objective:** Verify that the registration form handles submissions correctly.

**Steps:**
1. Mock the Axios post request to simulate a successful registration response.
2. Render the `Register` component within a `BrowserRouter`.
3. Simulate user input for username, password, repassword, and email.
4. Trigger form submission.
5. Ensure that Axios is called with the correct parameters.
6. Verify that the success message is displayed.

## Login Component Tests

### Test 1: Renders Login Form

**File:** `Login.test.js`

**Objective:** Ensure that the login form renders correctly.

**Steps:**
1. Render the `Login` component within a `BrowserRouter`.
2. Check the presence of form elements: username, password, login button, and the link to create an account.

### Test 2: Handles Form Submission

**File:** `Login.test.js`

**Objective:** Verify that the login form handles submissions correctly.

**Steps:**
1. Mock the Axios get request to simulate a successful login response.
2. Mock the `useNavigate` function from `react-router-dom` to simulate navigation.
3. Render the `Login` component within a `BrowserRouter`.
4. Simulate user input for username and password.
5. Trigger form submission.
6. Ensure that Axios is called with the correct parameters.
7. Verify that the success message is displayed.
8. Ensure that `useNavigate` is called with the expected route (`/homepage`).

## Usage

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run tests with `npm test`.

## Notes

- Axios calls are mocked to simulate API responses.
- The `act` function from `react-dom/test-utils` is used to wait for asynchronous actions.
- `jest.mock` is used to mock external modules, such as Axios and `react-router-dom` functions.

These tests ensure that the authentication components render correctly, handle form submissions as expected, and interact with external dependencies appropriately.
