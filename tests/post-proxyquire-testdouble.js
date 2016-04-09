/* eslint-env mocha */
import { expect } from 'chai';
import proxyquire from 'proxyquire';
import td from 'testdouble';

const Meteor = { userId: td.function() };
const FlowRouter = { go: td.function() };

const { post, savePost } = proxyquire('../src/post.js', {
  'meteor/meteor': { Meteor, '@noCallThru': true },
  'meteor/kadira:flowrouter': { FlowRouter, '@noCallThru': true },
});

describe('proxyquire with testdouble', () => {
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

    //TODO: CHANGE '/home' A FEW TIMES, EVERYTHING WORKS FINE
    td.verify(FlowRouter.go('/home'));
  });
});
