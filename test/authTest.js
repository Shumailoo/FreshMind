// const chai = require('chai');
// const sinon = require('sinon');
// const expect = chai.expect;

// const isLoggedIn = require('../middlewares/auth');

// describe('Auth middleware', function () {
//     it('should redirect to /login if user is not logged in', function () {
//         const req = { session: { isLoggedIn: false }, url: '/' };
//         const res = { redirect: sinon.spy() };
//         const next = sinon.spy();

//         isLoggedIn(req, res, next);

//         expect(res.redirect.calledOnce).to.be.true;
//         expect(res.redirect.calledWith('/login')).to.be.true;
//         expect(next.called).to.be.false;
//     });

//     it('should call next() if user is logged in', function () {
//         const req = { session: { isLoggedIn: true }, url: '/' };
//         const res = {};
//         const next = sinon.spy();

//         isLoggedIn(req, res, next);

//         expect(next.calledOnce).to.be.true;
//     });
// });
