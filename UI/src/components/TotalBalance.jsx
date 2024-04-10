import { formatAmount } from "../utils/common";

export const TotalBalance = ({ amount }) => {
  return (
    <div>
      <div>Total Balance</div>
      <h2 data-testid='total-balance'>${formatAmount(amount)}</h2>
    </div>
  );
};
