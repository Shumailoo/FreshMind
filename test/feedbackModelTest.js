const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const mongoose = require('mongoose');
const Feedback = require('../models/feedbackModel');

describe('Feedback Model', function () {

    it('should have a name field of type String and required', function () {
        const nameField = Feedback.schema.obj.name;
        expect(nameField).to.exist;
        expect(nameField.type).to.equal(String);
        expect(nameField.required).to.be.true;
    });

    it('should have an email field of type String and required', function () {
        const emailField = Feedback.schema.obj.email;
        expect(emailField).to.exist;
        expect(emailField.type).to.equal(String);
        expect(emailField.required).to.be.true;
    });

    it('should have a rating field of type Number, required, and within range 1 to 5', function () {
        const ratingField = Feedback.schema.obj.rating;
        expect(ratingField).to.exist;
        expect(ratingField.type).to.equal(Number);
        expect(ratingField.required).to.be.true;
        expect(ratingField.min).to.equal(1);
        expect(ratingField.max).to.equal(5);
    });

    it('should have a comments field of type String and required', function () {
        const commentsField = Feedback.schema.obj.comments;
        expect(commentsField).to.exist;
        expect(commentsField.type).to.equal(String);
        expect(commentsField.required).to.be.true;
    });

    it('should have a createdAt field of type Date with default value', function () {
        const createdAtField = Feedback.schema.obj.createdAt;
        expect(createdAtField).to.exist;
        expect(createdAtField.type).to.equal(Date);
        expect(createdAtField.default).to.equal(Date.now);
    });
});
