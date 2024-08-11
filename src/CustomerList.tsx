import { useEffect, useState, useRef } from "react";
import CustomerCard from "./components/CustomerCard";
import Spinner from "./components/Spinner";

interface Location {
  city?: string;
  state?: string;
  country?: string;
}

interface Name {
  title: string;
  first: string;
  last: string;
}

interface Picture {
  thumbnail: string;
}

interface Customer {
  name: Name;
  picture: Picture;
  location: Location;
  login: { uuid: string };
}

interface CustomerListProps {
  handleCustomer: React.Dispatch<React.SetStateAction<Customer | null>>;
  selectedCustomer?: Customer;
}

const CustomerList: React.FC<CustomerListProps> = ({
  handleCustomer,
  selectedCustomer,
}) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function getCustomers() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://randomuser.me/api/?page=${page}&results=13`
        );
        const data = await res.json();
        setCustomers((prevCustomers) => [...prevCustomers, ...data.results]);
        setLoading(false);
      } catch (error) {
        setError("Something went wrong, Please try again later");
        setLoading(false);
      }
    }
    getCustomers();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      root: null,
      threshold: 0.1,
    });
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const callback = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <ul className="customerInfo">
        {customers.map((customer) => (
          <CustomerCard
            key={customer.login.uuid}
            customer={customer}
            handleCustomer={handleCustomer}
            selectedCustomer={selectedCustomer}
          />
        ))}
        <div className="last" ref={ref}></div>
        {loading && <Spinner />}
        {error && <p className="error-msg">{error}</p>}
      </ul>
    </>
  );
};

export default CustomerList;
