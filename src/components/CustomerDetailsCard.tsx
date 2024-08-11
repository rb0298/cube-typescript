import React from "react";

interface Name {
  title: string;
  first: string;
  last: string;
}

interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

interface Location {
  city: string;
  country: string;
}

interface Customer {
  name: Name;
  picture: Picture;
  location: Location;
  email: string;
  phone: string;
}

interface CustomerDetailsCardProps {
  customer: Customer;
}

const CustomerDetailsCard: React.FC<CustomerDetailsCardProps> = ({
  customer,
}) => {
  const { picture, name, location } = customer;
  if (!name) return null;

  return (
    <div className="customer-details">
      <img src={picture.large} alt={`${name.title} ${name.first}`} />

      <div style={{ paddingTop: "2rem" }}>
        <h4>{`${name.title} ${name.first}`}</h4>
        <p>{`${location.city}, ${location.country}`}</p>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
};

export default CustomerDetailsCard;
