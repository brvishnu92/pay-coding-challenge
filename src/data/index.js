let existingCustomers = [
    { id: 'kim61wsq5x7i15ldgp9m522p6tec60', firstName: 'John', lastName: 'Smith', balance: 20.0, created: new Date().toISOString() },
    { id: 'sq5x7i15ldgp9m522p6tec60njkahu', firstName: 'Jason', lastName: 'Star', balance: 12.01, created: new Date().toISOString() }
]


export const getExistingCustomers = () => existingCustomers


export const addCustomer = (newCustomerRecord) => {
    existingCustomers.push(newCustomerRecord)
}


export const updateCustomerRecord = (newCustomerRecord) => {
    existingCustomers = existingCustomers.map(customer => customer.id === newCustomerRecord.id ? newCustomerRecord : customer)
}

