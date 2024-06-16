const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const authController = require('../controllers/authController');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

describe('AuthController', function () {
    describe('getLogin', function () {
        it('should render login page with an error message', function () {
            const req = { flash: sinon.stub().returns(['Error message']) };
            const res = { render: sinon.spy() };

            authController.getLogin(req, res, () => {});

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('auth/login', {
                errorMessage: 'Error message'
            })).to.be.true;
        });

        it('should render login page without an error message', function () {
            const req = { flash: sinon.stub().returns([]) };
            const res = { render: sinon.spy() };

            authController.getLogin(req, res, () => {});

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('auth/login', {
                errorMessage: null
            })).to.be.true;
        });
    });

    describe('getSignUp', function () {
        it('should render signup page with an error message', function () {
            const req = { flash: sinon.stub().returns(['Error message']) };
            const res = { render: sinon.spy() };

            authController.getSignUp(req, res, () => {});

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('auth/signup', {
                errorMessage: 'Error message'
            })).to.be.true;
        });

        it('should render signup page without an error message', function () {
            const req = { flash: sinon.stub().returns([]) };
            const res = { render: sinon.spy() };

            authController.getSignUp(req, res, () => {});

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('auth/signup', {
                errorMessage: null
            })).to.be.true;
        });
    });

    
    describe('logout', function () {
        it('should destroy the session and redirect to home', function (done) {
            const req = {
                session: {
                    destroy: function (callback) {
                        callback();
                    }
                }
            };
            const res = { redirect: sinon.spy() };

            authController.logout(req, res, () => {});

            expect(res.redirect.calledOnce).to.be.true;
            expect(res.redirect.calledWith('/')).to.be.true;
            done();
        });
    });
});
