import { Button, useColorMode } from "@chakra-ui/core";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import React from "react";


interface CModeProps
{
}

export const CMode: React.FC<CModeProps> = ({ }) =>
{
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Button onClick={toggleColorMode} p={0} ml={8}>
            {colorMode === "light" ? (<SunIcon fill={colorMode} />) : (<MoonIcon fill={colorMode} />)}
        </Button>
    );
};
