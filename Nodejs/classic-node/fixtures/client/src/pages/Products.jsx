import { useEffect, useState } from "react";
import baseUrl from "../env";
import { useLocation, useParams } from "react-router-dom";

function Products() {
  let {type} = useParams();
  let location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(baseUrl + "/page/fixtures/"+location.pathname.split("/")[2] +"/" + type, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setProducts(res.products);
        setLoading(false);
      })
      .catch((err) => setError(err));
  }, [location.pathname, type]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="blog_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="blog_taital">Products</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="blog_section_2 layout_padding">
          <div className="row">
            {products.map((item, index) => (
              <div key={index} className="col-lg-4 col-md-4 col-sm-12">
                <div className="blog_box">
                  <div className="blog_img">
                    <img src={item.file} />
                  </div>
                  <a href={"/product/" + item._id} className="chair_text">
                    {item.name}
                  </a>
                  <p>Price:{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
