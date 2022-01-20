import { mobile } from "../responsive";
import styled from "styled-components";
import Navbar from "../component/Navbar";
import Annoucement from "../component/Annoucement";
import { Done } from "@material-ui/icons";
import { Link } from "react-router-dom";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  ${mobile({ padding: "10px" })};
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  padding: 10rem;
`;

const Track = styled.span`
  cursor: pointer;
  font-size: 2rem;

  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;

export default function NoPages() {
  return (
    <Container>
      <Navbar />
      <Annoucement />

      <Wrapper>
        <Bottom>
          <h1>Sorry, This page doesn't exist</h1>
          <Link to="/products" style={{ color: "black" }}>
            <Track>Click here to continue shopping</Track>
          </Link>
        </Bottom>
      </Wrapper>
    </Container>
  );
}
