function banner({ products }) {
  return (
    <div className="banner_section layout_padding">
      <div className="banner_section_2">
        <div className="owl-carousel owl-theme gift_owl_carousel">

          {products.map((item, index) => (
            <div className="item" key={index}>
              <div className=" banner_main">
                <h3 className="banner_taital">Best Furnitures For Your Home</h3>
                <a href={"/product/" + item._id}>
                  <img src={item.file} alt="#" />
                </a>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default banner;
