// 💡 @storybook/testing-react is a great addon that allows you to reuse your Storybook 
// stories in your unit tests. By reusing your stories in your tests, you have a catalog 
// of component scenarios ready to be tested. Also, all args, decorators, and other 
// information from your story will be composed by this library. As you just saw, all 
// you have to do in your tests is select which story to render.

import { render } from '@testing-library/react';

import { composeStories } from '@storybook/testing-react';

import * as TaskListStories from './TaskList.stories'; //👈  Our stories imported here

//👇 composeStories will process all information related to the component (e.g., args)
const { WithPinnedTasks } = composeStories(TaskListStories);

// Notice as well that this test is quite brittle. It's possible that as the project 
// matures and the exact implementation of the Task changes--perhaps using a different 
// classname or a textarea rather than an input--the test will fail and need to be updated.
//  It is not necessarily a problem but rather an indication of being careful about using 
//  unit tests for UI. They're not easy to maintain. Instead rely on manual, snapshot, and 
//  visual regression (see testing chapter) tests where possible.

it('renders pinned tasks at the start of the list', () => {
  const { container } = render(<WithPinnedTasks />);

  expect(
    container.querySelector('.list-item:nth-child(1) input[value="Task 6 (pinned)"]')
  ).not.toBe(null);
});
