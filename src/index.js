import express from "express";
import cors from "cors";

import { getCustomer, createCustomer, } from "./customer.js";
import { performDeposit, performTransaction, performWithdrawal } from "./transaction.js";
import { getBankBalance } from "./utils/admin.js";


const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.get('/', (_, res) => res.sendStatus(200))

app.post('*', (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ message: 'Invalid request.' })
    return
  }
  next();
})

app.post("/customer", createCustomer);
app.get("/customer/:userId", getCustomer);

app.post("/transaction", performTransaction);
app.post("/transaction/withdraw", performWithdrawal);
app.post("/transaction/deposit", performDeposit);

app.get("/bankBalance", getBankBalance);

app.all('*', function (req, res) {
  res.status(400).json({ message: 'Invalid route.' })
})

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
})
