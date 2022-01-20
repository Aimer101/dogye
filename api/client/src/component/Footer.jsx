import {
  EmailOutlined,
  Facebook,
  Instagram,
  Phone,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  color: white;
  background-color: black;
  ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 3rem;

  gap: 3rem;
`;

const Logo = styled.h1`
  ${mobile({ textAlign: "center" })}
`;
const Desc = styled.p`
  ${mobile({ textAlign: "center" })}
`;
const SocialContainer = styled.h1`
  display: flex;
  ${mobile({ justifyContent: "center" })}
`;
const SocialIcon = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  color: white;
  background-color: #${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2rem;
  cursor: pointer;
`;
const Center = styled.div`
  flex: 1;
  padding: 3rem;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 3.5rem;
  cursor: default;
  font-weight: 800;
`;
const List = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 1rem;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: #616161;
  }
`;
const Right = styled.div`
  flex: 1;
  padding: 3rem;
  ${mobile({ backgroundColor: "#eee" })}
`;

const ContactItem = styled.div`
  align-content: center;
  display: flex;
  margin-bottom: 2rem;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: #616161;
  }
`;

const Payment = styled.img`
  width: 50%;
  background-color: white;
`;

export default function Footer() {
  return (
    <Container>
      <Left>
        <Logo>DOGYE.</Logo>
        <Desc>
          This is just a sample text. I really don't know what to fill in and
          kinda got bored with lorem ipsum. I really hope whoever read this will
          have a great day.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook style={{ fontSize: 25 }} />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram style={{ fontSize: 25 }} />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter style={{ fontSize: 25 }} />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>USELESS LINKS</Title>
        <List>
          <ListItem>FAQ</ListItem>
          <ListItem>Delivery Information</ListItem>
          <ListItem>Returns Policy</ListItem>
          <ListItem>Make A Return</ListItem>
          <ListItem>Orders</ListItem>
          <ListItem>Submit A Fake</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title></Title>
        <ContactItem>
          <Room style={{ fontSize: 25, marginRight: "1rem" }} />
          12345, Somewhere on Earth, Area 51
        </ContactItem>
        <ContactItem>
          <Phone style={{ fontSize: 25, marginRight: "1rem" }} />
          +1 23456789
        </ContactItem>
        <ContactItem>
          <EmailOutlined style={{ fontSize: 25, marginRight: "1rem" }} />
          contact@doge.example
        </ContactItem>
        <Payment src="https://www.pngkey.com/png/full/398-3987066_payment-methods-transparent-trust-badges-shopify.png" />
      </Right>
    </Container>
  );
}
