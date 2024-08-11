import { useState } from "react";
import CustomerDetails from "./CustomerDetails";
import CustomerList from "./CustomerList";
import CustomerDetailsCard from "./components/CustomerDetailsCard";
import ImageContainer from "./components/ImageContainer";

// Define the type for the customer object
interface Customer {
  name: {
    title: string;
    first: string;
    last: string;
  };
  picture: {
    large: string;
    thumbnail: string;
  };
  location: {
    city?: string;
    state?: string;
    country?: string;
  };
  login: { uuid: string };
  email: string;
  phone: string;
}

function App() {
  // Use the Customer interface for state typing
  const [customer, setCustomer] = useState<Customer | null>(null);

  return (
    <div className="container">
      <CustomerList handleCustomer={setCustomer} selectedCustomer={customer} />
      <CustomerDetails>
        {customer && <CustomerDetailsCard customer={customer} />}
        <ImageContainer />
      </CustomerDetails>
    </div>
  );
}

export default App;
