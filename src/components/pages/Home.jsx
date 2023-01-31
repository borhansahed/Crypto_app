import { Box, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import logo from "../assets/btc.png";

const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"}>
      <motion.div
        style={{
          height: "80vh",
        }}
        animate={{
          translateY: "20px",
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image
          src={logo}
          w={"full"}
          h={"full"}
          objectFit={"contain"}
          filter={"grayscale(1)"}
        />
      </motion.div>

      <Text
        fontSize={"6xl"}
        textAlign={"center"}
        fontWeight={"thin"}
        color={"whiteAlpha.500"}
        mt={["-52", "-20"]}
      >
        Xcrypto
      </Text>
    </Box>
  );
};

export default Home;
