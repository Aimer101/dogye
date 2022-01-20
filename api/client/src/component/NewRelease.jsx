import { useState, useEffect } from "react";
import styled from "styled-components";
import { publicReq } from "../reqMethod";
import NewReleaseItem from "./NewReleaseItem";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 3rem;
`;
const Category = styled.span`
  font-size: 2rem;
  font-weight: 600;
  color: #616161;
`;
const Type = styled.h1``;
const Top = styled.div``;
const Bottom = styled.div`
  display: flex;
  margin-top: 2rem;
`;

export default function NewRelease() {
  const [item, setItem] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await publicReq.get("/product/new");
      setItem(res.data);
    };
    fetch();
  }, []);
  return (
    <Container>
      <Wrapper>
        <Top>
          <Category>WOMENS</Category>
          <Type>NEW RELEASES</Type>
        </Top>
        <Bottom>
          {item.map(i => (
            <NewReleaseItem props={i} />
          ))}
        </Bottom>
      </Wrapper>
    </Container>
  );
}
