import { Container, Row, Col } from 'react-bootstrap';
import NewsCard from '../NewsCard/NewsCard';

const infoCards = [
  { color: '#808080', title: 'News by Countries', info: 'India, Australia, France, China, United States, Germany, Japan, Saudi Arabia', text: 'Give me the latest news from India' },
  { color: '#808080', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
  { color: '#808080', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Stock Market, Donald Trump...', text: 'What\'s up with PlayStation 5' },
];

const NewsCards = ({ articles, activeArticle }) => {

  if (!articles.length) {
    return (
      <div style={{ margin: "0px 0px 0px 0px" }}>
        <Container>
          {infoCards.map((infoCard, i) => (
            <div className="p-3" style={{ backgroundColor: infoCard.color }} key={i}>
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
          ))}
          <br/>
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
      {[...Array(Math.ceil(articles.length / 2))].map((_, index) => (
        <div className="d-flex justify-content-center" key={index}>
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
      ))}
    </Container>
  );
};

export default NewsCards;
