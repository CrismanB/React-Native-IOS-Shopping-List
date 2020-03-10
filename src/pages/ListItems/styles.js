import styled from "styled-components/native";
import { FlatList, Animated } from "react-native";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const ProductView = styled.View`
  width: 100%;
  margin: 2.5px 0;
  background-color: #eee;

  justify-content: center;
  align-items: center;
`;

export const Product = styled.TextInput`
  color: #5c5c5c;
  height: 46px;
  width: 100%;
  font-family: "open-sans-regular";
  font-size: 22px;

  text-align: center;
`;

export const ValuesView = styled.View`
  flex-direction: row;
  width: 100%;
  margin: 2.5px 0;
  background-color: #eee;

  justify-content: center;
  align-items: center;
`;

export const Price = styled.TextInput`
  color: #5c5c5c;
  height: 46px;
  width: 50%;
  font-family: "open-sans-regular";
  font-size: 22px;
  border-right-width: 1px;
  border-right-color: #dbdbdb;

  text-align: center;
`;

export const Quantity = styled.TextInput`
  color: #5c5c5c;
  height: 46px;
  width: 50%;
  font-family: "open-sans-regular";
  font-size: 22px;

  text-align: center;
`;

export const BrandView = styled.View`
  width: 100%;
  margin: 2.5px 0;
  margin-bottom: 20px;
  background-color: #eee;

  justify-content: center;
  align-items: center;
`;

export const Brand = styled.TextInput`
  color: #5c5c5c;
  height: 46px;
  width: 50%;
  font-family: "open-sans-regular";
  font-size: 22px;

  text-align: center;
`;

export const Separator = styled.View`
  border: 0.7px solid #dbdbdb;
  width: 100%;
`;

export const NameView = styled.View`
  height: 28px;
  width: 100%;

  background-color: transparent;
  justify-content: center;
  align-items: center;
`;

export const Name = styled.Text`
  font-size: 18px;
  font-family: "open-sans-regular";
  color: #fff;
`;

export const TotalView = styled.View`
  height: 34px;
  width: 100%;
  font-size: 20px;
  background-color: transparent;
  justify-content: center;
  align-items: center;
`;

export const Total = styled.Text`
  font-size: 20px;
  font-family: "open-sans-regular";
  color: #fff;
`;

export const ProductLabel = styled.Text`
  font-family: "open-sans-bold";
  font-size: 22px;
`;

export const List = styled(FlatList)`
  padding-top: 20px;
`;

export const ListView = styled.View`
  width: 100%;
  height: 95px;
  padding: 0 10px;
  background-color: #eee;
  margin-bottom: 10px;
`;

export const DetailsValuesView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const SubView = styled.View`
  align-items: center;
  width: 33.33333%;
`;

export const Labels = styled.Text`
  width: 100%;
  font-size: 16px;
  font-family: "open-sans-bold";
  text-align: center;
`;

export const ProductDetail = styled.Text`
  font-size: 16px;
  font-family: "open-sans-light";
  padding: 3px 0;
  margin: 5px 15px;
`;

export const Value = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-family: "open-sans-regular";
`;

export const DeleteView = styled(Animated.View)`
  width: 100px;
  height: 95px;
  border-radius: 3px;
  background-color: #fa697c;

  justify-content: center;
  align-items: center;
`;

export const DeleteButton = styled(RectButton)`
  width: 100px;
  height: 100%;
  border-radius: 3px;

  justify-content: center;
  align-items: center;
`;
