import React from 'react';
import renderer from 'react-test-renderer';

import Home from '../index';

describe('Home', () => {
    test('Home renders without crashing', () => {
        const tree = renderer.create(
            <Home/>
        ).toJSON()

        expect(tree).toMatchSnapshot()
    })
})