import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import baseUrl from "../env";

function Index() {
  const [banner, setBanner] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(baseUrl + "/page/home", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setBanner(res.products);
        setLoading(false);
      })
      .catch((err) => setError(err));
  }, []);

  if (error) {
    console.log(error);
    return <div>error</div>;
  }
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Banner products={banner} />
      <div className="about_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="about_taital">About Our Shop</h1>
              <p className="about_text">
                reader will be distracted by the readable content of a page when
                looking at its layout. The point of using Lorem Ipsum is that it
                has a more-or-less normal distribution of letters, as opposed to
                using Content
              </p>
            </div>
          </div>
          <div className="about_section_2 layout_padding">
            <div className="row">
              <div className="col-md-6">
                <div className="about_img">
                  <img src="images/about-img.png" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="good_text">Good Furntures Design</div>
                <p className="making_text">
                  Necessary, making this the first true generator on the
                  Internet. It uses a dictionary of over 200 Latin words,
                  combined with a handful of model sentence structures, to
                </p>
                <div className="read_bt">
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
