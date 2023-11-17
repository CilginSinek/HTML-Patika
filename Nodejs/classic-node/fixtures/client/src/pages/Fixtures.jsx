import { useEffect, useState } from "react";
import baseUrl from "../env";

function Fixtures() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(baseUrl + "/page/fixtures", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setCategories(res.categories);
        setLoading(false);
      })
      .catch((err) => setError(err));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="furnitures_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1 className="furnitures_taital">Our Furnitures Work</h1>
            <p className="furnitures_text">
              reader will be distracted by the readable content of a page when
              looking at its layout.
            </p>
          </div>
        </div>
        <div className="furnitures_section_2">
          <div className="row">
            {categories.map((item, index) => (
              <div key={index} className="col-md-4">
                <div className="hover01 column">
                  <figure>
                    <img src={item.file} />
                  </figure>
                </div>
                <h3 className="introduction_text">{item.name}</h3>
                <div className="seemore_bt">
                  <a href={"/furnitures/" + item.slug}>See More</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fixtures;
