import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import baseUrl from "../env";

function Types() {
  let {fixture} = useParams();
  const [typeArr, setTypeArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(baseUrl + "/page/fixtures/"+fixture, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setTypeArr(res.types);
        setLoading(false);
      })
      .catch((err) => setError(err));
  }, [fixture]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="blog_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="blog_taital">Trending Products</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="blog_section_2 layout_padding">
          <div className="row">
            {typeArr.map((item, index) => (
              <div key={index} className="col-lg-4 col-md-4 col-sm-12">
                <div className="blog_box">
                  <div className="blog_img">
                    <img src={item.file} />
                  </div>
                  <a href={"./"+fixture +"/" + item.slug} className="chair_text">
                    {item.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Types;
