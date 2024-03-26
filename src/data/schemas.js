import { Validator } from 'jsonschema'

const schemaValidator = new Validator();

export const customerSchema = {
    id: '/Customer',
    type: 'object',
    properties: {
        firstName: { type: 'string', minLength: 1, },
        lastName: { type: 'string', minLength: 1, },
        openingBalance: { type: 'number', minimum: 0.01, multipleOf: 0.01 }
    },
    required: ['firstName', 'lastName', 'openingBalance']
}

export const transactionSchema = {
    id: '/Transaction',
    type: 'object',
    properties: {
        userId: { type: 'string', minLength: 1 },
        recipientId: { type: 'string', minLength: 1, },
        amount: { type: 'number', 'minimum': 0.01, multipleOf: 0.01 }
    },
    required: ['userId', 'recipientId', 'amount']
}

export const depositOrWithdrawSchema = {
    id: '/DepositWithdraw',
    type: 'object',
    properties: {
        userId: { type: 'string', minLength: 1 },
        amount: { type: 'number', 'minimum': 0.01, multipleOf: 0.01 }
    },
    required: ['userId', 'amount']
}

schemaValidator.addSchema(customerSchema, '/Customer');
schemaValidator.addSchema(transactionSchema, '/Transaction');
schemaValidator.addSchema(depositOrWithdrawSchema, '/DepositWithdraw');

export default schemaValidator