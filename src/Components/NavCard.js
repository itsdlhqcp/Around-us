import { Container, Carousel } from 'react-bootstrap';

const infoCards = [
  { color: '#808080', title: 'Get World News', link: '/world' },
  { color: '#808080', title: 'Get News from India', link: '/india' },
  { color: '#808080', title: 'Get National News', link: '/national' },
];

const NavCard = () => {
    return (
      <div style={{ margin: "5px 0px 0px 0px" }}>
        <Container>
          <Carousel interval={2200} pause={false} controls={false} indicators={false}>
            {infoCards.map((infoCard, i) => (
              <Carousel.Item key={i}>
                <a href={infoCard.link}style={{ textDecoration: 'none' }}>
                  <div className="p-1" style={{ backgroundColor: infoCard.color}}>
                    <h4 style={{ margin: 'auto', fontStyle: 'helvetica', color: '#fff' }}>{infoCard.title}</h4>
                  </div>
                </a>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </div>
    );
};

export default NavCard;


































// import { Container, Carousel } from 'react-bootstrap';


// const infoCards = [
//   { color: '#808080', title: 'Get World News' },
//   { color: '#808080', title: 'Get News from India' },
//   { color: '#808080', title: 'Get National News' },
// ];

// const NavCard = () => {
//     return (
//       <div style={{ margin: "7px 0px 0px 0px" }}>
//         <Container>
//           <Carousel interval={3000} pause={false} controls={false} indicators={false}>
//             {infoCards.map((infoCard, i) => (
//               <Carousel.Item key={i}>
//                 <div className="p-1" style={{ backgroundColor: infoCard.color }}>
//                   <h4 style={{ margin: 'auto' }}>{infoCard.title}</h4>
//                 </div>
//                 <a/>
//               </Carousel.Item>
//             ))}
//           </Carousel>
//         </Container>
//       </div>
//     );
// };



// export default NavCard;
