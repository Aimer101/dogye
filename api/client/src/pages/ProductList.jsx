import { useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import Annoucement from "../component/Annoucement";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import Products from "../component/Products";

import { mobile } from "../responsive";
const Container = styled.div``;
const Title = styled.h1`
  margin: 2rem;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 2rem;
  ${mobile({ margin: "0 2rem", flexDirection: "column", display: "flex" })}
`;
const FilterText = styled.span`
  font-size: 2rem;
  font-weight: 600;
  margin-right: 2rem;
  ${mobile({ marginRight: "0" })}
`;

const Select = styled.select`
  padding: 1rem;
  margin-right: 2rem;
  ${mobile({ margin: "1rem 0" })}
`;
const Option = styled.option``;

export default function ProductList() {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState(null);

  const handleFilter = e => {
    const value = e.target.value === "default" ? null : e.target.value;

    if (value !== null) {
      return setFilter({ ...filter, [e.target.name]: value });
    } else {
      let toRemove = { ...filter };
      delete toRemove[e.target.name];
      return setFilter({ ...toRemove });
    }
  };

  const handleSort = e => {
    const value = e.target.value === "default" ? null : e.target.value;

    value !== null ? setSort(value) : setSort(null);
  };
  return (
    <Container>
      <Navbar />
      <Annoucement />
      <Title>{category ? category.toUpperCase() : "ALL PRODUCTS"}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilter}>
            <Option value="default">Color</Option>
            <Option value="grey">Grey</Option>
            <Option value="black">Black</Option>
            <Option value="yellow">Yellow</Option>
            <Option value="green">Green</Option>
          </Select>
          <Select name="size" onChange={handleFilter}>
            <Option value="default">Size</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
          <Select name="sort" onChange={handleSort}>
            <Option value="default">Sort By</Option>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (Asc)</Option>
            <Option value="desc">Price (Desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category={category} filter={filter} sort={sort} />

      <Footer />
    </Container>
  );
}
