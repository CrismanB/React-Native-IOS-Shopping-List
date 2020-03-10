import styled from "styled-components/native";
import { Animated } from "react-native";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
  margin: 0 10px;
  margin-top: 30px;
  flex: 1;
  justify-content: ${props => (props.list ? "flex-start" : "center")};
`;

export const List = styled.View`
  padding-bottom: 10px;
`;

export const Item = styled(RectButton)`
  height: 90px;
  width: 100%;
  border-radius: 3px;
  background-color: #eee;
  padding: 10px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-family: "open-sans-bold";
  padding-bottom: 5px;
`;

export const DetailView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
`;

export const Price = styled.Text`
  font-size: 22px;
  font-family: "open-sans-bold";
  color: #3b3b3b;
`;

export const Date = styled.Text`
  font-size: 16px;
  font-family: "open-sans-light";
  color: #9e9e9e;
`;

export const Separator = styled.View`
  border: 0.6px solid #dbdbdb;
  width: 100%;
`;

export const DeleteView = styled(Animated.View)`
  width: 100px;
  height: 100%;
  border-radius: 3px;
  background-color: #fa697c;

  justify-content: center;
  align-items: center;
`;

export const DeleteButton = styled(RectButton)`
  width: 100px;
  height: 100%;
  border-radius: 3px;
  background-color: #fa697c;

  justify-content: center;
  align-items: center;
`;

export const UpdateButton = styled(RectButton)`
  height: 70px;
  width: 100%;
  border-radius: 4px;
  background-color: #3263a8;
  justify-content: center;
`;

export const UpdateButtonText = styled.Text`
  text-align: center;
  color: #fff;
  font-size: 24px;
  font-family: "open-sans-bold";
`;
