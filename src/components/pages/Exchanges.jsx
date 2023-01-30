import { Container, HStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../index";
import Card from "../Card";
import Error from "../Error";
import Loader from "../Loader";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchExchangeApi = async () => {
      try {
        const { data } = await axios(`${server}/exchanges`);

        setExchanges(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };

    fetchExchangeApi();
  }, []);

  if (error) return <Error message={"There was an error fetching"} />;

  return (
    <>
      <Container maxW={"container.xl"}>
        {loading ? (
          <Loader />
        ) : (
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges.map((exchange, i) => (
              <Card
                show={false}
                key={exchange.id}
                name={exchange.name}
                img={exchange.image}
                rank={exchange.trust_score_rank}
                url={exchange.url}
              />
            ))}
          </HStack>
        )}
      </Container>
    </>
  );
};

export default Exchanges;
