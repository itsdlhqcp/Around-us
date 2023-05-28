import { Container, Carousel } from 'react-bootstrap';

const infoCards = [
  { color: '#ECF0F1 ', title: 'Ask Filtered News', link: '/voice' }
];

const HeadNav = () => {
    return (
      <div style={{ margin: "66px 0px 0px 0px" }}>
        <Container>
          <Carousel interval={6000} pause={false} controls={false} indicators={false}>
            {infoCards.map((infoCard, i) => (
              <Carousel.Item key={i}>
                <a href={infoCard.link}style={{ textDecoration: 'none' }}>
                  <div className="p-1" style={{ backgroundColor: infoCard.color}}>
                    <h4 style={{ margin: 'auto', fontStyle: 'helvetica' }}>{infoCard.title}</h4>
                  </div>
                </a>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </div>
    );
};

export default HeadNav;
