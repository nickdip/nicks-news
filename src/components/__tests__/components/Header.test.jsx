import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Header from '../../Header';
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from '../../../contexts/UserContext.jsx'
import LoadingProvider from '../../../contexts/LoadingContext.jsx'
import UserContext from '../../../contexts/UserContext.jsx'
import { axe, toHaveNoViolations } from 'jest-axe' // for accessibility testing


expect.extend(toHaveNoViolations)

test('renders header', () => {
  render(
    <BrowserRouter>
    <UserProvider>
    <LoadingProvider>
    <Header />
    </LoadingProvider>
    </UserProvider>
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/nicks news/i);
  expect(linkElement).toBeInTheDocument();
});

test('shows login link when user is not logged in', () => {
  render(
    <BrowserRouter>
    <UserProvider user={null}>
    <LoadingProvider>
    <Header />
    </LoadingProvider>
    </UserProvider>
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/log in/i);
  expect(linkElement).toBeInTheDocument();
});


test('shows user profile when logged in', () => {
  render(
    <BrowserRouter>
    <UserContext.Provider value={{ user: {username: "tickle122"} }}>
      <Header />
    </UserContext.Provider>
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/log out/i);
  expect(linkElement).toBeInTheDocument();
  })

test('shows the number of users', () => {
  render(
    <BrowserRouter>
    <UserProvider>
    <LoadingProvider>
    <Header />
    </LoadingProvider>
    </UserProvider>
    </BrowserRouter>
  );



  const linkElement = screen.getByText(/users/i);

  expect(linkElement).toBeInTheDocument();
  })

test('shows the date', () => {
  render(
    <BrowserRouter>
    <UserProvider>
    <LoadingProvider>
    <Header />
    </LoadingProvider>
    </UserProvider>
    </BrowserRouter>
  );

  const todaysDate = new Date().toUTCString().slice(0, 16)

  const dateRegex = new RegExp(todaysDate, 'g');


  const linkElement = screen.getByText(dateRegex);


  expect(linkElement).toBeInTheDocument();
})

test('has no accessibility violations', async () => {
  const { container } = render(
    <BrowserRouter>
    <UserProvider>
    <LoadingProvider>
    <Header />
    </LoadingProvider>
    </UserProvider>
    </BrowserRouter>
  );
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})