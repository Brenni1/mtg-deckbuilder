import cardsJson from "../../assets/120cards.json";
// const link = "https://cards.scryfall.io/small/front/8/6/86bf43b1-8d4e-4759-bb2d-0b2e03ba7012.jpg?1562242171";
export const Deck = () => {
  return (
    <div>
      {console.log(cardsJson)}
      <div></div>
      <div className="cards-container">
        {cardsJson.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.image_uris ? card.image_uris.small : card.card_faces[0].image_uris.small} alt={card.name} />

            {card.name}
          </div>
        ))}
      </div>
    </div>
  );
};
