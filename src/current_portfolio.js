const stock_data = require("../stock_data.json")

exports.retrive = (mutual_funds = []) => {
    const portfolio = {}

    for (let fund of mutual_funds) {
        portfolio[fund] = stock_data.funds.find(item => item.name == fund).stocks;
    }

    return portfolio
}