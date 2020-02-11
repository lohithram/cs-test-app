import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme'
import App from './App';

test('renders learn react link', () => {
  const { getByPlaceholderText } = render(<App />);
  const searchInput = getByPlaceholderText(/Search github users/i);
  expect(searchInput).toBeInTheDocument();
});

describe("App.tsx", () => {
  it("Renders the type ahead text input", () => {
    const SUT = shallow(<App/>)
    expect(SUT.find('TypeAhead').length).toEqual(1)
  })
})
