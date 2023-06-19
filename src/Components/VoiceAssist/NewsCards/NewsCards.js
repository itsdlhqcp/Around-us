import { Container, Row, Col } from 'react-bootstrap';
import NewsCard from '../NewsCard/NewsCard';

const infoCards = [
  { color: '#a0a8b9', title: 'News by Sources', info: 'CNN, The Hindu, BBC News, The Times of India, National Geographic, Associated Press, Google News, Buzzfeed, TechCrunch, ABC News...', text: 'Give me the news from CNN' },
  { color: '#788698', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
  { color: '#516678', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Stock Market, Donald Trump...', text: 'What\'s up with PlayStation 5' },
  
];
const NewsCards = ({ articles, activeArticle }) => {
 

  if (!articles.length) {
    return (
      <Container>
        <Row className="justify-content-center mt-3">
          {infoCards.map((infoCard, i) => (
            <Col xs={12} sm={6} lg={3} className="mb-3" key={i}>
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
            </Col>
          ))}
        </Row>
        
      </Container>
    );
  }

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        {articles.map((article, i) => (
          <Col xs={12} sm={6} md={4} lg={3} className="mb-3" key={i}>
            <NewsCard article={article} activeArticle={activeArticle} i={i} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default NewsCards;
