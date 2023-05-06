import styled from "styled-components/native";
import { View } from "react-native";

export const Container = styled(View)`
    background-color: ${({theme}) => theme.background};
    padding: 15px;
    flex: 1;  
    align-items: center;
`