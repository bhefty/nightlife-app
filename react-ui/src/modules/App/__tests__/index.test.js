import React from 'react';
import renderer from 'react-test-renderer';

import App from '../index';

describe('App', () => {
    test('App renders without crashing', () => {
        const tree = renderer.create(
            <App/>
        ).toJSON()

        expect(tree).toMatchSnapshot()
    })
})