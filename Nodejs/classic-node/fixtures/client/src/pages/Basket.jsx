import { useEffect, useState } from "react";
import baseUrl from "../env";

function Basket() {
  const [basket, setBasket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleRemove = async (id) => {
    await fetch(baseUrl + "/api/unreserve", {
      method: "PUT",
      credentials: "include", // to send HTTP only cookies
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringigy({ id: id }),
    })
      .then(() => {
        setBasket((old) =>
          old.map((item) => {
            if (item._id === id) {
              return;
            }
            return item;
          })
        );
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    setLoading(true);
    fetch(baseUrl + "/page/basket",  {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setLoading(false);
        setBasket(res.products);
      })
      .catch((err) => setError(err));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  
  return (
    <div className="about_section layout_padding">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Type</th>
            <th scope="col">Reserveds</th>
            <th scope="col">Create At</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {basket.map((item, index) => (
            <tr key={index}>
              <td>{item.name} </td>
              <td>
                <a href={item.category.slug}>{item.category.name}</a>
              </td>
              <td>
                <a href={item.type.slug}>{item.type.name}</a>
              </td>
              <td>{item.reserves.length}</td>
              <td>{item.createAt}</td>
              <td>
                <button onClick={() => handleRemove(item._id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Basket;
