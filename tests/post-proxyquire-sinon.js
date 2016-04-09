/* eslint-env mocha */
import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

const Meteor = { userId: sinon.stub() };
const FlowRouter = { go: sinon.spy() };

const { post, savePost } = proxyquire('../src/post.js', {
  'meteor/meteor': { Meteor, '@noCallThru': true },
  'meteor/kadira:flowrouter': { FlowRouter, '@noCallThru': true },
});

describe('proxyquire with sinon', () => {
  before(() => {
    Meteor.userId.returns('user_1');
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
    expect(FlowRouter.go.calledWith('/home')).to.be.true;
  });
});
