const assert = require("assert")
const current_portfolio = require("./src/current_portfolio")
const add_new_stock = require("./src/add_new_stock")
const calculate_overlap = require("./src/calculate_overlap")
const source = require("./src")

describe('calculateOverlap', function () {
    //Add your code here
    let portfolio;
    const mutual_funds = ["AXIS_BLUECHIP", "ICICI_PRU_BLUECHIP", "UTI_NIFTY_INDEX"];
    it("Portfolio should be object", () => {
        portfolio = current_portfolio.retrive(mutual_funds)
        assert.equal(typeof portfolio, 'object');
    })

    it("No mutual fund is passed", () => {
        assert.deepStrictEqual(current_portfolio.retrive(), {})
    })

    it("Check if we add stock in fund which is not present", () => {
        assert.deepStrictEqual(add_new_stock.add(portfolio, "ICICI_PRU_NIFTY_NEXT_50_INDEX", "TCS"), portfolio);
    })

    it("Adding a new stock", () => {
        const new_portfolio = add_new_stock.add(portfolio, "AXIS_BLUECHIP", "TCS")
        // console.log(new_portfolio)
        assert.equal(new_portfolio["AXIS_BLUECHIP"].length, portfolio["AXIS_BLUECHIP"].length + 1);
    })

    it("Calculate Overlap for existing fund", () => {
        assert.notEqual(calculate_overlap.find_overlap_percentage(portfolio, "ICICI_PRU_BLUECHIP").length, 0)
    })

    it("Calculate Overlap for non-existing fund", () => {
        assert.equal(calculate_overlap.find_overlap_percentage(portfolio, "SMALLCASE_FLEXI").length, 0)
    })
});


describe("addStock", () => {
    let portfolio;
    const mutual_funds = ["AXIS_BLUECHIP", "ICICI_PRU_BLUECHIP", "UTI_NIFTY_INDEX"];
    // retrive porfolio
    portfolio = current_portfolio.retrive(mutual_funds)
    // added a new stock
    portfolio = add_new_stock.add(portfolio, "AXIS_BLUECHIP", "TCS")

    it("Check for valid commands", () => {
        const inputLines = [
            'CURRENT_PORTFOLIO AXIS_BLUECHIP ICICI_PRU_BLUECHIP UTI_NIFTY_INDEX\r',
            'CALCULATE_OVERLAP ICICI_PRU_BLUECHIP\r',
            'ADD_STOCK AXIS_BLUECHIP TCS\r'
        ]
        assert.deepStrictEqual(source.processInputLines(inputLines), portfolio)
    })

    it("Invalid command", () => {
        const inputLines = [
            "INVALID_COMMAND"
        ]
        assert.throws(() => source.processInputLines(inputLines), Error, "PLEASE RUN THE PROPER COMMAND")
    })
})