import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { ReactComponent as Logo } from '../images/logo.svg';

// const Header = (props) => { // props is an object
//     return (
//         <Navbar bg="primary" variant="dark">
//             <Navbar.Brand href="/">{props.title}</Navbar.Brand>
//         </Navbar>
//     )
// };

// with destructuring
const Header = ({ title }) => {
  // Replaced <Navbar.Brand href="/">{title}</Navbar.Brand> with logo
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Logo style={{ maxWidth: '14rem', maxHeight: '3rem' }} />
      </Container>
    </Navbar>
  );
};

export default Header;
