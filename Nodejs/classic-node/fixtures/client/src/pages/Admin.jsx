import { useEffect, useState } from "react";
import baseUrl from "../env";

function Admin() {
  const [users, setUsers] = useState([]);
  const [products, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [typeForm, setTypeF] = useState({
    name: "",
    file: "",
  });
  const [catForm, setCatF] = useState({
    name: "",
    file: "",
  });

  //*handle Change
  const handleFormCat = (e) => {
    if (e.target.id === "file") {
      setCatF((old) => {
        return { ...old, [e.target.id]: e.target.files[0] };
      });
    } else {
      setCatF((old) => {
        return { ...old, [e.target.id]: e.target.value };
      });
    }
  };
  const handleFormT = (e) => {
    if (e.target.id === "file") {
      setTypeF((old) => {
        return { ...old, [e.target.id]: e.target.files[0] };
      });
    } else {
      setTypeF((old) => {
        return { ...old, [e.target.id]: e.target.value };
      });
    }
  };

  //*Handling Delete Buttons
  const handleDeleteUser = async (id) => {
    await fetch(baseUrl + "/api/deleteUser" + id, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        const newUsers = users.map((item) => {
          if (item._id == id) {
            return;
          }
          return item;
        });
        setUsers(newUsers);
      })
      .catch((err) => setError(err));
  };
  const handleDeleteProduct = async (id) => {
    await fetch(baseUrl + "/api/deleteProduct" + id, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        const newPro = products.map((item) => {
          if (item._id == id) {
            return;
          }
          return item;
        });
        setProduct(newPro);
      })
      .catch((err) => setError(err));
  };
  const handleDeleteCategory = async (slug) => {
    await fetch(baseUrl + "/api/deleteCategory" + slug, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        const newCat = categories.map((item) => {
          if (item.slug == slug) {
            return;
          }
          return item;
        });
        setCategories(newCat);
      })
      .catch((err) => setError(err));
  };
  const handleDeleteType = async (slug) => {
    await fetch(baseUrl + "/api/deleteType" + slug, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        const newTypes = types.map((item) => {
          if (item.slug == slug) {
            return;
          }
          return item;
        });
        setTypes(newTypes);
      })
      .catch((err) => setError(err));
  };

  //* Handle Form submit
  const handleFormCategory = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("name", catForm.name);
    formdata.append("file", catForm.file);
    console.log(formdata, catForm);

    await fetch(baseUrl + "/api/createCategory", {
      method: "POST",
      credentials: "include",
      body: formdata,
    })
      .then((response) => response.json())
      .then((res) => {
        setCategories((old) => {
          return [...old, res.category];
        }).catch((err) => setError(err));
      });
  };

  const handleFormType = async (e) => {
    const formdata = new FormData();
    formdata.append("name", typeForm.name);
    formdata.append("file", typeForm.file);
    e.preventDefault();
    await fetch(baseUrl + "/api/createType", {
      method: "POST",
      credentials: "include",
      body: formdata,
    })
      .then((response) => response.json())
      .then((res) => {
        setTypes((old) => {
          return [...old, res.type];
        }).catch((err) => setError(err));
      });
  };

  useEffect(() => {
    setLoading(true);
    fetch(baseUrl + "/page/admin", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setLoading(false);
        setUsers(res.users);
        setProduct(res.products);
        setCategories(res.categories);
        setTypes(res.types);
      })
      .catch((err) => setError(err));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="about_section layout_padding">
      <div>
        <label htmlFor="userTable">
          <h3>Users</h3>
        </label>
        <table id="userTable" className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Name</th>
              <th scope="col">E-mail</th>
              <th scope="col">Role</th>
              <th scope="col">Reserved</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th scope="row" id={user._id}>
                  {user._id}
                </th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Reserved Items
                    </button>
                    <ul className="dropdown-menu">
                      {user.reserved.map((item, i) => (
                        <li key={i}>
                          <a
                            className="dropdown-item"
                            href={"/product/" + item._id}
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <label htmlFor="productTable">
          <h3>Products</h3>
        </label>
        <table id="productTable" className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Type</th>
              <th scope="col">Create At</th>
              <th scope="col">Reserved Users</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <a href={"/fixtures/" + product.category.slug}>
                    {product.category.name}
                  </a>
                </td>
                <td>
                  <a
                    href={
                      "/fixtures/" +
                      product.category.slug +
                      "/" +
                      product.type.slug
                    }
                  >
                    {product.type.name}
                  </a>
                </td>
                <td>{product.createAt}</td>
                <td>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Reserved Users
                    </button>
                    <ul className="dropdown-menu">
                      {product.reserves.map((user, i) => (
                        <li key={i}>
                          <a className="dropdown-item" href={"#" + user._id}>
                            {user.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <a href="/create" className="btn btn-success">Add</a>
      </div>
      <div>
        <h3>Fixtures</h3>
        <form onSubmit={handleFormCategory}>
          <div className="form-row">
            <div className="col">
              <input
                required
                value={catForm.name}
                onChange={handleFormCat}
                type="text"
                id="name"
                className="form-control"
                placeholder="add Fixture"
              />
            </div>
            <div className="col">
              <input
                required
                onChange={handleFormCat}
                className="form-control"
                type="file"
                id="file"
              />
            </div>
            <div className="col">
              <button type="submit" className="btn btn-success">
                Add
              </button>
            </div>
          </div>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Slug</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <td>{category.name}</td>
                <td>
                  <a href={"/fixtures/" + category.slug}>{category.slug}</a>
                </td>
                <td>
                  <button onClick={() => handleDeleteCategory(category.slug)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3>Types</h3>
        <form onSubmit={handleFormType}>
          <div className="form-row">
            <div className="col">
              <input
                required
                value={typeForm.name}
                onChange={handleFormT}
                type="text"
                className="form-control"
                placeholder="add Type"
                id="name"
              />
            </div>
            <div className="col">
              <input
                required
                onChange={handleFormT}
                className="form-control"
                type="file"
                id="file"
              />
            </div>
            <div className="col">
              <button type="submit" className="btn btn-success">
                Add
              </button>
            </div>
          </div>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Slug</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {types.map((type, index) => (
              <tr key={index}>
                <td>{type.name}</td>
                <td>{type.slug}</td>
                <td>
                  <button onClick={() => handleDeleteType(type.slug)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
