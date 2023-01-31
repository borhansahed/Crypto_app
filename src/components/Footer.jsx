import { Box, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Box
      bgColor={"blackAlpha.900"}
      color={"whiteAlpha.700"}
      minH={"48"}
      px={"16"}
      py={["10", "10"]}
    >
      <Stack direction={["column", "row"]}>
        <VStack w={"full"} alignItems={["center", "center"]} mt={["0", "14"]}>
          <Text fontWeight={"bold"}>About Us</Text>
          <Text
            fontSize={"sm"}
            letterSpacing={"widest"}
            textAlign={["center", "left"]}
          >
            We are the best crypto trading app in the World, we provide our
            guidance at a very cheap price
          </Text>
        </VStack>

        {/* <VStack justifyContent={"center"}>
          <Avatar boxSize={"28"} mt={["4", "0"]} />
          <Text color={"whiteAlpha.500"}>Our Founder</Text>
        </VStack> */}
      </Stack>
    </Box>
  );
};

export default Footer;
