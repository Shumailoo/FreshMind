const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const { get404, get500 } = require("../controllers/errorController"); // Import your controller functions

describe("Error Controller", () => {
    describe("get404", () => {
        it("should render the 404 error page", () => {
            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                render: sinon.spy(),
            };
            const next = sinon.spy();

            get404(req, res, next);

            expect(res.status.calledWithExactly(404)).to.be.true;
            expect(res.render.calledWithExactly("errors/404")).to.be.true;
            expect(next.notCalled).to.be.true;
        });
    });

    describe("get500", () => {
        it("should render the 500 error page", () => {
            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                render: sinon.spy(),
            };
            const next = sinon.spy();

            get500(req, res, next);

            expect(res.status.calledWithExactly(500)).to.be.true;
            expect(res.render.calledWithExactly("errors/500")).to.be.true;
            expect(next.notCalled).to.be.true;
        });
    });
});
