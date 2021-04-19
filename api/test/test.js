const { expect } = require("chai");
const app = require("../app");

let chai = require("chai");
let chaiHttp = require("chai-http");

chai.use(chaiHttp)

describe("Check median", () => {
    it("if value is even returns 2 values", (done) => {
        chai.request(app)
        .post("/primeNumbers")
        .send({
            max : "10"
        })
        .end((_,res) => {
            expect(res.body).to.have.property("median")
            expect(res.body.median.length).to.equal(2)
            done()
        })
    })

    it("if value is odd returns 1 value", (done) => {
        chai.request(app)
        .post("/primeNumbers")
        .send({
            max : "100"
        })
        .end((_,res) => {
            expect(res.body).to.have.property("median")
            expect(res.body.median.length).to.equal(1)
            done()
        })
    })
    
    it("Median for prime numbers below 10", (done) => {
        chai.request(app)
        .post("/primeNumbers")
        .send({
            max : "10"
        })
        .end((_,res) => {
            expect(res.body).to.have.property("median")
            expect(res.body.median[0]).to.equal(3)
            expect(res.body.median[1]).to.equal(5)
            done()
        })
    })

    it("Median for prime numbers below 100", (done) => {
        chai.request(app)
        .post("/primeNumbers")
        .send({
            max : "100"
        })
        .end((_,res) => {
            expect(res.body).to.have.property("median")
            expect(res.body.median[0]).to.equal(41)
            done()
        })
    })
})