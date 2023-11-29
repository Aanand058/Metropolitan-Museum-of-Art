import { Container, Nav, Navbar, Form, Button, NavDropdown } from "react-bootstrap";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { addToHistory } from "@/lib/userData";
import { readToken } from "@/lib/authenticate";
import { removeToken } from "@/lib/authenticate";

export default function MainNav() {

  const router = useRouter();
  const [searchField, setSearchField] = useState("");

  const [isExpanded, setIsExpanded] = useState(false);

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  let token = readToken();

  const logout = () => {
    setIsExpanded(false);
    removeToken();
    router.push("/login");
  };



  const submitForm = async (e) => {
    e.preventDefault();
    setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
    router.push(`/artwork?title=true&q=${searchField}`);
  };

  function handleNavbarToggle() {
    setIsExpanded(!isExpanded); 
  }

  function handleNavLinkClick() {
    setIsExpanded(false); 
  }

  return (
    <>
      <Navbar expand="lg" expanded={isExpanded} className="fixed-top navbar-dark bg-primary">

        <Navbar.Brand>Aanand Aman</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleNavbarToggle} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link active={router.pathname === "/home"} onClick={handleNavLinkClick}>Home</Nav.Link></Link>
            {token && <Link href="/search" passHref legacyBehavior>
              <Nav.Link active={router.pathname === "/search"} onClick={handleNavLinkClick}>Advanced Search</Nav.Link></Link>
            }
          </Nav>
          &nbsp;
          {token && < Form className="d-flex" onSubmit={submitForm}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
            />
            <Button type="submit" variant="success">Search</Button>
          </Form>}
          &nbsp;
          {token &&
            <Nav>
              <NavDropdown title={token.userName}>
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item active={router.pathname === "/favourites"} onClick={handleNavLinkClick}>Favourites</NavDropdown.Item></Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item active={router.pathname === "/history"} onClick={handleNavLinkClick}>Search History</NavDropdown.Item></Link>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          }
          {!token && (
            <Nav>
              <Link href="/register" passHref legacyBehavior>
                <Nav.Link onClick={handleNavLinkClick} active={router.pathname === "/register"}>Register</Nav.Link>
              </Link>
              <Link href="/login" passHref legacyBehavior>
                <Nav.Link onClick={handleNavLinkClick} active={router.pathname === "/login"}>Login</Nav.Link>
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>

      </Navbar>
      <br /><br /><br />
    </>
  );
}