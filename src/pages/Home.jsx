export const Home = () => {
  return (
    <>
      <div className="home-banner">
        <form>
          <label>
            <input className="search-bar" type="text" placeholder="Search for Cards..." />
          </label>
        </form>
        <div>
          <button>+New Deck+</button>
          <button>Deck Folder</button>
        </div>
      </div>

      <div className="deck-area">
        <div>Deck 1</div>
        <div>Deck 2</div>
        <div>Deck 3</div>
        <div>Deck 4</div>
        <div>Deck 5</div>
      </div>
    </>
  );
};
