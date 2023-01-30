import { Button, Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../index";
import Card from "../Card";
import Error from "../Error";
import Loader from "../Loader";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  // page array

  const btn = new Array(124).fill(1);

  // changing page function

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  // change currency function
  const changeCurrency = (e) => {
    setCurrency(e);
    setLoading(true);
  };

  useEffect(() => {
    const fetchCoinsApi = async () => {
      try {
        const { data } = await axios(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );

        setCoins(data);

        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };

    fetchCoinsApi();
  }, [currency, page]);

  if (error) return <Error message={"There was an error fetching"} />;

  return (
    <>
      <Container maxW={"container.xl"}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <RadioGroup value={currency} onChange={changeCurrency} p={"8"}>
              <HStack spacing={"5"}>
                <Radio value={"inr"}>INR</Radio>
                <Radio value={"eur"}>EUR</Radio>
                <Radio value={"usd"}>USD</Radio>
              </HStack>
            </RadioGroup>
            <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
              {coins.map((coin, i) => (
                <Card
                  id={coin.id}
                  show={true}
                  key={coin.id}
                  name={coin.name}
                  img={coin.image}
                  symbol={coin.symbol}
                  price={coin.current_price}
                  currencySymbol={currencySymbol}
                  changeCurrency={changeCurrency}
                />
              ))}
            </HStack>
            <HStack w={"full"} overflowX={"auto"} p={"8"}>
              {btn.map((item, index) => (
                <Button
                  key={index}
                  bgColor={"blackAlpha.900"}
                  color={"white"}
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
            </HStack>
          </>
        )}
      </Container>
    </>
  );
};

export default Coins;
