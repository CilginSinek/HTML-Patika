function footter() {
  return (
    <>
      <div className="footer_section layout_padding">
        <div className="container">
          <div className="footer_menu">
            <ul>
              <li className="active">
                <a href="/">HOME</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/furnitures">Furnitures</a>
              </li>
              {/* <li>
                <a href="blog.html">Blog</a>
              </li>
              <li>
                <a href="testimonial.html">Testimonial</a>
              </li>
              <li>
                <a href="contact.html">contact Us</a>
              </li> */}
            </ul>
          </div>
          <div className="social_icon">
            <ul>
              <li>
                <a href="#">
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-linkedin" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="copyright_section">
        <div className="container">
          <p className="copyright_text">
            2020 All Rights Reserved. Design by{" "}
            <a href="https://html.design">Free Html Templates</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default footter;
