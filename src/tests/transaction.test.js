import { createCustomer, getCustomer } from "../customer"
import { getExistingCustomers } from "../data";
import { performDeposit, performTransaction, performWithdrawal } from "../transaction";


test("performDeposit throws error on invalid customerId", async () => {
    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    }

    const req = {
        body: { userId: '123', amount: 10 }
    };

    await performDeposit(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status().json).toHaveBeenCalledWith({ "message": "Customer doesn't exist for that id." });
});

test("performDeposit throws error on negative amount", async () => {
    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    }

    const existingCustomer = getExistingCustomers()[0]

    const req = {
        body: { userId: existingCustomer.id, amount: -10 }
    };

    await performDeposit(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status().json).toHaveBeenCalledWith({ "message": "amount must be greater than or equal to 0.01" });
});


test("performDeposit passes on valid request", async () => {
    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    }

    const existingCustomer = getExistingCustomers()[0]

    const req = {
        body: { userId: existingCustomer.id, amount: 10 }
    };

    await performDeposit(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status().json).toHaveBeenCalledWith({ "message": "Deposited amount." });
});


test("performWithdrawal throws error on invalid customerId", async () => {
    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    }

    // const existingCustomer = getExistingCustomers()[0]

    const req = {
        body: { userId: '123', amount: 10 }
    };

    await performWithdrawal(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status().json).toHaveBeenCalledWith({ "message": "Customer doesn't exist for that id." });
});

test("performWithdrawal throws error on negative amount", async () => {
    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    }

    const existingCustomer = getExistingCustomers()[0]

    const req = {
        body: { userId: existingCustomer.id, amount: -10 }
    };

    await performWithdrawal(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status().json).toHaveBeenCalledWith({ "message": "amount must be greater than or equal to 0.01" });
});

test("performWithdrawal throws error on invalid amount", async () => {
    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    }

    const existingCustomer = getExistingCustomers()[0]

    const req = {
        body: { userId: existingCustomer.id, amount: 10.0009 }
    };

    await performWithdrawal(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status().json).toHaveBeenCalledWith({ "message": "amount is not a multiple of (divisible by) 0.01" });
});


test("performWithdrawal fails on insufficient funds", async () => {
    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    }

    const firstCustomer = getExistingCustomers()[0]
    const req = {
        body: { userId: firstCustomer.id, amount: 100,  }
    };

    await performWithdrawal(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status().json).toHaveBeenCalledWith({ "message": "Insufficient funds." });
});


test("performWithdrawal passes on valid request", async () => {
    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    }

    const existingCustomer = getExistingCustomers()[1]

    const req = {
        body: { userId: existingCustomer.id, amount: 10 }
    };

    await performWithdrawal(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status().json).toHaveBeenCalledWith({ "message": "Withdrawal successful." });
    expect(getExistingCustomers()[1].balance).toBe(2.01)
});



test("performTransaction throws error on invalid recipientId", async () => {
    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    }

    const existingCustomer = getExistingCustomers()[0]

    const req = {
        body: { userId: existingCustomer.id, amount: 10, recipientId: '' }
    };

    await performTransaction(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status().json).toHaveBeenCalledWith({ "message": "recipientId does not meet minimum length of 1" });
});


test("performTransaction throws error on sender and recipient being same person", async () => {
    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    }

    const existingCustomer = getExistingCustomers()[0]

    const req = {
        body: { userId: existingCustomer.id, amount: 100, recipientId: existingCustomer.id }
    };

    await performTransaction(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status().json).toHaveBeenCalledWith({ "message": "You cannot send money to yourself." });
});

test("performTransaction fails on insufficient funds", async () => {
    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    }

    const firstCustomer = getExistingCustomers()[0]
    const secondCustomer = getExistingCustomers()[1]
    const req = {
        body: { userId: firstCustomer.id, amount: 100, recipientId: secondCustomer.id }
    };

    await performTransaction(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status().json).toHaveBeenCalledWith({ "message": "Insufficient funds." });
});

test("performTransaction fails on invalid user", async () => {
    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    }

    const secondCustomer = getExistingCustomers()[1]
    const req = {
        body: { userId: 'kasjnd', amount: 100, recipientId: secondCustomer.id }
    };

    await performTransaction(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status().json).toHaveBeenCalledWith({ "message": "Customer or Recipient doesn't exist." });
});

test("performTransaction succeeds", async () => {
    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    }

    const firstCustomer = getExistingCustomers()[0]
    const secondCustomer = getExistingCustomers()[1]
    const req = {
        body: { userId: firstCustomer.id, amount: 10, recipientId: secondCustomer.id }
    };

    await performTransaction(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status().json).toHaveBeenCalledWith({ "message": "Amount transferred." });
    expect(getExistingCustomers()[1].balance).toBe(12.01)
});