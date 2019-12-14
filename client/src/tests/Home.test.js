import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../components/Home';

test('Home, renders home page', () => {

  const component = renderer.create(<Home />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});