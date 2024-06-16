const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const mongoose = require('mongoose');
const User = require('../models/userModel');

describe('User Model', function () {

    it('should have a username field of type String and required', function () {
        const usernameField = User.schema.obj.username;
        expect(usernameField).to.exist;
        expect(usernameField.type).to.equal(String);
        expect(usernameField.required).to.be.true;
    });

    it('should have an email field of type String and required', function () {
        const emailField = User.schema.obj.email;
        expect(emailField).to.exist;
        expect(emailField.type).to.equal(String);
        expect(emailField.required).to.be.true;
    });

    it('should have a password field of type String and required', function () {
        const passwordField = User.schema.obj.password;
        expect(passwordField).to.exist;
        expect(passwordField.type).to.equal(String);
        expect(passwordField.required).to.be.true;
    });

    it('should have a role field of type String with enum values and required', function () {
        const roleField = User.schema.obj.role;
        expect(roleField).to.exist;
        expect(roleField.type).to.equal(String);
        expect(roleField.enum).to.deep.equal(['Admin', 'Doctor', 'Member']);
        expect(roleField.required).to.be.true;
    });

    it('should have a courses field of type array referencing Course model', function () {
        const coursesField = User.schema.obj.courses;
        expect(coursesField).to.exist;
        expect(coursesField).to.be.an('array');
        expect(coursesField[0].type).to.equal(mongoose.Schema.Types.ObjectId);
        expect(coursesField[0].ref).to.equal('Course');
    });

    it('should have a docSessions field of type array referencing DoctorSession model', function () {
        const docSessionsField = User.schema.obj.docSessions;
        expect(docSessionsField).to.exist;
        expect(docSessionsField).to.be.an('array');
        expect(docSessionsField[0].type).to.equal(mongoose.Schema.Types.ObjectId);
        expect(docSessionsField[0].ref).to.equal('DoctorSession');
    });

    it('should have a bio field of type String', function () {
        const bioField = User.schema.obj.bio;
        expect(bioField).to.exist;
        expect(bioField.type).to.equal(String);
    });
});
