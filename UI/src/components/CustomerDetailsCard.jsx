import React from "react";

export const CustomerDetailsCard = ({ name, id ,history}) => {

  return (
    <div data-testid={id} className="customer-details-card" onClick={()=>history.push(`/customer/${id}`)}>
      <h4 data-testid={`name-${id}`}>Name: {name}</h4>
    </div>
  );
};
