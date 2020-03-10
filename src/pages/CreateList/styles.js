import styled from "styled-components/native";
import { Platform } from "react-native";

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === "ios",
  behavior: "padding"
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 0 25px;
`;

export const Label = styled.Text`
  color: #e37f5b;
  font-family: "open-sans-regular";
  font-size: 26px;
  margin-bottom: 14px;
`;

export const Input = styled.TextInput`
  height: 55px;
  width: 100%;
  background: #eee;
  border-radius: 6px;
  border: 1px solid #d4d4d4;

  font-family: "open-sans-bold";
  font-size: 16px;

  text-align: center;

  margin-bottom: 14px;
`;
