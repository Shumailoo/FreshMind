const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const mongoose = require('mongoose');
const Course = require('../models/courseModel');

describe('Course Model', function () {
    it('should have a name field of type String and required', function () {
        const nameField = Course.schema.obj.name;
        expect(nameField).to.exist;
        expect(nameField.type).to.equal(String);
        expect(nameField.required).to.be.true;
    });

    it('should have a range field of type Number and required', function () {
        const rangeField = Course.schema.obj.range;
        expect(rangeField).to.exist;
        expect(rangeField.type).to.equal(Number);
        expect(rangeField.required).to.be.true;
    });

    it('should have a description field of type String and required', function () {
        const descriptionField = Course.schema.obj.description;
        expect(descriptionField).to.exist;
        expect(descriptionField.type).to.equal(String);
        expect(descriptionField.required).to.be.true;
    });

    it('should have a courseContent field of type array referencing CourseContent model', function () {
        const courseContentField = Course.schema.obj.courseContent;
        expect(courseContentField).to.exist;
        expect(courseContentField).to.be.an('array');
        expect(courseContentField[0].type).to.equal(mongoose.Schema.Types.ObjectId);
        expect(courseContentField[0].ref).to.equal('CourseContent');
    });
});
