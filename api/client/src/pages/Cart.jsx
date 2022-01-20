import { Remove, Add, ArrowBack } from "@material-ui/icons";
import styled from "styled-components";
import Annoucement from "../component/Annoucement";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { publicReq } from "../reqMethod";
import { Link, useHistory } from "react-router-dom";
import { removeAmount, changeAmount, removeAll } from "../redux/cartRedux";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 2rem;
  ${mobile({ padding: "10px" })}
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > * {
    flex: 1;
  }
`;
const Continue = styled.div`
  cursor: pointer;
  gap: 1rem;
  display: flex;

  &:hover {
    opacity: 0.8;
    text-decoration-color: rgba(0, 0, 0, 0.8);
  }
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  margin-bottom: 2rem;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  cursor: pointer;
`;
const Details = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.span`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: block;
  background-color: ${props => props.color};
`;

const ProductColorContainer = styled.span`
  display: flex;
`;
const ProductSize = styled.div``;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.4rem;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
`;
const ProductAmount = styled.div`
  font-size: 2.4rem;
  padding: 1rem 1.5rem;
  border-top: solid 1px black;
  border-bottom: solid 1px black;
  cursor: default;
  ${mobile({ margin: "0.5rem 1.5rem" })};
`;

const ProductAmountAction = styled.div`
  font-size: 2.4rem;
  padding: 1rem 1.5rem;

  border: solid 1px;
  cursor: ${props => (props.disable === 1 ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;

  &:hover {
    background-color: black;
    color: white;
  }
  ${mobile({ margin: "0.5rem 1.5rem" })};
`;

const ProductPrice = styled.div`
  font-size: 2rem;
  font-weight: 200;
  ${mobile({ marginBottom: "2rem" })};
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 2px;
  margin-bottom: 2rem;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgrey;
  border-radius: 10px;
  padding: 2rem 2rem 0rem 2rem;
  height: 50vh;
  margin-left: 1rem;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 3rem 0;
  display: flex;
  justify-content: space-between;
`;
const SummaryItemText = styled.span`
  font-weight: ${props => props.type === "total" && 500};
  font-size: ${props => props.type === "total" && "2.4rem"};
`;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

const Price = styled.span`
  letter-spacing: 2px;
  font-size: 3rem;
`;

const RemoveProduct = styled.span`
  cursor: pointer;
  color: #3f3f3f;
  &:hover {
    color: grey;
    text-decoration: underline;
    text-decoration-color: grey;
  }
`;

const CartItem = ({ p, index }) => {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(p.quantity);

  const handleClick = () => {
    dispatch(removeAmount(index));
  };

  useEffect(() => {
    setAmount(p.quantity);
  }, [p.quantity]);

  return (
    <>
      <Product>
        <ProductDetail>
          <Link to={`/product/${p._id}`}>
            <Image src={p.image} />
          </Link>
          <Details>
            <ProductName>
              <b>Product:</b> {p.title?.toUpperCase()}
            </ProductName>
            <ProductId>
              <b>Id:</b> {p._id}
            </ProductId>
            <ProductColorContainer>
              <b>Color: </b>&nbsp;
              <ProductColor color={p.color} />
            </ProductColorContainer>

            <ProductSize>
              <b>Size:</b> {p.size ? p.size : "NOT APPLICABLE"}
            </ProductSize>

            <ProductSize>
              <b>Price:</b> $ {p.price}.00
            </ProductSize>
          </Details>
        </ProductDetail>
        <PriceDetail>
          <ProductAmountContainer>
            <ProductAmountAction
              onClick={() => {
                amount > 1 && setAmount(prev => prev - 1);
                amount > 1 &&
                  dispatch(changeAmount({ type: "SUBTRACT", index: index }));
              }}
              disable={amount}
            >
              <Remove />
            </ProductAmountAction>
            <ProductAmount>{amount}</ProductAmount>
            <ProductAmountAction
              onClick={() => {
                setAmount(prev => prev + 1);
                dispatch(changeAmount({ type: "ADD", index: index }));
              }}
            >
              <Add />
            </ProductAmountAction>
          </ProductAmountContainer>
          <ProductPrice>
            Subtotal: <Price>$ {amount * p.price}.00</Price>
          </ProductPrice>
          <RemoveProduct onClick={() => handleClick()}>Remove</RemoveProduct>
        </PriceDetail>
      </Product>
      <Hr />
    </>
  );
};

export default function Cart() {
  const cart = useSelector(state => state.cart);
  const KEY = process.env.REACT_APP_StripeKey;
  const [disableBtn, setDisableBtn] = useState(false);
  const dispatch = useDispatch();

  const history = useHistory();
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = token => {
    setStripeToken(token);
  };

  useEffect(() => {
    cart.total === 0 ? setDisableBtn(true) : setDisableBtn(false);
  }, [cart.total]);
  useEffect(() => {
    const makePayment = async () => {
      let item = [];

      cart.products.map(c => {
        item.push({
          productId: c._id,
          color: c.color || null,
          size: c.size || null,
          quantity: c.quantity,
        });
      });
      const userDetail = {
        products: item,
        amount: cart.total,
      };
      try {
        const res = await publicReq.post("/order", {
          token: stripeToken,
          amount: cart.total * 100,
          order: userDetail,
        });
        dispatch(removeAll());
        history.push("/success", { data: res.data });
      } catch (e) {
        console.log(e);
      }
    };

    stripeToken && makePayment();
  }, [stripeToken, cart.total, history]);
  return (
    <Container>
      <Navbar />
      <Annoucement />
      <Wrapper>
        <Top>
          <Continue onClick={() => history.push("/products")}>
            <ArrowBack />

            <span>CONTINUE SHOPPING</span>
          </Continue>
          <Title style={{ marginRight: "auto", marginLeft: "auto" }}>
            YOUR CART
          </Title>
          <Title></Title>
        </Top>
        <Hr />

        <Bottom>
          <Info>
            {cart.products?.map((p, index) => (
              <CartItem p={p} index={index} />
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Total (Excluding Shipping Fee)</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Fee</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Fee's Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText type="total">Total</SummaryItemText>
              <SummaryItemPrice>
                <b> $ {cart.total}</b>
              </SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              stripeKey={KEY}
              image="https://scalebranding.com/wp-content/uploads/2020/07/black-dog-01.jpg"
              name="DOGYE. "
              description={`Your Total Bill is USD ${cart.total}`}
              amount={cart.total * 100}
              shippingAddress
              token={onToken}
            >
              <Button disabled={disableBtn}>CHECKOUT</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
}
