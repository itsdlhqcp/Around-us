import { Container, Carousel } from 'react-bootstrap';


const infoCards = [
  { color: '#808080', title: 'Get World News' },
  { color: '#808080', title: 'Get News from India' },
  { color: '#808080', title: 'Get National News' },
];

const NavCard = () => {
    return (
      <div style={{ margin: "7px 0px 0px 0px" }}>
        <Container>
          <Carousel interval={3000} pause={false} controls={false} indicators={false}>
            {infoCards.map((infoCard, i) => (
              <Carousel.Item key={i}>
                <div className="p-1" style={{ backgroundColor: infoCard.color }}>
                  <h4 style={{ margin: 'auto' }}>{infoCard.title}</h4>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </div>
    );
};



export default NavCard;
