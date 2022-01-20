import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  background-color: black;
  color: white;
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;

const Text = styled.span``;

const Button = styled.button`
  padding: 1rem 3rem;
  margin-left: 3rem;
  font-weight: 800;
  font-size: 1.5rem;
  border-radius: 20px;
  cursor: pointer;
`;

export default function Unlock() {
  return (
    <Container>
      <Text>
        Unlock exclusive deals, our latest drops, and more! Sign up for
        newsletter.
      </Text>
      <Link to="/register" style={{ cursor: "default" }}>
        <Button>SIGN UP</Button>
      </Link>
    </Container>
  );
}
