import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  flex-direction: column;
  width: 30%;
  margin: 1rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  width: 70%;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  cursor: pointer;
`;

const TextContainer = styled.div`
  background-color: "yellow";
  width: 70%;
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
`;
const Title = styled.span`
  font-weight: 500;
  font-size: 1.8rem;
  color: #525252;
`;
const Price = styled.h1`
  font-weight: 700;
  font-size: 1.8rem;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  background-color: #00000076;
  width: 100%;
  height: 100%;
  display: flex;
  opacity: 0;
  transition: all 0.2s ease;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 1;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  font-weight: 600;
`;
export default function NewReleaseItem(props) {
  const item = { ...props.props };
  return (
    <Container>
      <ImageContainer>
        <Image src={item.image}></Image>
        <Info>
          <Link to={`/product/${item._id}`}>
            <Button>VIEW DETAILS</Button>
          </Link>
        </Info>
      </ImageContainer>
      <TextContainer>
        <Title>{item.title}</Title>
        <Price>$ {item.price} USD</Price>
      </TextContainer>
    </Container>
  );
}
