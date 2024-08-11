import React from "react";

const CustomerDetails: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return <div className="details">{children}</div>;
};

export default CustomerDetails;
