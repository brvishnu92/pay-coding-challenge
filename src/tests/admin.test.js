import { getExistingCustomers } from "../data";
import { getBankBalance } from "../utils/admin";

test("getBankBalance returns balance", async () => {
    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    }

    const req = {
    };

    await getBankBalance(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status().json).toHaveBeenCalledWith({ "balance": 32.01, "customers": getExistingCustomers() });
});