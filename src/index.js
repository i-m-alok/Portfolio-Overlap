const constants = require("../constants")
const current_portfolio = require("./current_portfolio")
const calculate_overlap = require("./calculate_overlap")
const add_new_stock = require("./add_new_stock")

exports.processInputLines = function (inputLines) {
    let portfolio = {}
    for (let i of inputLines) {
        const input = i.replace("\r", "")?.split(" ")
        const [commandType, ...restInput] = input
        switch (commandType) {
            case constants.ADD_STOCK:
                const [fund, ...stock] = restInput;
                portfolio = add_new_stock.add(portfolio, fund, stock.join(" "))
                break
            case constants.CALCULATE_OVERLAP:
                for (let funds of restInput) {
                    calculate_overlap.find_overlap_percentage(portfolio, funds)
                }
                break
            case constants.CURRENT_PORTFOLIO:
                portfolio = current_portfolio.retrive(restInput)
                break
            default:
                throw new Error("PLEASE RUN THE PROPER COMMAND")
        }
    }
    return portfolio
}