import React from "react";

// Define the type for the location object
interface Location {
  city?: string;
  state?: string;
  country?: string;
}

// Define the type for the customer object
interface Name {
  title: string;
  first: string;
  last: string;
}

interface Picture {
  thumbnail: string;
}
interface Login {
  uuid: string;
}

interface Customer {
  name: Name;
  picture: Picture;
  location: Location;
  login: Login;
}

interface CustomerCardProps {
  customer: Customer;
  handleCustomer: (customer: Customer) => void;
  selectedCustomer?: Customer;
}

const CustomerCard: React.FC<CustomerCardProps> = ({
  customer,
  handleCustomer,
  selectedCustomer,
}) => {
  const { name, picture, location } = customer;
  const isSelected = selectedCustomer?.login.uuid === customer.login.uuid;

  return (
    <li
      className={`preview ${isSelected ? "active" : ""}`}
      onClick={() => handleCustomer(customer)}
    >
      <img
        className="fig"
        src={picture.thumbnail}
        alt={`${name.title} ${name.first}`}
      />
      <div>
        <h4>{`${name.title} ${name.first}`}</h4>
        <p>{`${location.city || ""}, ${location.country || ""}`}</p>
      </div>
    </li>
  );
};

export default CustomerCard;
