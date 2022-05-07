const stock_data = require("../stock_data.json");

const calulate_percentage = (stocks_A, stocks_B) => {
    const setA = new Set();

    for (let stock of stocks_A) {
        setA.add(stock)
    }
    let common_count = 0;
    for (let stock of stocks_B) {
        if (setA.has(stock)) {
            common_count += 1;
        }
    }

    return (2 * common_count * 100) / (stocks_A.length + stocks_B.length)
}

exports.find_overlap_percentage = (portfolio, fund_name) => {
    const new_fund_stocks = stock_data.funds.find(x => x.name == fund_name)?.stocks || []
    const overlap_perc = []
    if (new_fund_stocks.length) {
        for (let fund in portfolio) {
            const percentage = calulate_percentage(portfolio[fund], new_fund_stocks);
            if (percentage) {
                console.log(`${fund_name} ${fund} ${percentage.toFixed(2)}%`);
            }
            overlap_perc.push(percentage.toFixed())
        }
        return overlap_perc
    }
    console.log("FUND_NOT_FOUND");
    return overlap_perc
}