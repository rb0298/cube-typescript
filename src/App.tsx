import { useState, useEffect } from "react";
// components
//import Card from "./Card";

// styles
import "../src/styles.css";
// ------------
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  //https://picsum.photos/
  useEffect(() => {
    const url = `https://picsum.photos/v2/list?limit=9`;
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        //console.log("res>>>>", res);

        //setData((prev) => [...prev, ...res]);
        setData(res);
        setErrorMsg("");
      })
      .catch((err) => {
        // set the error msg
        setErrorMsg("Something went wrong, Please try again later");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const createLists = () => {
    console.log("data", data);
    return data.map((ele) => {
      return (
        <div className="card-container" key={ele.id}>
          <div className="card_img">
            <img src={ele.download_url} alt={ele.author} />
          </div>
          <div className="card_title ">
            <p> {ele.author}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="main-container">
      <h1>Random Images</h1>
      <div className="cardlist-container">{createLists()}</div>
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
    </div>
  );
}

export default App;
