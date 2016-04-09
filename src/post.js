import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flowrouter';

export const post = (state, action) => {
  switch (action.type) {
    case 'SAVE_POST':
      return Object.assign({}, state, {
        userId: Meteor.userId(),
      });
    default:
      return state;
  }
};

export const savePost = (data) => {
  const newPost = post(data, {
    type: 'SAVE_POST',
  });

  FlowRouter.go('/home');
};
