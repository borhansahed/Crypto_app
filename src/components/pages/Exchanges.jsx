import {
  Container,
  Heading,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../index";
import Error from "../Error";

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
          <Spinner position="absolute" top={"56"} left={"80"} />
        ) : (
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges.map((exchange, i) => (
              <ExchangeCard
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

const ExchangeCard = ({ name, img, rank, url }) => {
  return (
    <a href={url} target={"blank"}>
      <VStack
        w={"52"}
        shadow={"lg"}
        p={"8"}
        borderRadius={"lg"}
        transition={"alt 0.3s"}
        m={"4"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image
          src={img}
          w={"10"}
          h={"10"}
          objectFit={"contain"}
          alt={"Exchange"}
        ></Image>
        <Heading size={"md"} noOfLines={1}>
          {rank}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
      </VStack>
    </a>
  );
};

export default Exchanges;
