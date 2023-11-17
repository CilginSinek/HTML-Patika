import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../env";

function CreatePage() {
  const formData = new FormData();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [form, setForm] = useState({
    name: "",
    dec: "",
    price: "",
    category: "",
    type: "",
    file: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.id === "file") {
      setForm((oldV) => {
        return { ...oldV, [e.target.id]: e.target.files[0] };
      });
    } else {
      setForm((oldV) => {
        return { ...oldV, [e.target.id]: e.target.value };
      });
    }
  };

  // const handleChangeSel = (e)=>{
  //   console.log(e.target.parrentElement)
  //   setForm(old=>{
  //     return {...old,[e.target.parrentElement.id]:e.target.value}
  //   })
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.append("name", form.name);
    formData.append("dec", form.dec);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("type", form.type);
    formData.append("file", form.file);
    await fetch(baseUrl + "/api/createProduct", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setLoading(true);
    fetch(baseUrl + "/page/createPage", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setCategories(res.categories);
        setTypes(res.types);
        setLoading(false);
      })
      .catch((err) => setError(err));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="about_section layout_padding">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            className="form-control"
            id="name"
            placeholder="Chair..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="dec">Description</label>
          <textarea
            className="form-control"
            id="dec"
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            onChange={handleChange}
            type="number"
            className="form-control"
            id="price"
            placeholder="31"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Fixture</label>
          <select
            onChange={handleChange}
            id="category"
            className="custom-select custom-select-lg mb-3"
          >
            {categories.map((item, index) => (
              <option key={index} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            className="custom-select custom-select-lg mb-3"
            onChange={handleChange}
          >
            {types.map((item, index) => (
              <option key={index} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <div className="custom-file">
            <input
              onChange={handleChange}
              type="file"
              className="custom-file-input"
              id="file"
            />
            <label className="custom-file-label" htmlFor="file">
              Choose file
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreatePage;
