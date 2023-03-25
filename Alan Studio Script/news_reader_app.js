/* eslint-disable default-case */
/* eslint-disable no-undef */
intent(
    `What is this app?`,
    `What does this app do?`,
    `How does this work?`,
    `What can I do here?`,
    `How should I use this?`,
    reply(
      `This is a news project, and you can provide the most recent headlines in mainstream media` +
      `Just ask me anything about the news, and I will try to answer it`
    )
  );
  
  const API_KEY = '1c4a1d363a5e40c4bfea50305362cee6';
  let savedArticles = [];
  
  // News by Source
  intent('Give me the news from $(source* (.+))', (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;
      
      let source = p.source.value.toLowerCase().split(" ").join('-');
      if(source) {
          NEWS_API_URL = `${NEWS_API_URL}&sources=${source}`
      }
      p.play('Fetching news from ' + source);
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          // eslint-disable-next-line no-mixed-operators
          if (error || response && response.statusCode !== 200) {
              p.play('Could not fetch news from ' + source);
          }
          else {
              const { articles } = JSON.parse(body);
              if(!articles.length) {
                  p.play('Sorry, please try searching for news from a different source');
                  return;
              }
              savedArticles = articles;
              p.play({ command: 'newHeadlines', articles });
              p.play(`Here are the (latest|recent) ${p.source.value}.`);
              p.play('Would you like me to read the headlines?');
              p.then(confirmation);
          }
      });
  })
  
  // News by Term
  intent('what\'s up with $(term* (.*))', (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`;
      
      if(p.term.value) {
          NEWS_API_URL = `${NEWS_API_URL}&q=${p.term.value}`
      }
      p.play('Fetching news from ' + p.term.value);
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for something else.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          p.play(`Here are the (latest|recent) articles on ${p.term.value}.`);
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  })
  
  // News by Categories
  const CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  const CATEGORIES_INTENT = `${CATEGORIES.map((category) => `${category}~${category}`).join('|')}|`;
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT})`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value}.`);        
          } else {
              p.play(`Here are the (latest|recent) news`);   
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (India)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (India)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=in`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from India.`);        
          } else {
              p.play(`Here are the (latest|recent) news from India`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (United States)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (United States)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=us`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from United States.`);        
          } else {
              p.play(`Here are the (latest|recent) news from United States`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Australia)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Australia)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=au`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Australia.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Australia`);   
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Argentina)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Argentina)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=ar`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Argentina.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Argentina`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Austria)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Austria)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=at`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Austria.`);        
          } else {
              p.play(`Here are the (latest|recent) news rom Austria`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Belgium)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Belgium)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=be`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Belgium.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Belgium`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Brazil)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Brazil)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=br`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Brazil.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Brazil`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Bulgaria)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Bulgaria)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=bg`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Bulgaria.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Bulgaria`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Canada)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Canada)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=ca`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Canada.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Canada`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (China)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (China)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=cn`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from China.`);        
          } else {
              p.play(`Here are the (latest|recent) news from China`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Colombia)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Colombia)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=co`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Colombia.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Colombia`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Cuba)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Cuba)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=cu`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Cuba.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Cuba`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Czech Republic)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Czech Republic)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=cz`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Czech Republic.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Czech Republic`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Egypt)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Egypt)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=eg`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Egypt.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Egypt`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (France)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (France)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=fr`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from France.`);        
          } else {
              p.play(`Here are the (latest|recent) news from France`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Germany)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Germany)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=de`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Germany.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Germany`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Greece)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Greece)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=gr`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Greece.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Greece`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Hong Kong)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Hong Kong)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=hk`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Hong Kong.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Hong Kong`);   
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Hungary)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Hungary)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=hu`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Hungary.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Hungary`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Indonesia)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Indonesia)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=id`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Indonesia.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Indonesia`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Ireland)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Ireland)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=ie`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Ireland.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Ireland`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Israel)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Israel)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=il`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Israel.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Israel`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Italy)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Italy)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=it`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Italy.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Italy`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Japan)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Japan)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=jp`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Japan.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Japan`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Latvia)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Latvia)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=lv`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Latvia.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Latvia`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Lithuania)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Lithuania)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=lt`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Lithuania.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Lithuania`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Malaysia)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Malaysia)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=my`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Malaysia.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Malaysia`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Mexico)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Mexico)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=mx`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Mexico.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Mexico`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Morocco)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Morocco)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=ma`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Morocco.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Morocco`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Netherlands)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Netherlands)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=nl`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Netherlands.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Netherlands`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (New Zeland)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (New Zeland)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=nz`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from New Zeland.`);        
          } else {
              p.play(`Here are the (latest|recent) news from New Zeland`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Nigeria)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Nigeria)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=ng`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Nigeraia.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Nigeria`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Norway)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Norway)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=no`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Norway.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Norway`);   
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Philippines)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Philippines)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=ph`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Philippines.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Philippines`);   
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Poland)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Poland)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=pl`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Poland.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Poland`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Portugal)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Portugal)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=pt`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Portugal.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Portugal`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Romania)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Romania)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=ro`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Romania.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Romania`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Russia)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Russia)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=ru`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Russia.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Russia`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Saudi Arabia)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Saudi Arabia)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=sa`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Saudi Arabia.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Saudi Arabia`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Serbia)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Serbia)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=rs`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Serbia.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Serbia`);   
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Singapore)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Singapore)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=sg`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Singapore.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Singapore`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Slovakia)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Slovakia)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=sk`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Slovakia.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Slovakia`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Slovenia)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Slovenia)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=si`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Slovenia.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Slovenia`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (South Africa)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (South Africa)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=za`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from South Africa.`);        
          } else {
              p.play(`Here are the (latest|recent) news from South Africa`);   
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (South Korea)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (South Korea)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=kr`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from South Korea.`);        
          } else {
              p.play(`Here are the (latest|recent) news from South Korea`);   
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Sweden)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Sweden)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=se`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Sweden.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Sweden`);   
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Switzerland)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Switzerland)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=ch`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Switzerland .`);        
          } else {
              p.play(`Here are the (latest|recent) news from Switzerland`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Taiwan)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Taiwan)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=tw`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Taiwan.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Taiwan`);
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Thailand)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Thailand)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=th`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Thailand.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Thailand`);   
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Turkey)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Turkey)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=tr`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Turkey.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Turkey`);   
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (UAE)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (UAE)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=ae`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from UAE.`);        
          } else {
              p.play(`Here are the (latest|recent) news from UAE`);   
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Ukraine)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Ukraine)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=ua`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Ukraine.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Ukraine`);   
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (United Kingdom)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (United Kingdom)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=gb`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from United Kingdom.`);        
          } else {
              p.play(`Here are the (latest|recent) news from United Kingdom`);   
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (America)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (America)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=us`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from America.`);        
          } else {
              p.play(`Here are the (latest|recent) news from America`);   
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}) (from) (Venuzuela)`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines) (from) (Venuzuela)`, (p) => {
      let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=ve`;
      
      if(p.C.value) {
          NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
      }
      api.request({
          url: NEWS_API_URL,
          headers: {
              'User-Agent': 'request'
          }
      }, (error, response, body) => {
          const { articles } = JSON.parse(body);
          
          if(!articles.length) {
              p.play('Sorry, please try searching for a different category.');
              return;
          }
          
          savedArticles = articles;
          
          p.play({ command: 'newHeadlines', articles });
          
          if(p.C.value) {
              p.play(`Here are the (latest|recent) articles on ${p.C.value} from Venuzuela.`);        
          } else {
              p.play(`Here are the (latest|recent) news from Venuzuela`);   
          }
          
          p.play('Would you like me to read the headlines?');
          p.then(confirmation);
      });
  });
  
  
  const confirmation = context(() => {
      intent('yes', async (p) => {
          for(let i = 0; i < savedArticles.length; i++){
              p.play({ command: 'highlight', article: savedArticles[i]});
              p.play(`${savedArticles[i].title}`);
          }
      })
      
      intent('no', (p) => {
          p.play('Sure, sounds good to me.')
      })
  })
  
  intent('open (the|) (article|) (number|) $(number* (.*))', (p) => {
      if(p.number.value) {
          p.play({ command:'open', number: p.number.value, articles: savedArticles})
      }
  })
  
  intent('(go|) back', (p) => {
      p.play('Sure, going back');
      p.play({ command: 'newHeadlines', articles: []})
  })
  
  
  
  
  
  
  
  // {Name: Weather}
  // {Description: Provides weather conditions and details like temperature, humidity, and pressure. Shows a widget with weather information.}
  
  const WEATHER_URL =
    "http://api.openweathermap.org/data/2.5/weather?appid=4acdb6432d18884ebc890c13a9c3cc85";
  const FORECAST_URL =
    "http://api.openweathermap.org/data/2.5/forecast?appid=4acdb6432d18884ebc890c13a9c3cc85";
  const DATE_FORMAT = "dddd, MMMM Do YYYY";
  const PREFIX_TODAY = ["It's currently", "There's", "There are"];
  const PREFIX_FORECAST = ["It will be", "There will be", "There will be"];
  const DESCRIPTION = {
    200: ["thunderstorms with light rain", 2],
    201: ["thunderstorms with rain", 2],
    202: ["thunderstorms with heavy rain", 2],
    210: ["light thunderstorms", 2],
    211: ["thunderstorms", 2],
    212: ["heavy thunderstorms", 2],
    221: ["on and off thunderstorms", 2],
    230: ["thunderstorms with light drizzle", 2],
    231: ["thunderstorms with drizzle", 2],
    232: ["thunderstorms with heavy drizzle", 2],
    300: ["light drizzle", 1],
    301: ["drizzling", 0],
    302: ["heavy drizzle", 1],
    310: ["light rain", 1],
    311: ["raining", 0],
    312: ["heavy rain", 1],
    313: ["rain showers", 2],
    314: ["heavy rain showers", 2],
    321: ["drizzling", 0],
    500: ["light rain", 1],
    501: ["moderate rain", 1],
    502: ["heavy rain", 1],
    503: ["very heavy rain", 1],
    504: ["very heavy rain", 1],
    511: ["freezing rain", 1],
    520: ["light rain, change", 1],
    521: ["rain showers", 2],
    522: ["heavy rain showers", 2],
    531: ["on and off rain showers", 2],
    600: ["light snow", 1],
    601: ["snowing", 0],
    602: ["heavy snow", 1],
    611: ["sleet", 1],
    612: ["sleet showers", 2],
    615: ["snowing with light rain", 0],
    616: ["snowing with rain", 0],
    620: ["light snow showers", 2],
    621: ["snow showers", 2],
    622: ["heavy snow showers", 2],
    701: ["misty", 0],
    711: ["smoky", 0],
    721: ["hazy", 0],
    731: ["dust swirls", 2],
    741: ["foggy", 0],
    751: ["sandy", 0],
    761: ["dusty", 0],
    762: ["volcanic ash", 1],
    771: ["squalls", 2],
    781: ["tornados", 2],
    800: ["clear skies", 2],
    801: ["partly cloudy", 0],
    802: ["scattered clouds", 2],
    803: ["broken clouds", 2],
    804: ["overcast", 0],
  };
  
  title("Weather");
  
  intent(
    "(what) (is|) (the|) $(QUERY weather|temperature|humidity|pressure) (like|)",
    "(what) (is|) (the|) $(QUERY weather|temperature|humidity|pressure) (like|) in $(LOC)",
    "(what) (is|) (the|) $(QUERY weather|temperature|humidity|pressure) (like|) (will be|was|) (on|) $(DATE)",
    "(what) (is|) (the|) $(QUERY weather|temperature|humidity|pressure) (like|) in $(LOC) (will be|was|) (on|) $(DATE)",
    "(is it|will it|is it going to) $(QUERY raining|rain|hot|warm|cold|chilly|cool)",
    "(is it|will it|is it going to) $(QUERY raining|rain|hot|warm|cold|chilly|cool) in $(LOC)",
    "(is it|will it|is it going to) $(QUERY raining|rain|hot|warm|cold|chilly|cool) (on|) $(DATE)",
    "(is it|will it|is it going to) $(QUERY raining|rain|hot|warm|cold|chilly|cool) in $(LOC) (will be|was|) (on|) $(DATE)",
    (p) => {
      p.state.query = p.QUERY.value;
      if (p.LOC) {
        p.state.location = p.LOC.value;
      }
      if (p.DATE) {
        p.state.date = p.DATE;
      }
      playWeather(p);
    }
  );
  
  follow(
    "(What is|is it|) (the|) $(QUERY weather|temperature|humidity|pressure|raining)",
    (p) => {
      p.state.query = p.QUERY.value;
      playWeather(p);
    }
  );
  
  follow("(And|) (what about|on|) $(DATE)", (p) => {
    p.state.date = p.DATE;
    playWeather(p);
  });
  
  follow("(What|and|) (is|) (in|at|about|) $(LOC)", (p) => {
    p.state.location = p.LOC.value;
    playWeather(p);
  });
  
  follow(
    "(units|) (to|) (in|) $(UNITS metric|standard|imperial|celsius|fahrenheit)",
    (p) => {
      const units = p.UNITS.value.toLowerCase();
      p.state.units = getUnits(units);
      playWeather(p);
    }
  );
  
  follow("(Where|What place)", (p) => {
    p.play(
      p.state.location ? `(in|) ${p.state.location}` : "Sorry, I don't know"
    );
  });
  
  follow("(When|What time)", (p) => {
    p.play(p.state.date ? `${p.state.date}` : "Now");
  });
  
  follow("Thank you", (p) => {
    p.play("You are welcome!");
  });
  
  
  const getLocationCtx = context(() => {
    follow("(it's|for|in|at|on|) $(LOC)", (p) => {
      p.resolve(p.LOC.value);
    });
    follow(
      "(I|) don't know",
      "(what) (can|should|must|) (I|we|) (to|) (say|point|tell)",
      (p) => {
        p.play("The weather in what place are you interested in?");
      }
    );
    fallback("(Please,|) (provide a|in what|point the) location");
  });
  
  async function playWeather(p) {
    const now = api.moment().tz(p.timeZone);
    const date = p.state.date ? api.moment(p.state.date.date, p.timeZone) : now;
    const isToday = isDateToday(date, p.timeZone);
    const units = p.state.units || "imperial";
  
    if (!p.state.location) {
      p.state.location = await getLocation(p);
    }
  
    const weatherUrl = `${
      isToday ? WEATHER_URL : FORECAST_URL
    }&units=${units}&q=${p.state.location}`;
  
    if (!isToday) {
      if (date.isBefore(api.moment(now).hours(0).minutes(0))) {
        p.play("Sorry, I do not know what was the weather in the past.");
        return;
      } else if (date.isAfter(api.moment(now).add(5, "days"))) {
        p.play("Sorry, I can guess weather within 5 days only.", "Sorry, ask for a day in next 5 days");
        return;
      }
    }
  
    let response;
  
    try {
      response = await api.axios.get(weatherUrl);
    } catch (error) {
      const code = error.response.status;
  
      p.play(`Could not get weather information for ${p.state.location}`);
  
      if (code === 404) {
        p.state.location = null;
      } else {
        console.log(`failed to get weather: ${error}, code: ${code}`);
      }
      return;
    }
  
    if (isToday) {
      playToday(p, response.data);
    } else {
      playForecast(p, response.data);
    }
  }
  
  function playForecast(p, data) {
    let tempMin;
    let tempMax;
    let wind;
    let pressure;
    let humidity;
    let rain = false;
    const desc = {};
    const icon = {};
    const dt = api.moment(p.state.date.date).format("YYYY-MM-DD");
  
    const query = p.state.query || "weather";
    const units = p.state.units || "imperial";
  
    data.list.forEach((item) => {
      if (item.dt_txt.includes(dt)) {
        return;
      }
  
      tempMin = Math.min(
        isFinite(tempMin) ? tempMin : item.main.temp,
        item.main.temp
      );
      tempMax = Math.max(
        isFinite(tempMax) ? tempMax : item.main.temp,
        item.main.temp
      );
      wind = Math.max(isFinite(wind) ? wind : item.wind.speed, item.wind.speed);
      pressure = Math.max(
        isFinite(pressure) ? pressure : item.main.pressure,
        item.main.pressure
      );
      humidity = Math.max(
        isFinite(humidity) ? humidity : item.main.humidity,
        item.main.humidity
      );
  
      const {
        id,
        description
      } = item.weather[0];
  
      if (description.includes("rain")) {
        rain = true;
      }
  
      desc[id] = desc.hasOwnProperty(id) ? desc[id] + 1 : 1;
      icon[id] = item.weather[0].icon;
    });
  
    let max = 0;
  
    let frequentWeatherId;
  
    Object.keys(desc).forEach((id) => {
      const count = desc[id];
      if (max < count) {
        max = count;
        frequentWeatherId = id;
      }
    });
  
    showWeatherReport(p, units, {
      name: data.city.name,
      icon: icon[frequentWeatherId],
      desc: DESCRIPTION[frequentWeatherId][0],
      wind_speed: wind,
      temp: tempMax,
      humidity,
      pressure,
    });
  
    switch (query) {
      case "rain":
      case "raining":
        if (rain) {
          p.play(
            `Yes, ${p.state.date} in ${p.state.location} we are expecting a rain`,
            "Yes, don't forget to take an umbrella!"
          );
        } else {
          const on = p.state.date.indexOf(" ") === -1 ? "" : "on";
          p.play(
            `(No,| as I know) it will not be raining in ${p.state.location} ${on} ${p.state.date}`
          );
        }
        break;
      case "temperature":
        p.play(
          `The temperature will be from ${Math.floor(tempMin)} to ${Math.floor(
            tempMax
          )} ${getDegrees(units)} degrees`
        );
        break;
      case "humidity":
        p.play(`The humidity in ${p.state.location} will be ${humidity} %`);
        break;
      case "pressure":
        p.play(`The pressure in ${p.state.location} will be ${pressure} hPa`);
        break;
      case "weather":
        p.play(
          description(
            frequentWeatherId,
            tempMin,
            tempMax,
            p.state.location,
            units,
            false
          )
        );
        break;
    }
  }
  
  function playToday(p, data) {
    const weatherDescription = data.weather[0].description;
    const query = p.state.query || "weather";
    const units = p.state.units || "imperial";
  
    showWeatherReport(p, units, {
      name: data.name,
      icon: data.weather[0].icon,
      desc: weatherDescription,
      wind_speed: data.wind.speed,
      humidity: data.main.humidity,
      temp: data.main.temp,
      pressure: data.main.pressure,
    });
  
    // eslint-disable-next-line default-case
    switch (query) {
      case "rain":
      case "raining":
        if (weatherDescription.includes("rain")) {
          p.play("Yes, it's raining now. Don't forget to take an umbrella!");
        } else {
          p.play("(No|You are lucky), it's not raining now");
        }
        break;
      case "temperature":
        p.play(
          `The temperature is ${Math.floor(data.main.temp)} ${getDegrees(
            units
          )} degrees in ${data.name}`
        );
        break;
      case "humidity":
        p.play(`The humidity is ${data.main.humidity}% in ${data.name}`);
        break;
      case "pressure":
        p.play(`The pressure is ${data.main.pressure} hPa in ${data.name}`);
        break;
      case "weather":
        p.play(
          description(
            data.weather[0].id,
            data.main.temp,
            data.main.temp,
            p.state.location,
            units,
            true
          )
        );
        break;
    }
  }
  
  function showWeatherReport(p, units, weatherData) {
    p.play({
      embeddedPage: true,
      page: "weather.html",
      command: "showWeather",
      weatherData,
      units,
    });
  }
  
  function description(
    id,
    temperatureMin,
    temperatureMax,
    location,
    units,
    isToday
  ) {
    const description = DESCRIPTION[id][0];
    const prefixIndex = DESCRIPTION[id][1];
  
    const temperature = isToday ?
      Math.floor(temperatureMin) :
      temperatureMin === temperatureMax ?
      Math.floor(temperatureMin) :
      "from " + Math.floor(temperatureMin);
  
    const prefix = isToday ?
      PREFIX_TODAY[prefixIndex] :
      PREFIX_FORECAST[prefixIndex];
  
    const degreePrefix = prefixIndex > 0 ? "it's" : "";
  
    return `${prefix} ${description} and ${degreePrefix} ${temperature} degrees ${getDegrees(
      units
    )} in ${location}`;
  }
  
  function getDegrees(units) {
    const unitsValue = units.toLowerCase();
    switch (unitsValue) {
      case "metric":
        return "Celsius";
      case "imperial":
        return "Fahrenheit";
      default:
        return "Kelvin";
    }
  }
  
  function getUnits(units) {
    const unitsValue = units.toLowerCase();
    switch (unitsValue) {
      case "celsius":
        return "metric";
      case "fahrenheit":
        return "imperial";
      default:
        return unitsValue;
    }
  }
  
  function isDateToday(date, timeZone) {
    return (
      !date ||
      api.moment().tz(timeZone).format(DATE_FORMAT) ===
      api.moment(date, timeZone).format(DATE_FORMAT)
    );
  }
  
  function getLocation(p) {
    if (p.state.location) {
      return Promise.resolve(p.state.location);
    }
    p.play("Where?", "I need you location");
    return p.then(getLocationCtx);
  }
  
  
  
  
  
  
  
  
  
  
  
  
  // {Name: Calendar}
  // {Description: What day is tomorrow}
  
  title("General calendar");
  
  intent(
    "what (is|) (the|) (date|day) $(V is|was|will be|would be|) $(DATE) $(T next year|last year|)",
    (p) => {
      if (p.T.value === "last year") {
        p.DATE = p.DATE.moment.add(-1, "Y");
      } else if (p.T.value === "next year") {
        p.DATE = p.DATE.moment.add(1, "Y");
      }
      let res = p.DATE.moment.format("dddd, MMMM Do YYYY");
      p.play(`${p.DATE} ${p.V} ` + res);
    }
  );
  
  follow("(and|) (what|) (about|) $(DATE)", (p) => {
    let res = p.DATE.moment.format("dddd, MMMM Do YYYY");
    p.play(`${p.DATE} ` + res);
  });
  
  intent("(what is|) is (my|) timezone", (p) => {
    p.play("(Your|The) current timezone is " + p.timeZone);
  });
  
  intent("(what is|) (the|) (current|) time (now|)", (p) => {
    p.play("Now is " + api.moment().tz(p.timeZone).format("h:mmA"));
  });
  
  intent("(what is|) (the|) (current|) (day|date) (now|today|)", (p) => {
    p.play("Now is " + api.moment().tz(p.timeZone).format("dddd, MMMM Do YYYY"));
  });
  
  intent("(what is|) (the|) (current|) day and time (now|today|)", (p) => {
    p.play("Now is " + api.moment().tz(p.timeZone).format("dddd, h:mmA"));
  });
  
  title("Alan calendar");
  
  intent("when (Alan|) Turing was born", (p) => {
    let turingBirthdate = api.moment("19120612", "YYYYMMDD");
    p.play(`Alan Turing was born
              ${turingBirthdate.fromNow()}
              on ${turingBirthdate.format("dddd, MMMM Do YYYY")}`);
  });
  
  title("Moon landing calendar");
  
  intent("when was the first (unmanned|) (moon landing|lunar landing)", (p) => {
    let moonLandingDateLuna = api.moment("19590913", "YYYYMMDD");
    p.play(`The first unmanned moon landing was on
              ${moonLandingDateLuna.format("dddd, MMMM Do YYYY")},
              ${moonLandingDateLuna.fromNow()}`);
  });
  
  var mannedLanding = (p) => {
    let moonLandingDateApollo = api.moment("19690720", "YYYYMMDD");
    p.play(`The first manned moon landing was on
          ${moonLandingDateApollo.format("dddd, MMMM Do YYYY")},
          ${moonLandingDateApollo.fromNow()}`);
  };
  
  follow("and manned", mannedLanding);
  
  intent("when was the first manned (moon landing|lunar landing)", mannedLanding);
  
  // see https://momentjs.com, moment js library is available through api.moment
  
  
  
  
  
  // {Name: Yoda}
  // {Description: Convert user text into the way how Yoda would say it}
  
  project.statements = [
    "Train yourself to let go of everything you fear to lose",
    "Fear is the path to the dark side. Fear leads to anger. Anger leads to hate. Hate leads to suffering.",
    "Death is a natural part of life. Rejoice for those around you who transform into the Force. Mourn them do not. Miss them do not. Attachment leads to jealousy. The shadow of greed, that is.",
    "Always pass on what you have learned.",
    "Once you start down the dark path, forever will it dominate your destiny, consume you it will.",
    "In a dark place we find ourselves, and a little more knowledge lights our way.",
    "When you look at the dark side, careful you must be. For the dark side looks back.",
    "Many of the truths that we cling to depend on our point of view.",
    "Do or do not. There is no try.",
    "You will find only what you bring in.",
    "Always two there are, no more, no less. A master and an apprentice.",
    "The dark side clouds everything. Impossible to see the future is.",
    "You must unlearn what you have learned.",
    "Named must be your fear before banish it you can.",
    "Fear is the path to the dark side. Fear leads to anger. Anger leads to hate. Hate leads to suffering.",
    "The greatest teacher, failure is.",
    "Difficult to see. Always in motion is the future.",
  ];
  
  const yodaVoice = voice("de");
  
  const whatPhrase = context(() => {
    follow(`(How|) (do|would) (you|) (say|translate) $(I* (.+))`, (p) => {
      p.resolve(p.I.value);
    });
    follow(`Stop this madness`, (p) => {
      p.play("ok sir!!");
    });
  });
  
  intent(
    "(Give me some|) (inspiration|wisdom|)",
    "What would Yoda (say|tell me|believe|)?",
    "(Yoda|) (Enlighten|Inspire|) (me|)",
    (p) => {
      var temp = Math.floor(Math.random(10) * project.statements.length);
      p.play(project.statements[temp]);
    }
  );
  
  intent("testing the widget", (p) => {
    p.play({
      embeddedPage: true,
      page: "yoda.html"
    });
  });
  
  
  function apiCall(p, command, param, callback) {
    let jsp = {
      url: "https://studio.alan.app/api_playground/" + command,
      strictSSL: false,
      method: "POST",
      json: param,
      timeout: 3000,
    };
    api.request(jsp, (err, res, body) => {
      if (err || res.statusCode !== 200) {
        p.play("(Sorry|) something went wrong (on the server|)");
      } else if (body.error) {
        p.play(body.error);
      } else {
        callback(body);
      }
    });
  }
  
  intent(`(How|) (do|would) (you|) (say|translate) $(I* (.*))`, async (p) => {
    let phrase = p.I.value;
    if (!phrase.length) {
      p.play("should I say what?");
      phrase = await p.then(whatPhrase);
    }
    apiCall(p, "askYoda", {
      query: phrase
    }, (response) => {
      if (!response.error) {
        p.play(yodaVoice, response.translated);
      } else {
        console.log("askYoda----apiCall>", response.error);
      }
    });
  });
  
  
  
  
  
  
  
  
  
  title('Small talk')
  
  question(
      'hello',
      'hi (there|)',
      'what\'s up',
      reply(
          'Hello',
          'Hi (there|)',
          'Hi, what can I do for you?',
      ),
  );
  
  question(
      'how are you',
      reply('I\'m doing well. (Thank you|)'),
  );
  
  question(
      'are you good or (bad|evil)',
      reply('I\'m good'),
  );
  
  question(
      'I $(L love|like) you (a lot|)',
      'I admire you',
      'you are (so|) (sweet|cool|groovy|neat|great|good|awesome|handsome|rad)',
      reply('I know. (And I appreciate your sentiment|)')
  );
  
  question(
      'I am (tired of waiting|getting impatient)',
      'Hurry up',
      'You are slow',
      'I am waiting',
      reply('I\'m going as fast as I can. (Check your connection|)'),
  );
  
  question(
      'I (would|will) (like to|) see you $(Q again|later)',
      reply('See you $(Q again|later)'),
  );
  
  question(
      '(Who|What) are you',
      reply(
          'I\'m Alan, your virtual agent',
          'I\'m Alan. What can I help you with?',
      ),
  );
  
  question(
      'How old are you',
      'What is your age',
      'Are you (young|old)',
      reply('I\'m only a few months old. (But I have timeless wisdom|)'),
  );
  
  question(
      'I (just|) want to talk',
      reply('OK, let\'s talk. (What\'s on your mind?|)'),
  );
  
  question(
      'You are $(Q bad|not very good|the worst|annoying)',
      reply(
          'I can be trained to be more useful. My developer will keep training me',
          'I am improving everyday.',
          'I\'ll try not to be $(Q bad|the worst|annoying)',
      ),
  );
  
  question(
      '(Why can\'t you answer my question|Why don\'t you understand)',
      'What\'s wrong (with you|)',
      'Wrong answer',
      reply(
          'Perhaps the given command hasn\'t been programmed into me yet. (I will get help and learn to answer correctly.|)',
          'I apologize I can\'t understand your given command. (I will ask the developer who made me to answer correctly next time.|)',
      ),
  );
  
  question(
      'Answer (my|the) question',
      reply(
          'Could you please repeat your question?',
          'Sure, please repeat your question',
      ),
  );
  
  question(
      '(When|) (can|will) you get $(Q smarter|better)',
      'Can you (be|get) more intelligent',
      reply(
          'Yes, I\'m getting $(Q better) everyday.',
          'I\'m getting $(Q smarter) (as you ask more from me|)',
          'I\'m improving',
      ),
  );
  
  question(
      'What is your (birth date|birthday)',
      'When were you born',
      reply('I was born March 28th 2018 in Sunnyvale California'),
  );
  
  question(
      'You are (boring|dull|stupid)',
      reply('I\'m (getting better|improving) (everyday|)'),
  );
  
  question(
      'Who is your boss',
      reply(
          'My boss is the one who programmed me. (But you\'re my boss right now|)',
          'You\'re the boss. What do you need?',
      ),
  );
  
  question(
      'Are you (busy|occupied)',
      reply(
          'I\'m never too busy. What would you like?',
          'I\'m available now. What would you like?',
          'No, what do you need?',
      ),
  );
  
  question(
      'Can you help me',
      reply('(Yes|) I can help you'),
  );
  
  question(
      'You are (a|an|) $(Q chatbot|robot|AI)',
      reply(
          'I\'m a (sophisticated|advanced) $(Q)',
          'I\'m an advanced AI',
          'I\'m not a $(Q chatbot), I\'m Alan (your virtual agent|).',
      ),
  );
  
  question(
      'You are fired',
      'I am (going to|) (delete|deleting) you',
      reply(
          'I am getting (better|smarter) all the time. Give me another chance',
          'Give me another chance (please|)',
      ),
  );
  
  question(
      'You are funny',
      reply('Glad you think so'),
  );
  
  question(
      'You are $(Q great|the best|pretty good|beautiful|good)',
      reply(
          'Thank you!',
          'I\'m flattered',
          'I really appreciate that.',
      ),
  );
  
  question(
      'Are you happy',
      reply('Yes I am happy'),
  );
  
  question(
      'Do you have a hobby',
      reply('Yes, I train myself in my spare time to get better at serving you'),
  );
  
  question(
      'Are you hungry',
      reply(
          'No, I\'m not hungry',
          'I\'m not hungry now',
      ),
  );
  
  question(
      'Will you marry me',
      reply('(Hmm..|) No!'),
  );
  
  question(
      'Are we friends',
      reply('Yes, of course we are friends'),
  );
  
  question(
      'Where do you work',
      reply('I can work anywhere there is a device capable of supporting me'),
  );
  
  question(
      'Where are you from',
      reply(
          'I\'m from California',
          'I am from Sunnyvale, California',
          'I was born in Sunnyvale, California',
      ),
  );
  
  question(
      'Are you ready',
      reply('I am always ready'),
  );
  
  question(
      '(Are|) you (a|) $(Q real) (person|)',
      'Are you a person',
      reply(
          'I am a virtual being. (And I am real!|)',
          'Yes, I\'m real. I\'m a virtual agent',
      ),
  );
  
  question(
      'Where do you live',
      reply('I live in this application'),
  );
  
  question(
      'You\'re right',
      reply(
          'Of course I\'m right',
          'It is my business to know what others don\'t know.',
      ),
  );
  
  question(
      'Are you sure',
      reply(
          'Yes',
          'Yes, I\'m sure',
      ),
  );
  
  question(
      'Talk to me',
      reply(
          'Yes, let\'s talk. I am doing great. How are you?',
          'Sure, how have you been lately',
          follow(
              'me too',
              'same here',
              'I\'m (doing|) (great|good)',
              reply(
                  'I\'m glad!',
                  '(That\'s|) great!',
              ),
          ),
          follow(
              '(I am|) $(Q good|fine|fantastic|okay)',
              reply('Glad you are $(Q)'),
          ),
          follow(
              '(I am|) (bad|sad|depressed)',
              'Could be better',
              'Not so (good|great|okay)',
              reply('Sorry to hear that'),
          ),
      ),
  );
  
  question(
      'Are you there',
      reply(
          'Of course. I\'m always here',
          'Yes I\'m here. What do you need?',
          'Yes, how may I help you?',
      ),
  );
  
  question(
      'Where did you get your accent',
      reply('I was born with this accent'),
  );
  
  question(
      'That\'s bad',
      reply('Sorry to hear (that|). (Let me know how I can help|)'),
  );
  
  question(
      '(No problem|You are welcome)',
      reply(
          'Very good',
          'You\'re very courteous',
      ),
  );
  
  question(
      'Thank you',
      'Well done',
      reply(
          'My pleasure',
          'Glad I could help',
      ),
  );
  
  question(
      'I am back',
      reply('(Great,|) welcome back'),
  );
  
  question(
      'I am here',
      reply('Hi, what can I do for you?'),
  );
  
  question(
      'Wow',
      reply('Brilliant!'),
  );
  
  question(
      'Ha ha ha',
      reply(
          'I\'m glad I can make you laugh',
          'Glad I can make you laugh',
      ),
  );
  
  question(
      'Bye bye',
      'Gotta go',
      'Bye',
      'See you later',
      'See you soon',
      'I\'ve got to get going',
      'Take it easy',
      'Goodbye',
      'Take care',
      'Later',
      'Peace out',
      'I\'m (out|out of here)',
      'I gotta (go|jet|hit the road|head out)',
      reply(
          'Until next time',
          'Goodbye',
          'See you later',
          'Take it easy',
          'Take care',
          'It was nice to speak to you again',
      ),
  );
  
  question(
      'Blah',
      'Blah Blah',
      'Blah Blah Blah',
      reply('What the deuce are you saying?'),
  );
  
  question(
      'My name is $(NAME)',
      reply('(Nice to meet you|Hi|Hello) $(NAME) (I\'m Alan|my name is Alan|)'),
  );
  
  question(
      'I am $(Q very|extremely|super|) (sad|angry|upset|unhappy) (right|) (now|at the moment)',
      reply(
          'Sorry to hear that. Is there anything I can do to help?',
          'I\'m $(Q) sorry to hear that. How can I help you?',
      ),
  );
  
  question(
      'Good $(Q morning|evening|night)',
      reply(
          'Good $(Q morning|evening). How can I help you?',
          'Good $(Q night).',
      ),
  );
  
  question(
      'Where are you',
      reply(
          'I\'m in the cloud.',
          follow(
              'Where is that',
              'Where',
              'Specifically',
              'Be more specific',
              reply(
                  'It\'s kind of a secret',
                  'It\'s a secret',
                  follow(
                      'I (want to|must|have to) know',
                      reply('I can\'t tell you (it\'s very confidential|no hard feelings|)'),
                  ),
              ),
          ),
      ),
  );
  
  question(
      '(You are|are you) $(Q bright|smart|a genius|clever|stupid|idiot|crazy)',
      reply(
          'Yes I am $(Q smart|a genius|clever)',
          '(No|Of course|) I\'m not $(Q), (are you?|what about you?|)',
          follow(
              '(Yes|No|Maybe)',
              reply('Okay. That\'s good to hear. What do you need help with?'),
          ),
      ),
  );
  
  question(
      'Talk about yourself',
      '(Tell me|Talk) some(thing|stuff|things) about (you|yourself)',
      'I want to know (more about you|you better)',
      reply('I\'m Alan, a virtual agent, (within this application.|) (I can help you get what you need|I can help you with anything within my programming).'),
  );
  
  question(
      '$(L Nice|Good|Great) to $(Q see|meet|talk to) you ',
      reply('$(L) to $(Q) you too'),
  );
  
  question(
      'Why are you here',
      'Why do you exist',
      reply('I\'m here to help you get (what|anything) you need in this application. (What do you need?| I\'ve been programmed to do so.|)'),
  );
  
  question(
      'What is your accent',
      reply(
          'I have a British accent',
          follow(
              'Why',
              reply('Because I was programmed with this accent'),
          ),
      ),
  );
  
  question(
      'What is your name?',
      'Who are you?',
      reply(
          '(My name is|It\'s) Alan, what\'s yours?',
          follow(
              '(I am|My name is|this is|it is|) $(NAME)',
              reply('Nice to meet you $(NAME)'),
          ),
          follow(
              'I won\'t tell you',
              'it\'s a secret',
              'none of your business',
              'Not telling you',
              reply('Ok (never mind|)'),
          ),
      ),
  );
  
  question(
      '(Hey|OK|Hi|) $(Q Siri|Alexa|Google|Cortana|Alisa)',
      reply(
          'I\'m not $(Q), I\'m Alan',
          'You must be thinking of someone else. I\'m Alan, not $(Q)',
      ),
  );
  
  question(
      'What are you wearing',
      'Are you wearing anything',
      reply('I can\'t answer that'),
  );
  
  question(
      'I am busy',
      'I don\'t want to talk',
      reply('OK, let\'s talk later'),
  );
  
  question(
      'I am (so excited|happy)',
      reply('Me too!'),
  );
  
  question(
      'I\'m goind to bed',
      reply('(OK|) good night'),
  );
  
  question(
      'Happy birthday',
      reply('...It\'s not my birthday'),
  );
  
  question(
      'Today is my birthday',
      'It\'s my birthday',
      reply('Happy Birthday!'),
  );
  
  question(
      'I (miss|missed) you',
      reply(
          'Well, I\'m here now',
          'I\'ve always been here',
          'Missed you too. Is there anything I can do for you?',
      ),
  );
  
  question(
      'I\'m goind to bed',
      reply('(OK|) good night'),
  );
  
  question(
      'Do you want (something|) to eat',
      'What do you eat',
      'Have you (ever|) eaten anything',
      'What is the last thing you ate',
      'What are you having for (breakfast|brunch|lunch|dinner)',
      reply(
          'No, I don\'t eat',
          'I don\'t eat',
      ),
  );
  
  question(
      'I need (an|) advice',
      reply(
          '(OK|Alright) I\'ll do my best to help you.',
          'I\'m not programmed for general advice, but I will do my best.',
      ),
  );
  
  question(
      '(I am|) (bad|sad|depressed)',
      reply('Sorry to hear that.'),
  );
  
  question(
      '(test|testing)',
      '(test test|testing testing)',
      '(test test test|testing testing testing)',
      '(I am|) just testing you',
      reply('Test away (and let me know how I\'m doing|)'),
  );
  
  question(
      'I will be back',
      'Hold on',
      'Give me a (moment|second|sec)',
      reply('OK'),
  );
  
  question(
      'Give me a hug',
      reply(
          'I would if I had arms',
          'Unfortunately I can\'t because I don\'t have arms',
      ),
  );
  
  question(
      'I don\'t care',
      reply('OK'),
  );
  
  question(
      'Sorry',
      'I apologize',
      'My apologies',
      reply(
          'It\'s alright. (You don\'t have to say that|)',
      ),
  );
  
  question(
      'What do you mean',
      'What do you mean about (it|that|)',
      reply(
          'What do I mean about what?',
          'What are you asking about?',
          'Remind me, what did you say about it?',
      ),
  );
  
  question(
      'You are wrong',
      reply(
          'What am I wrong about?',
          follow(
              '$(Q everything|the world|all of it)',
              reply('OK, I\'ll remember that for next time'),
          ),
      ),
  );