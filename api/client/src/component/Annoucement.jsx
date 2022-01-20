import styled from "styled-components";

const Container = styled.div`
  height: 3rem;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 500;
`;

export default function Annoucement() {
  return (
    <Container>
      The payment is made by Stripe but is in testing mode. Please don't use
      your actual credit/debit card's credentials.
    </Container>
  );
}
