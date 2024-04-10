import { formatAmount } from "../utils/common";

export const NavbarBalance = ({ balance }) => {
  return (
    <div>
      <div className="caption">Total Amount</div>
      <div data-testid='navbar-balance'>${formatAmount(balance || 0)}</div>
    </div>
  );
};
