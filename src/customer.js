import schemaValidator, { customerSchema } from "./data/schemas.js"
import { randomString, getSchemaErrorMessage } from "./utils/common.js"
import { addCustomer, getExistingCustomers } from "./data/index.js"

export const createCustomer = async (req, res) => {

    const { firstName, lastName, openingBalance } = req.body
    const payload = { firstName, lastName, openingBalance }

    const validateCustomer = schemaValidator.validate(payload, customerSchema)
    if (!validateCustomer.valid) {
        res.status(400).json({ message: getSchemaErrorMessage(validateCustomer.errors) })
        return
    }

    const newUserId = randomString()
    addCustomer({ id: newUserId, firstName, lastName, balance: openingBalance, created: new Date().toISOString() })

    res.status(201).json({ data: { message: 'User Created', id: newUserId } })
}

export const getCustomer = async (req, res) => {
    const userId = req.params.userId

    if (!userId) {
        res.status(400).json({ message: 'Invalid userId provided.' })
        return
    }

    const matchingCustomer = getExistingCustomers().find(({ id }) => id === userId)

    if (!matchingCustomer) {
        res.status(400).json({ message: 'Customer does not exist for that id.' })
        return
    }

    res.status(200).json(matchingCustomer)

}
