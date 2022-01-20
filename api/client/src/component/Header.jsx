import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 6rem - 3rem);
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  position: relative;
`;

const TextBackground = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: #0000008f;
`;

const Text1 = styled.h1`
  color: white;
  font-size: 5rem;
`;

const Text2 = styled.span`
  color: white;
  font-size: 2rem;
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  margin-right: 2.5rem;
  font-weight: 700;
  margin-left: 2.5rem;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  border-radius: 20px;
  cursor: pointer;
  border: none;
  background-color: ${props => props.col};
  color: ${props => (props.col === "grey" ? "white" : "black")};
`;

const Image = styled.img`
  width: 100%;
`;

export default function Header() {
  return (
    <Container>
      <Wrapper>
        <Image src="https://cdn.shopify.com/s/files/1/0156/6146/files/NAM_DESKTOP_1900x.jpg?v=1638380828" />
        <TextBackground>
          <Text1>DO YOU EVEN GIFT</Text1>
          <Text2>There's no time like present</Text2>
          <ButtonContainer>
            <Link to="/products/women" style={{ cursor: "default" }}>
              <Button col="white">SHOP GIFTS FOR HER</Button>
            </Link>
            <Link to="/products/men" style={{ cursor: "default" }}>
              <Button col="grey">SHOP GIFTS FOR HIM</Button>
            </Link>
          </ButtonContainer>
        </TextBackground>
      </Wrapper>
    </Container>
  );
}
