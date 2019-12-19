import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../components/Home';

test('simple case', () => {
  expect(2+2).toEqual(4);
})

test('Home, renders home page', () => {

  const component = renderer.create(<Home />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});