import { shallow, render, mount } from 'enzyme';
import React from 'react';

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.React = React;
global.context = describe;

console.warn = jest.genMockFunction();

console.error = jest.genMockFunction();
