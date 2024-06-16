const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const mongoose = require('mongoose');
const DoctorSession = require('../models/doctorSessionModel');

describe('DoctorSession Model', function () {
    it('should have a name field of type String and required', function () {
        const nameField = DoctorSession.schema.obj.name;
        expect(nameField).to.exist;
        expect(nameField.type).to.equal(String);
        expect(nameField.required).to.be.true;
    });

    it('should have a shift field of type String and required', function () {
        const shiftField = DoctorSession.schema.obj.shift;
        expect(shiftField).to.exist;
        expect(shiftField.type).to.equal(String);
        expect(shiftField.required).to.be.true;
    });

    it('should have a description field of type String and required', function () {
        const descriptionField = DoctorSession.schema.obj.description;
        expect(descriptionField).to.exist;
        expect(descriptionField.type).to.equal(String);
        expect(descriptionField.required).to.be.true;
    });

    it('should have a doctorId field of type ObjectId referencing User model and required', function () {
        const doctorIdField = DoctorSession.schema.obj.doctorId;
        expect(doctorIdField).to.exist;
        expect(doctorIdField.type).to.equal(mongoose.Schema.Types.ObjectId);
        expect(doctorIdField.ref).to.equal('User');
        expect(doctorIdField.required).to.be.true;
    });
});
