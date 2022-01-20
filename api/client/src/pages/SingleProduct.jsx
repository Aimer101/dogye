import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import Annoucement from "../component/Annoucement";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { publicReq } from "../reqMethod";
import { mobile } from "../responsive";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 5rem;
  display: flex;
  ${mobile({ padding: "1rem", flexDirection: "column" })}
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0 5rem;
  ${mobile({ padding: "1rem" })}
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 2rem 0;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 4rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 3rem 0;
  ${mobile({ width: "100%" })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 2rem;
  font-weight: 200;
`;

const FilterColorContainer = styled.div`
  width: 2.8rem;
  border-radius: 50%;

  height: 2.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: ${props =>
    props.index === true ? "solid black 2px" : "solid white 2px"};
  margin-left: 0.5rem;
`;
const FilterColor = styled.div`
  width: 2.2rem;
  border-radius: 50%;
  height: 2.2rem;
  background-color: ${prop => prop.color};
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 1rem;
  padding: 0.5rem;
`;
const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 3rem;
  height: 3rem;
  border-radius: 10px;
  border: solid 1px teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.5rem;
`;
const Button = styled.button`
  padding: 15px;
  border: solid 2px teal;
  background-color: white;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: teal;
    color: white;
  }
`;

export default function SingleProduct() {
  const [colorIndex, setColorIndex] = useState(0);

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [detail, setDetail] = useState({});
  const [selected, setSelected] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await publicReq.get(`/product/find/${id}`);
        setDetail(res.data);
      } catch (e) {}
    };
    fetch();
  }, [id]);

  useEffect(() => {
    Object.keys(detail).length > 0 &&
      setSelected({
        _id: detail._id,
        title: detail.title,
        color: detail.color[colorIndex],
        size: detail.size[0],
        price: detail.price,
        image: detail.image,
        quantity,
      });
  }, [detail]);

  useEffect(() => {
    Object.keys(detail).length > 0 &&
      setSelected({
        ...selected,
        color: detail.color[colorIndex],
      });
  }, [colorIndex]);

  const handleQ = action => {
    if (action === "plus") {
      return setQuantity(quantity + 1);
    } else {
      if (quantity > 1) {
        return setQuantity(quantity - 1);
      }
    }
  };

  const handleClick = () => {
    dispatch(
      addProduct({
        product: { ...selected, quantity },
        price: selected.price * quantity,
      })
    );
  };

  return (
    <Container>
      <Navbar />
      <Annoucement />
      <Wrapper>
        <ImgContainer>
          <Image src={detail.image}></Image>
        </ImgContainer>
        <InfoContainer>
          <Title>{detail.title}</Title>
          <Desc>{detail.desc}</Desc>
          <Price>$ {detail.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {detail.color?.map((c, index) => (
                <FilterColorContainer
                  index={index === colorIndex && true}
                  onClick={() => setColorIndex(index)}
                >
                  <FilterColor color={c} key={c} />
                </FilterColorContainer>
              ))}
            </Filter>
            {detail.size?.length > 0 && (
              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize
                  name="size"
                  onChange={e =>
                    setSelected({ ...selected, size: e.target.value })
                  }
                >
                  {detail.size?.map(s => (
                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                  ))}
                </FilterSize>
              </Filter>
            )}
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove
                style={{ fontSize: 20, cursor: "pointer" }}
                onClick={() => handleQ("minus")}
              />
              <Amount>{quantity}</Amount>
              <Add
                style={{ fontSize: 20, cursor: "pointer" }}
                onClick={() => handleQ("plus")}
              />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
}
