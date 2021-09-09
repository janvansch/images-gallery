import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

// const Header = (props) => { // props is an object
//     return (
//         <Navbar bg="primary" variant="dark">
//             <Navbar.Brand href="/">{props.title}</Navbar.Brand>
//         </Navbar>
//     )
// };

const Header = ({ title }) => {
  // with destructuring
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">{title}</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
