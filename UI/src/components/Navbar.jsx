import { useBankBalanceQuery } from "../redux/adminReducer";
import { NavbarBalance } from "./NavbarBalance";

import { withRouter } from 'react-router-dom';
import { formatAmount } from "../utils/common";

const Navbar = ({ history }) => {
  // Alternatively, instead of querying for balance we can set state in plain reducer and extract it here.
  const { data: balanceData, error: balanceError, isLoading: loadingBalance } = useBankBalanceQuery()
  // Balance error is handled in parent component.
  
  return (
    <nav>
      <div className="logo" onClick={() => history.push('/')}>PayBank</div>
      <div>
        {loadingBalance ? <p>Loading...</p> : <NavbarBalance balance={formatAmount(balanceData?.balance || 0)} />}
      </div>
    </nav>
  );
};

export default withRouter(Navbar)
