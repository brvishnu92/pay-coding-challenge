import { useEffect, useState } from "react";
import { CustomerDetailsCard } from "../components/CustomerDetailsCard";
import { TotalBalance } from "../components/TotalBalance";
import { useBankBalanceQuery } from "../redux/adminReducer";
import { useGetCustomerQuery } from "../redux/customerReducer";
import { getErrorMessageFromApi } from '../utils/common'

export const HomeRoute = ({ history }) => {

  const { data: balanceData, error: balanceError, isLoading: loadingBalance } = useBankBalanceQuery()

  const [customers, setCustomers] = useState([])
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    if (balanceError) {
      const errorM = getErrorMessageFromApi(balanceError)
      console.error(errorM)
      return
    }
    if (balanceData) {
      setCustomers(balanceData.customers)
      setBalance(balanceData.balance)
    }
  }, [balanceData, balanceError])


  if(loadingBalance){
    return <p>Loading ...</p>
  }
  
  return (
    <div class="container">
      <h1>Admin Dashboard</h1>
      <TotalBalance amount={balance} />

      {customers.map(({ firstName, lastName, id }) => <CustomerDetailsCard key={id} name={firstName + ' ' + lastName} id={id} history={history} />)}
    </div>
  );
};
