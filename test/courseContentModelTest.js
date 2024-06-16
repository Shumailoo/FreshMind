const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const mongoose = require('mongoose');
const CourseContent = require('../models/courseContentModel');

describe('CourseContent Model', function () {
    it('should have a content field of type array', function () {
        const contentItemSchema = CourseContent.schema.obj.content;
        expect(contentItemSchema).to.be.an('array');
    });

});
