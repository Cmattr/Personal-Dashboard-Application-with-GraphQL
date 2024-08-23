import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import ToDos from '../components/Todos';
import { GET_TODO } from '../Queries/Queries';

// Define the mock data for the query
const mocks = [
  {
    request: {
      query: GET_TODO,
      variables: { todoId: '1' },
    },
    result: {
      data: {
        todo: {
          id: '1',
          title: 'Test Todo',
          completed: true,
        },
      },
    },
  },
];

test('renders todo details when data is fetched', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ToDos todoId="1" />
    </MockedProvider>
  );

  // Wait for the async data to load and check if the todo details are rendered
  expect(await screen.findByText('Todo Details:')).toBeInTheDocument();
  expect(await screen.findByText('ID: 1')).toBeInTheDocument();
  expect(await screen.findByText('Title: Test Todo')).toBeInTheDocument();
  expect(await screen.findByText('Completed: Yes')).toBeInTheDocument();
});