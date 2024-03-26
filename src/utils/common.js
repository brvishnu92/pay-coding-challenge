export const randomString = (length = 30) => [...Array(length)].map(() => Math.random().toString(36)[2]).join('')

export const getSchemaErrorMessage = (errors) => errors ? errors.map(row => row.stack.replaceAll('instance.','').replaceAll('instance ', '').replaceAll('\"',''))[0] : errors
