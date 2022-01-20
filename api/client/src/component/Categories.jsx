import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  padding: 2rem;
  justify-content: space-between;
  ${mobile({ padding: "0", flexDirection: "column" })}
`;

export default function Categories() {
  return (
    <Container>
      {categories.map(c => (
        <CategoryItem item={c} />
      ))}
    </Container>
  );
}
