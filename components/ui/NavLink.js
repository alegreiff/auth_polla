import { Link, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";

import { FC } from "react";

export const NavLink = ({ nombre, enlace }) => {
  return (
    <NextLink href={enlace} passHref>
      <Link
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
          textDecoration: "none",
          bg: useColorModeValue("gray.200", "gray.700"),
        }}
      >
        {nombre}
      </Link>
    </NextLink>
  );
};
