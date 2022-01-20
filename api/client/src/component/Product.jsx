import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  width: 30%;
  margin: 0.5rem auto;
  min-width: 28rem;
  height: 35rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  transition: all 0.5s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

export default function Product({ item }) {
  return (
    <Container>
      <Image src={item.image} />
      <Info>
        <Icon>
          <ShoppingCartOutlined style={{ fontSize: "20" }} />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`} style={{ color: "black" }}>
            <SearchOutlined style={{ fontSize: "20" }} />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined style={{ fontSize: "20" }} />
        </Icon>
      </Info>
    </Container>
  );
}
