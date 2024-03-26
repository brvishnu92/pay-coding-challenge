import { createCustomer, getCustomer } from "../customer"
import { getExistingCustomers } from "../data";


test("getCustomers returns default customer", async () => {
    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    }

    const existingCustomer = getExistingCustomers()[0]

    const req = {
        params: { userId: existingCustomer.id }
    };

    await getCustomer(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status().json).toHaveBeenCalledWith(existingCustomer);
});

test("getCustomers returns error when no userId passed", async () => {
    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    }

    const req = {
        params: { userId: '' }
    };

    await getCustomer(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status().json).toHaveBeenCalledWith({ "message": "Invalid userId provided." });
});

test("getCustomers returns error when invalid userId passed", async () => {
    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    }

    const req = {
        params: { userId: 'akjnsd' }
    };

    await getCustomer(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status().json).toHaveBeenCalledWith({ "message": "Customer does not exist for that id." });
});


test("createCustomer returns error when invalid amount passed", async () => {
    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    }

    const req = {
        body: { firstName: 'Vishnu', lastName: 'Shanker', openingBalance: 0.0001 }
    };

    await createCustomer(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status().json).toHaveBeenCalledWith({ "message": "openingBalance must be greater than or equal to 0.01" });
});

test("createCustomer returns error when no firstName passed", async () => {
    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    }

    const req = {
        body: { firstName: '', lastName: 'Shanker', openingBalance: 0.0001 }
    };

    await createCustomer(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status().json).toHaveBeenCalledWith({ "message": "firstName does not meet minimum length of 1" });
});

test("createCustomer returns error when no lastName passed", async () => {
    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    }

    const req = {
        body: { firstName: 'Vishnu', lastName: '', openingBalance: 0.0001 }
    };

    await createCustomer(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status().json).toHaveBeenCalledWith({ "message": "lastName does not meet minimum length of 1" });
});

test("createCustomer adds new customer on valid request", async () => {
    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    }

    const req = {
        body: { firstName: 'Vishnu', lastName: 'Shanker', openingBalance: 10.02 }
    };

    await createCustomer(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
});