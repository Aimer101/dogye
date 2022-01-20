import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  flex: 1;
  margin: 0.3rem;
  height: 70vh;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;

  &:hover img {
    transform: scale(1.1);
  }
`;
const Info = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}
  transition: all 0.2s ease-in-out;
`;
const Title = styled.h1`
  color: white;
  margin-bottom: 2rem;
`;
const Button = styled.button`
  border: none;
  padding: 1rem;
  background-color: white;
  color: grey;
  cursor: pointer;
  font-weight: 600;
`;

export default function CategoryItem({ item }) {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
}
