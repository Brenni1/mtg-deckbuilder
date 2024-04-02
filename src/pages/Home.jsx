import banner from "../assets/imgs/mtg-banner.jpg";

export const Home = () => {
  return (
    <>
      <div className="home-banner">
        <div
          className="banner-background-img"
          style={{ backgroundImage: "url(" + banner + ")" }}
        ></div>
        <div className="banner-fade fade-top"></div>
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
        <div className="banner-fade fade-bottom"></div>
      </div>

      <div className="deck-area">
        <div>Deck 1</div>
        <div>Deck 2</div>
        <div>Deck 3</div>
        <div>Deck 4</div>
        <div>Deck 5</div>
        <div>Deck 6</div>
      </div>
    </>
  );
};
