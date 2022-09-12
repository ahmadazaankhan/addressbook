import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';



function Header() {
return (
<>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            Address Book
          </Navbar.Brand>
        </Container>
      </Navbar>
</>
);
}
export default Header;