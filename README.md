# Instructions
1. Install dependencies `npm install`
2. Run express server: `npm run dev`
3. Run tests: `npm run test`
4. Run test coverage: `npm run test-coverage`

## Approach
1. Using JSON schema validator to validate incoming requests. (eg: minLength of strings, amounts should be multiples of 0.01 and positive, etc...)
2. Customer info and balances are stored in memory.
3. Bank balances can only have 2 decimal places in amounts.
4. You cannot transfer funds to yourself.
