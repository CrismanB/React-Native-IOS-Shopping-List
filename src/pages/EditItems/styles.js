import styled from "styled-components/native";
import { Platform } from "react-native";

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === "ios",
  behavior: "padding"
})`
  flex: 1;
  align-items: center;
  background-color: #f0f0f0;

  margin-top: 20px;
`;

export const Label = styled.Text`
  width: 100%;

  font-family: "open-sans-bold";
  font-size: 18px;
  text-align: center;

  margin-bottom: 5px;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 40px;
  font-size: 18px;
  font-family: "open-sans-regular";
  background-color: #dbdbdb;
  border: 1px solid #bdbdbd;
  text-align: center;
  margin-bottom: 10px;
`;
