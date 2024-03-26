import { getExistingCustomers } from "../data/index.js"

export const getBankBalance = async (req, res) => {

    const customers = getExistingCustomers()
    const bankBalance = customers.reduce((amt, { balance }) => parseFloat(amt) + parseFloat(balance), 0)
    res.status(200).json({ balance: parseFloat(bankBalance.toFixed(2)), customers })

}
