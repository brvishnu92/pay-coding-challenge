import schemaValidator, { depositOrWithdrawSchema, transactionSchema } from "./data/schemas.js"
import { getSchemaErrorMessage } from "./utils/common.js"
import { getExistingCustomers, updateCustomerRecord } from "./data/index.js"


const updateBalance = (matchingCustomer, newBalance) => {
    const newCustomerObj = { ...matchingCustomer, balance: parseFloat(newBalance.toFixed(2)) }
    updateCustomerRecord(newCustomerObj)
}

export const performWithdrawal = async (req, res) => {

    const { amount, userId } = req.body

    const validateTransaction = schemaValidator.validate({ amount, userId }, depositOrWithdrawSchema)
    if (!validateTransaction.valid) {
        res.status(400).json({ message: getSchemaErrorMessage(validateTransaction.errors) })
        return
    }

    const matchingCustomer = getExistingCustomers().find(({ id }) => userId === id)

    if (!matchingCustomer) {
        res.status(400).json({ message: 'Customer doesn\'t exist for that id.' })
        return
    }

    if (matchingCustomer.balance < amount) {
        res.status(400).json({ message: 'Insufficient funds.' })
        return
    }
    const newBalance = matchingCustomer.balance - amount
    updateBalance(matchingCustomer, newBalance)

    res.status(200).json({ message: 'Withdrawal successful.' })

}

export const performDeposit = async (req, res) => {

    const { amount, userId } = req.body

    const validateTransaction = schemaValidator.validate({ amount, userId }, depositOrWithdrawSchema)
    if (!validateTransaction.valid) {
        res.status(400).json({ message: getSchemaErrorMessage(validateTransaction.errors) })
        return
    }

    const matchingCustomer = getExistingCustomers().find(({ id }) => userId === id)

    if (!matchingCustomer) {
        res.status(400).json({ message: 'Customer doesn\'t exist for that id.' })
        return
    }

    const newBalance = matchingCustomer.balance + amount
    updateBalance(matchingCustomer, newBalance)


    res.status(200).json({ message: 'Deposited amount.' })

}

export const performTransaction = async (req, res) => {

    const { amount, userId, recipientId } = req.body

    const validateTransaction = schemaValidator.validate({ amount, userId, recipientId }, transactionSchema)
    if (!validateTransaction.valid) {
        res.status(400).json({ message: getSchemaErrorMessage(validateTransaction.errors) })
        return
    }

    const matchingSender = getExistingCustomers().find(({ id }) => userId === id)
    const matchingRecipient = getExistingCustomers().find(({ id }) => recipientId === id)

    if (!matchingSender || !matchingRecipient) {
        res.status(400).json({ message: 'Customer or Recipient doesn\'t exist.' })
        return
    }

    if (matchingSender.id === matchingRecipient.id) {
        res.status(400).json({ message: 'You cannot send money to yourself.' })
        return
    }

    if (matchingSender.balance < amount) {
        res.status(400).json({ message: 'Insufficient funds.' })
        return
    }

    const newRecipientBalance = matchingRecipient.balance + amount
    updateBalance(matchingRecipient, newRecipientBalance)


    const newSenderBalance = matchingSender.balance - amount
    updateBalance(matchingSender, newSenderBalance)


    res.status(200).json({ message: 'Amount transferred.' })

}