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
  background-color: #0000007d;
`;

const Text1 = styled.h1`
  color: white;
  font-size: 4rem;
  margin-bottom: 2rem;
  letter-spacing: 2px;
`;

const Text2 = styled.span`
  color: white;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  font-weight: 700;
  padding: 1rem 2rem;
  font-size: 1.8rem;
  border-radius: 20px;
  cursor: pointer;
  border: none;
`;

const Image = styled.img`
  width: 100%;
`;

export default function Header3() {
  return (
    <Container>
      <Wrapper>
        <Image src="https://cdn.shopify.com/s/files/1/0156/6146/files/Desktop_Summer_1_1900x.jpg?v=1636590195" />
        <TextBackground>
          <Text1>IT'S IN THE DETAIL</Text1>
          <Text2>Experience the precision in every little detail</Text2>
          <Link to="/products">
            <Button>VIEW ALL PRODUCTS</Button>
          </Link>
        </TextBackground>
      </Wrapper>
    </Container>
  );
}
