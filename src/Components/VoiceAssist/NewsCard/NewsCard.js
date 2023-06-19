import React, { useState, useEffect, createRef } from 'react';
import { Card, Button } from 'react-bootstrap';
import classNames from 'classnames';

import useStyles from './styles.js';

const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage }, i, activeArticle }) => {
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);
    const [showTag, setShowTag] = useState(false);

    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

    useEffect(() => {
        setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()));
    }, []);

    useEffect(() => {
        if (i === activeArticle && elRefs[activeArticle]) {
            scrollToRef(elRefs[activeArticle]);
            setShowTag(true);
            const timer = setTimeout(() => {
                setShowTag(false);
            }, 7000);
            return () => clearTimeout(timer);
        }
    }, [i, activeArticle, elRefs]);

    return (
        <Card ref={elRefs[i]} className={classNames(classes.card, activeArticle === i ? classes.activeCard : null)}>
            <Card.Img variant="top" src={urlToImage || 'https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png'} className={classes.media} />
            <Card.Body>
                <Card.Title className={classes.title}>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">
                    <div className={classes.details}>
                        <span>{(new Date(publishedAt)).toDateString()}</span>
                        <span>{source.name}</span>
                    </div>
                    <div className={classes.cardActions}>
                        <Button size="sm" href={url} target="_blank" variant="primary" className={classes.button}>
                            Learn More
                        </Button>
                        <span className={classes.cardIndex}>{i + 1}</span>
                    </div>
                    {showTag && (
                        <div className={classes.floatingTag}>
                            Floating Tag
                        </div>
                    )}
                </small>
            </Card.Footer>
        </Card>
    );
}

export default NewsCard;
