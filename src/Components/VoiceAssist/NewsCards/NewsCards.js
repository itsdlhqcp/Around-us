import { Container, Carousel, Row, Col } from 'react-bootstrap';
import NewsCard from '../NewsCard/NewsCard';

const infoCards = [
  { color: '#808080', title: 'News by Countries', info: 'India, Australia, France, China, United States, Germany, Japan, Saudi Arabia', text: 'Give me the latest news from India' },
  { color: '#808080', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
  { color: '#808080', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Stock Market, Donald Trump...', text: 'What\'s up with PlayStation 5' },
];

const NewsCards = ({ articles, activeArticle }) => {

  if (!articles.length) {
    return (
      <div style={{ margin: "66px 0px 0px 0px" }}>
        <Container>
          <Carousel interval={3000} pause={false}>
            {infoCards.map((infoCard, i) => (
              <Carousel.Item key={i}>
                <div className="p-3" style={{ backgroundColor: infoCard.color }}>
                  <h5>{infoCard.title}</h5>
                  {infoCard.info && (
                    <div>
                      <strong>{infoCard.title.split(' ')[2]}:</strong>
                      <br />
                      {infoCard.info}
                    </div>
                  )}
                  <p className="mt-3">
                    Try saying: <br />
                    <i>{infoCard.text}</i>
                  </p>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          <Row className="justify-content-center mt-3">
        <Col xs={12} sm={6} lg={3} className="mb-3">
          <div className="p-3" style={{ backgroundColor: '#808080' }}>
            <h5>News by Sources</h5>
            <p><strong>News by Sources:</strong></p>
            <p>CNN, The Hindu, BBC News, The Times of India, National Geographic, Associated Press, Google News, Buzzfeed, TechCrunch, ABC News...</p>
            <p className="mt-3">
                    Try saying: <br/>
                    <i>Give me the news from BBC</i>
                  </p>
          </div>
        </Col>
      </Row>
        </Container>
      </div>
    );
  }

  return (
    <Container>
      <Carousel interval={3000} pause={false}>
        {[...Array(Math.ceil(articles.length / 2))].map((_, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-center">
              {[0, 1].map((i) => {
                const articleIndex = index * 2 + i;
                if (articles[articleIndex]) {
                  return (
                    <div className="mb-3" key={articleIndex}>
                      <NewsCard article={articles[articleIndex]} activeArticle={activeArticle} i={articleIndex} />
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};



export default NewsCards;
