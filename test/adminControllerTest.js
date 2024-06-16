const sinon = require("sinon");
const expect = require("chai").expect;
const mongoose = require("mongoose");
const path = require("path");

const adminController = require("../controllers/adminController");
const User = require("../models/userModel");
const Course = require("../models/courseModel");
const DoctorSession = require("../models/doctorSessionModel");
const CourseContent = require("../models/courseContentModel");

describe("Admin Controller-getCourses", function () {
    before(async function () {
        try {
            await mongoose.connect(
                "mongodb+srv://shumail:milo2002@cluster0.n7mu9qa.mongodb.net/webProjectFreshMindTesting"
            );

            const user = new User({
                email: "admin@admin.com",
                password: "12345678",
                username: "Test",
                role: "Admin",
                _id: "664bff759ea08b323ea95504",
                courses: [],
                docSessions: [],
            });

            await user.save();
            console.log("User saved successfully");
        } catch (err) {
            console.error("Error in before hook:", err);
            throw err; // Ensure the error is thrown so the test suite knows it failed
        }
    });

    it('should fetch all courses and render the courses page', async function () {
        const req = { user: { _id: '12345', role: 'Admin' } };
        const res = { render: sinon.spy(), status: sinon.stub().returnsThis(), send: sinon.spy() };
        const courses = [{ name: 'Course1' }, { name: 'Course2' }];

        // Stub Course.find to return a resolved promise with courses
        const courseFindStub = sinon.stub(Course, 'find').resolves(courses);

        await adminController.getCourses(req, res);

        expect(courseFindStub.calledOnce).to.be.true;
        expect(res.render.calledOnce).to.be.true;
        expect(res.render.calledWith('pages/courses', { courses, user: req.user })).to.be.true;

        courseFindStub.restore();
    });

    it('should handle errors and respond with 500', async () => {
        const req = { user: { _id: '664bff759ea08b323ea95504', role: 'Admin' } };
        const res = { render: sinon.spy(), status: sinon.stub().returnsThis(), send: sinon.spy() };

        const error = new Error('Database error');
        sinon.stub(Course, 'find').rejects(error);

        await adminController.getCourses(req, res);

        expect(Course.find.calledOnce).to.be.true;
        expect(res.status.calledOnce).to.be.true;
        expect(res.status.calledWith(500)).to.be.true;
        expect(res.send.calledOnce).to.be.true;
        expect(res.send.calledWith('Internal Server Error')).to.be.true;

        Course.find.restore();
    });

    after(function (done) {
        User.deleteMany({})
            .then(() => {
                return mongoose.disconnect();
            })
            .then(() => {
                done();
            });
    });
});


describe('AdminController - postCourses', function () {
    before(async function () {
        try {
            await mongoose.connect(
                "mongodb+srv://shumail:milo2002@cluster0.n7mu9qa.mongodb.net/webProjectFreshMindTesting"
            );

            const user = new User({
                email: "admin@admin.com",
                password: "12345678",
                username: "Test",
                role: "Admin",
                _id: "664bff759ea08b323ea95504",
                courses: [],
                docSessions: [],
            });

            await user.save();
            console.log("User saved successfully");
        } catch (err) {
            console.error("Error in before hook:", err);
            throw err; // Ensure the error is thrown so the test suite knows it failed
        }
    });
    it('should create a new course and update the user, then render the dashboard', async function () {
        const req = {
            body: { name: 'New Course', description: 'Course Description', range: 'Beginner' },
            user: { _id: '12345', role: 'Admin' }
        };
        const res = { render: sinon.spy(), status: sinon.stub().returnsThis(), send: sinon.spy() };

        const newCourse = { _id: '67890', name: 'New Course' };
        const user = { _id: '12345', courses: [], save: sinon.stub().resolves() };
        const users = [{ role: 'Member' }, { role: 'Doctor' }];
        const courses = [newCourse];
        const sessions = [{}, {}];

        // Stub the necessary database calls
        sinon.stub(Course, 'create').resolves(newCourse);
        sinon.stub(User, 'findById').resolves(user);
        sinon.stub(User, 'find').resolves(users);
        sinon.stub(Course, 'find').resolves(courses);
        sinon.stub(DoctorSession, 'find').resolves(sessions);

        await adminController.postCourses(req, res);

        expect(Course.create.calledOnce).to.be.true;
        expect(Course.create.calledWith({
            name: 'New Course',
            description: 'Course Description',
            range: 'Beginner'
        })).to.be.true;

        expect(User.findById.calledOnce).to.be.true;
        expect(user.courses).to.include(newCourse._id);
        expect(user.save.calledOnce).to.be.true;

        expect(User.find.calledOnce).to.be.true;
        expect(Course.find.calledOnce).to.be.true;
        expect(DoctorSession.find.calledOnce).to.be.true;

        expect(res.render.calledOnce).to.be.true;
        expect(res.render.calledWith('pages/dashboard', {
            user: req.user,
            users,
            courses,
            sessions,
            allMembers: users.filter(user => user.role === 'Member'),
            allDoctors: users.filter(user => user.role === 'Doctor'),
            allCourses: courses,
            allSessions: sessions
        })).to.be.true;

        // Restore the stubs
        Course.create.restore();
        User.findById.restore();
        User.find.restore();
        Course.find.restore();
        DoctorSession.find.restore();
    });

    it('should handle errors and respond with 500', async function () {
        const req = {
            body: { name: 'New Course', description: 'Course Description', range: 'Beginner' },
            user: { _id: '12345', role: 'Admin' }
        };
        const res = { render: sinon.spy(), status: sinon.stub().returnsThis(), send: sinon.spy() };

        const error = new Error('Database error');

        // Stub the necessary database calls to reject with an error
        sinon.stub(Course, 'create').rejects(error);

        await adminController.postCourses(req, res);

        expect(Course.create.calledOnce).to.be.true;
        expect(res.status.calledOnce).to.be.true;
        expect(res.status.calledWith(500)).to.be.true;
        expect(res.send.calledOnce).to.be.true;
        expect(res.send.calledWith('Internal Server Error')).to.be.true;

        // Restore the stubs
        Course.create.restore();
    });
    after(function (done) {
        User.deleteMany({})
            .then(() => {
                return mongoose.disconnect();
            })
            .then(() => {
                done();
            });
    });
});