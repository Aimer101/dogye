import { useLocation } from "react-router";
import { mobile } from "../responsive";
import styled from "styled-components";
import Navbar from "../component/Navbar";
import Annoucement from "../component/Annoucement";
import { Done } from "@material-ui/icons";
import { Link } from "react-router-dom";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  ${mobile({ padding: "10px" })};
`;

const Top = styled.div`
  background-color: green;
  padding: 1rem;
  border-radius: 50%;
`;
const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;

const Track = styled.span`
  cursor: pointer;
  font-size: 2rem;

  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;

export default function Success() {
  const location = useLocation();
  const id = location.state?.data._id;
  return (
    <Container>
      <Navbar />
      <Annoucement />

      <Wrapper>
        <Top>
          <Done style={{ fontSize: "6rem", color: "white" }} />
        </Top>
        <Bottom>
          <h1>YOUR ORDER HAS BEEN RECEIVED</h1>
          <h2>Thank you for your purchase</h2>
          <Link style={{ color: "black" }} to={`/track/${id}`}>
            <Track>You can track your order here</Track>
          </Link>
        </Bottom>
      </Wrapper>
    </Container>
  );
}
