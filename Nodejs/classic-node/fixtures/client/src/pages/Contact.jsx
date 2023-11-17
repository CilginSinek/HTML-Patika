/* eslint-disable react/prop-types */
import { useState } from "react";
import baseUrl from "../env";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState();

  const sendMail = async (e) => {
    const formdata = new FormData();
    e.preventDefault();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("message", message);
    await fetch(baseUrl + "/api/mail", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: formdata,
    })
      .then(() => console.log("success"))
      .catch((err) => console.log(err));
  };
  return (
    <div className="contact_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1 className="contact_taital contact_heading">Get In Touch</h1>
          </div>
        </div>
        <div className="contact_section_2">
          <div className="row">
            <div className="col-md-12">
              <div className="mail_section map_form_container">
                <form onSubmit={sendMail}>
                  <input
                    type="text"
                    className="mail_text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    name="Name"
                  />
                  <input
                    type="email"
                    className="mail_text"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    name="Email"
                  />
                  <textarea
                    className="massage-bt"
                    placeholder="Massage"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    rows="5"
                    id="comment"
                    name="Massage"
                  ></textarea>
                  <div className="btn_main">
                    <div className="send_bt">
                      <button type="submit">send</button>
                    </div>
                    <div className="map_bt active">
                      <a href="#" id="showMap">
                        Map
                      </a>
                    </div>
                  </div>
                </form>
                <div className="map_main map_container">
                  <Iframe
                    src={
                      "https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Eiffel+Tower+Paris+France"
                    }
                    width={"600"}
                    heigth={"368"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Iframe = ({ src, width, heigth }) => {
  return (
    <div className="map-responsive">
      <iframe src={src} width={width} height={heigth} allowFullScreen/>
      <div className="btn_main">
        <div className="map_bt d-flex justify-content-center w-100 map_center">
          <a href="#" id="showForm">
            Form
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
