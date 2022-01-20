import React from "react";
import styled from "styled-components";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";

const Container = styled.div`
  height: 6rem;
  position: sticky;
  top: 0;
  z-index: 100000;
  background: black;
  color: white;

  ${mobile({ height: "5rem" })};
`;

const Wrapper = styled.div`
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "1rem 0" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  margin-top: -1rem;
`;

const Logo = styled.span`
  font-weight: bold;
  color: inherit;
  cursor: pointer;
  font-size: 3.5rem;

  ${mobile({ fontSize: "2.4rem" })}
`;

const LogoImg = styled.img`
  height: 6rem;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: inherit;
  ${mobile({ justifyContent: "center", flex: "2" })}
`;

const MenuItem = styled.div`
  font-size: 1.6rem;
  cursor: pointer;
  margin-left: 2.5rem;
  ${mobile({ fontSize: "1.2rem", marginLeft: "1rem" })}
`;

export default function Navbar() {
  const quantity = useSelector(state => state.cart.quantity);
  const history = useHistory();

  const useStyles = makeStyles(theme => ({
    badge: {
      fontSize: 14,
    },
  }));
  const classes = useStyles();

  return (
    <Container>
      <Wrapper>
        <Left></Left>
        <Center>
          <LogoContainer>
            <LogoImg src="/icon/doge.png" />
            <Logo onClick={() => history.push("/")}>DOGYE.</Logo>
          </LogoContainer>
        </Center>
        <Right>
          <Link to="/cart" style={{ color: "black" }}>
            <MenuItem>
              <Badge
                badgeContent={quantity}
                color="primary"
                classes={{ badge: classes.badge }}
              >
                <ShoppingCartOutlined
                  style={{ fontSize: 25, color: "white" }}
                />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
}
