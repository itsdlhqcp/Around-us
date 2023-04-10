import { Container, Carousel } from 'react-bootstrap';


const infoCards = [
  { color: '#808080', title: 'News by Countries' },
  { color: '#808080', title: 'News by Categories' },
  { color: '#808080', title: 'News by Terms' },
];

const NavCard = () => {
    return (
      <div style={{ margin: "7px 0px 0px 0px" }}>
        <Container>
          <Carousel interval={3000} pause={false} controls={false} indicators={false}>
            {infoCards.map((infoCard, i) => (
              <Carousel.Item key={i}>
                <div className="p-1" style={{ backgroundColor: infoCard.color }}>
                  <h4>{infoCard.title}</h4>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </div>
    );
};



export default NavCard;
