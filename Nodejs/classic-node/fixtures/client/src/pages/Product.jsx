import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseUrl from "../env";

function Product() {
  let { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [reserved, setReserved] = useState();
  const [error, setError] = useState("");

  const handleClick = async () => {
    if (localStorage.getItem("user")) {
      if (reserved) {
        await fetch(baseUrl + "/api/unreserve", {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: product._id }),
        }).then(() => {
          setReserved(!reserved);
        });
      } else {
        await fetch(baseUrl + "/api/reserve", {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: product._id }),
        }).then(() => {
          setReserved(!reserved);
        });
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    fetch(baseUrl + "/page/product/" + id, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setProduct(res.product);
        if (localStorage.getItem("user")) {
          const myuserId = JSON.parse(localStorage.getItem("user"))._id;
          setReserved(res.product.reserves.includes(myuserId));
        } else {
          setReserved(false);
        }

        setLoading(false);
      })
      .catch((err) => setError(err));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="about_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="about_taital">{product.name}</h1>
          </div>
        </div>
        <div className="about_section_2 layout_padding">
          <div className="row">
            <div className="col-md-6">
              <div className="about_img">
                <img src={product.file} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="good_text">
                <a href={"/furnitures/" + product.category.slug}>
                  Price:{product.price}
                </a>
              </div>
              <div className="good_text">
                <a href={"/furnitures/" + product.category.slug}>
                  Fixture:{product.category.name}
                </a>
              </div>
              <div className="good_text">
                <a
                  href={
                    "/furnitures/" +
                    product.category.slug +
                    "/" +
                    product.type.slug
                  }
                >
                  Type:{product.type.name}
                </a>
              </div>
              <p className="making_text">{product.dec}</p>
              <div className="read_bt">
                <button onClick={handleClick}>
                  {reserved ? "unreserve" : "reserve"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
