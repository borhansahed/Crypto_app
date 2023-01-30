import {
  Badge,
  Box,
  Container,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../index";
import Error from "./Error";
import Loader from "./Loader";

const CoinDetails = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const { id } = useParams();

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  useEffect(() => {
    const fetchCoinsApi = async () => {
      try {
        const { data } = await axios(`${server}/coins/${id}`);

        setCoin(data);
        console.log(data);

        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };

    fetchCoinsApi();
  }, [id]);

  if (error) return <Error message={"There was an error fetching coin"} />;
  return (
    <>
      <Container maxW={"container.xl"}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Box width={"full"} borderWidth={1}></Box>

            {/* {Button} */}

            <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
              <HStack spacing={"5"}>
                <Radio value={"inr"}>INR</Radio>
                <Radio value={"eur"}>EUR</Radio>
                <Radio value={"usd"}>USD</Radio>
              </HStack>
            </RadioGroup>

            <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
              <Text fontSize={"small"} alignSelf={"center"} opacity={0.7}>
                Last Updated on{" "}
                {Date(coin.market_data.last_updated).split("G")[0]}
              </Text>
              <Image
                src={coin.image.large}
                w={"16"}
                h={"16"}
                objectFit={"contain"}
              />

              <Stat>
                <StatLabel>{coin.name}</StatLabel>
                <StatNumber>
                  {currencySymbol}
                  {coin.market_data.current_price[currency]}
                </StatNumber>
                <StatHelpText>
                  <StatArrow
                    type={
                      coin.market_data.market_cap_change_24h > 0
                        ? "increase"
                        : "decrease"
                    }
                  />
                  {coin.market_data.market_cap_change_24h}%
                </StatHelpText>
              </Stat>

              <Badge
                fontSize={"2xl"}
                bgColor={"blackAlpha.800"}
                color={"white"}
              >{`#${coin.market_cap_rank}`}</Badge>

              <CustomBar
                high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
                low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
              />
              <Box>
                <Item
                  title={"Max Supply"}
                  value={coin.market_data.max_supply}
                />
                <Item
                  title={"Circulating Supply"}
                  value={coin.market_data.circulating_supply}
                />
                <Item
                  title={"Market Cap"}
                  value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
                />
                <Item
                  title={"All Time Low"}
                  value={`${currencySymbol}${coin.market_data.atl[currency]}`}
                />
                <Item
                  title={"All Time High"}
                  value={`${currencySymbol}${coin.market_data.ath[currency]}`}
                />
              </Box>
            </VStack>
          </>
        )}
      </Container>
    </>
  );
};

const Item = ({ title, value }) => {
  return (
    <>
      <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
        <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
          {title}
        </Text>
        <Text>{value ? value : "NA"}</Text>
      </HStack>
    </>
  );
};

const CustomBar = ({ high, low }) => {
  return (
    <>
      <VStack w={"full"}>
        <Progress value={50} colorScheme={"teal"} w={"full"} />
        <HStack justifyContent={"space-between"} w={"full"}>
          <Badge children={low} colorScheme={"red"} />
          <Text fontSize={"sm"}>24H Range</Text>
          <Badge children={high} colorScheme={"green"} />
        </HStack>
      </VStack>
    </>
  );
};

export default CoinDetails;
