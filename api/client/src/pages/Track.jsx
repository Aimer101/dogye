import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import Annoucement from "../component/Annoucement";
import Navbar from "../component/Navbar";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { publicReq } from "../reqMethod";
import { Search } from "@material-ui/icons";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 5rem;

  ${mobile({ padding: "10px" })}
`;

const Top = styled.div`
  margin-bottom: 3rem;
`;
const Middle = styled.div`
  display: flex;
  gap: 1rem;
  & > * {
    flex: 1;
  }
`;

const Progress = styled.div`
  background-color: grey;
  border-radius: 10px;
  height: 10px;
`;

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 5rem;
`;
const ImageContainer = styled.div`
  text-align: center;
  flex: 1;
`;

const Text = styled.p`
  text-align: center;
  margin-top: 0.8rem;
  color: grey;
`;
const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  & > * {
    flex: 1;
    padding: 10px;
    font-size: 2rem;
    text-align: center;
  }

  & > h1 {
    background-color: black;
    color: white;
    margin-bottom: 2rem;
  }
`;

const Left = styled.div``;
const Center = styled.div``;
const Right = styled.div``;
const WrapperSearch = styled.div`
  padding: 20rem;

  ${mobile({ padding: "10px" })};
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  gap: 1rem;
`;

const Title = styled.h1`
  text-align: center;
`;
const Input = styled.input`
  padding: 1rem 2rem;
  flex: 0 0 50%;
  font-size: inherit;
  &:focus {
    outline: none;
  }
`;
const Button = styled.button`
  padding: 1rem 2rem;
  background-color: black;
  color: White;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export default function Track() {
  const location = useLocation();
  const trackingId = location.pathname.split("/")[2];
  const history = useHistory();
  const [searchId, setSearchId] = useState("");
  const [item, setItem] = useState({});
  let [date, setDate] = useState("");
  const [err, setErr] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setErr(false);
        const res = await publicReq.get(`/order/find/${trackingId}`);
        setItem(res.data);
        setDate(res.data.createdAt);
      } catch (e) {
        setErr(true);
      }
    };
    trackingId && fetch();
    !trackingId && setErr(false);
  }, [trackingId]);

  const handleSubmit = e => {
    e.preventDefault();
    history.push(`/track/${searchId}`);
  };

  return (
    <Container>
      <Navbar />
      <Annoucement />
      {err && (
        <WrapperSearch>
          <h1 style={{ textAlign: "center" }}>PACKAGE DOES NOT EXIST</h1>
        </WrapperSearch>
      )}
      {trackingId && !err && (
        <Wrapper>
          <Top>
            <h2>Delivery Status For Package #{item._id}</h2>
          </Top>
          <Middle>
            <ProgressContainer>
              <ImageContainer>
                <img src="/icon/truck.svg" style={{ width: "50px" }} />
              </ImageContainer>

              <Progress color={"green"}></Progress>
              <Text>Processing</Text>
            </ProgressContainer>

            <ProgressContainer>
              <ImageContainer></ImageContainer>
              <Progress color={"grey"}></Progress>
              <Text>In Transit</Text>
            </ProgressContainer>

            <ProgressContainer>
              <ImageContainer></ImageContainer>
              <Progress></Progress>
              <Text>Delivered</Text>
            </ProgressContainer>
          </Middle>
          <Bottom>
            <h1>TIME</h1>
            <h1>PROGRESS</h1>
            <h1>PLACE</h1>
          </Bottom>
          <Bottom>
            <Left>{date.slice(0, 16).replace("T", " ")}</Left>
            <Center>Order Received </Center>
            <Right>Budapest, HU</Right>
          </Bottom>
        </Wrapper>
      )}
      {!trackingId && !err && (
        <WrapperSearch>
          <Title>TRACK YOUR PACKAGE</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="TYPE IN PACKAGE ID"
              onChange={e => setSearchId(e.target.value)}
              value={searchId}
            />
            <Button type="submit">
              <Search style={{ fontSize: "1.6rem" }} />
            </Button>
          </Form>
        </WrapperSearch>
      )}
    </Container>
  );
}
