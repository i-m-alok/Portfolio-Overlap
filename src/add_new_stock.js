exports.add = (portfolio, fund, stock) => {
    if (portfolio[fund]) {
        const new_fund = [...portfolio[fund]]
        new_fund.push(stock)
        // console.log(portfolio[fund].length, new_fund.length)
        return { ...portfolio, [fund]: new_fund }
    }
    else {
        console.log("FUND_NOT_FOUND");
    }
    return portfolio
}