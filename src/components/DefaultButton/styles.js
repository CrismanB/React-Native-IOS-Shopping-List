import { TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

export const Button = styled(RectButton)`
  width: 100%;
  height: 50px;

  font-family: "open-sans-light";

  justify-content: center;
  align-items: center;

  background-color: #29803d;
  border: 2px solid #449c57;
  border-radius: 6px;

  margin-top: 5px;
`;

export const TextButton = styled.Text`
  color: #eee;
  font-family: "open-sans-bold";
  font-size: 18px;
  text-transform: uppercase;
`;
