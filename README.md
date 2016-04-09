# [wallabyjs-issue-550](https://github.com/wallabyjs/public/issues/550)

Somehow rewiring `requires` with `testdouble` is killing Wallaby. I don't know how to explain it otherwise, but if any questions; please ask. I have set up an repository with minimal replicated scenario. You can see that the same case by using `proxyquire` works.

Repeatedly changing `/home` in [tests/post-testdouble.js#L35](https://github.com/smeijer/wallabyjs-issue-550/blob/master/tests/post-testdouble.js#L35 ) to anything different (try remove the e) crashes Wallaby. Repeatedly because the first edit seems to go just fine. It's the second and subsequent call that kills it.

Doing this very same thing in [tests/post-proxyquire-sinon.js#L35](https://github.com/smeijer/wallabyjs-issue-550/blob/master/tests/post-proxyquire-sinon.js#L35) or [tests/post-proxyquire-testdouble.js#L35](https://github.com/smeijer/wallabyjs-issue-550/blob/master/tests/post-proxyquire-testdouble.js#L35) has no effect. Wallaby keeps running just fine.

To verify it is an wallaby issue, and not one of testdouble, I have setup a plain mocha test. Run it with `npm run test` to see nice green checkmarks. The script is setup to keep watching, so while toggling the values as written above, you see that mocha reports errors when appropriate and green check marks otherwise.

```
c:\dev\wallaby-testcase (master)
$ npm run test

  proxyquire with sinon
    √ now stubs Meteor packages
    √ can spy on Meteor packages

  proxyquire with testdouble
    √ now stubs Meteor packages
    √ can spy on Meteor packages

  testdouble
    √ now stubs Meteor packages
    √ can spy on Meteor packages


  6 passing (19ms)
```

Some technical data:
> OS: Windows 10 Home
> IDE: WebStorm 2016.1
> Wallaby.js: https://github.com/smeijer/wallabyjs-issue-550/blob/master/wallaby.js
> Repo: https://github.com/smeijer/wallabyjs-issue-550
