import "./HomeBanner.css";

import banner from "../../assets/imgs/mtg-banner.jpg";

export const HomeBanner = () => {
  return (
    <>
      <div className="home-banner">
        <div
          className="banner-background-img"
          style={{ backgroundImage: "url(" + banner + ")" }}
        ></div>
        <div className="banner-fade fade-top" />
        <div className="banner-form">
          <form>
            <label>
              <input
                className="banner-search-bar"
                type="text"
                placeholder="Search for Cards..."
              />
            </label>
          </form>
          <div className="banner-btns">
            <button>+New Deck+</button>
            <button>Deck Folder</button>
          </div>
        </div>
        <div className="banner-fade fade-bottom" />
      </div>
    </>
  );
};
