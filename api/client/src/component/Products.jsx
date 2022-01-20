import { useState, useEffect } from "react";
import styled from "styled-components";
import NewReleaseItem from "./NewReleaseItem";
import { publicReq } from "../reqMethod";

const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export default function Products({ category, filter, sort }) {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicReq.get(
          category ? `/product?category=${category}` : "/product"
        );
        setProducts(res.data);
      } catch (e) {}
    };
    getProduct();
  }, [category]);

  useEffect(() => {
    filter &&
      setFiltered(
        products.filter(p =>
          Object.entries(filter).every(([key, value]) => p[key].includes(value))
        )
      );
  }, [filter, category, products, sort]);

  useEffect(() => {
    if (sort === "newest") {
      setFiltered(prev =>
        [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } else if (sort === "asc") {
      setFiltered(prev => [...prev].sort((a, b) => a.price - b.price));
    } else if (sort === "desc") {
      setFiltered(prev => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort, category, products, filter]);

  return (
    <Container>
      {sort === null && !filter
        ? products.map(p => <NewReleaseItem props={p} key={p.id} />)
        : filtered.map(p => <NewReleaseItem props={p} key={p.id} />)}
    </Container>
  );
}
