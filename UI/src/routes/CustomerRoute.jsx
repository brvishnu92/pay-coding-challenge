import { useEffect, useState } from "react";
import { useGetCustomerQuery } from "../redux/customerReducer";
import { getErrorMessageFromApi } from '../utils/common'
import { useParams } from 'react-router';

export const CustomerRoute = ({ }) => {

  const params = useParams()
  const [id, setId] = useState('')
  const { data: customerData, error: customerError, isLoading: customerLoading } = useGetCustomerQuery(id, { skip: !id })

  const [customerInfo, setCustomerInfo] = useState({ name: '', balance: 0 })

  useEffect(() => {
    setId(params && params.id)
  }, [])

  useEffect(() => {
    if (customerError) {
      const errorM = getErrorMessageFromApi(customerError)
      console.error(errorM)
      return
    }
    if (customerData && customerData.firstName) {
      const { firstName, lastName, balance } = customerData
      setCustomerInfo({ name: `${firstName} ${lastName}`, balance })
    }
  }, [customerData, customerError])


  return (
    <div class="container">
      {
        customerLoading ? <p>Loading...</p> : <>
          <h1>Name: {customerInfo.name}</h1>
          <h3 data-testid='balance-customer'>Balance: ${customerInfo.balance}</h3>
        </>
      }
    </div>
  );
};
