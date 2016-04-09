/* eslint-env mocha */
import { expect } from 'chai';
import td from 'testdouble';

const Meteor = td.object(['userId']);
const FlowRouter = td.object(['go']);

td.replace('meteor/meteor', { Meteor });
td.replace('meteor/kadira:flowrouter', { FlowRouter });

//BUG: THE LINE BELOW SEEMS TO KILL WALLABY
const { post, savePost } = require('../src/post.js');

describe('testdouble', () => {
  before(() => {
    td.when(Meteor.userId()).thenReturn('user_1');
  });

  it('now stubs Meteor packages', () => {
    const result = post(
      { title: 'foo', body: 'bar' },
      { type: 'SAVE_POST' }
    );

    expect(result).to.have.property('userId', 'user_1');
  });

  it('can spy on Meteor packages', () => {
    const result = savePost(
      { title: 'foo', body: 'bar' },
      { type: 'SAVE_POST' }
    );

    //TODO: TEST THE KILL BY CHANGING '/home' A FEW TIMES
    td.verify(FlowRouter.go('/home'));
  });
});
