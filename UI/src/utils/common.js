export const getErrorMessageFromApi = error => error ? (error.error || (error.data && error.data.err)) : error
export const formatAmount = amount => new Intl.NumberFormat('en-AU').format(amount)