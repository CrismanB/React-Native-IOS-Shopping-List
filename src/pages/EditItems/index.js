import React, { useState } from "react";
import { Alert } from "react-native";

import db from "./../../database";

import { Container, Label, Input } from "./styles";
import Button from "./../../components/DefaultButton";

export default function EditItems({ route, navigation }) {
  const [id] = useState(String(route.params.ID));
  const [product, setProduct] = useState(String(route.params.PRODUCT));
  const [brand, setBrand] = useState(String(route.params.BRAND));
  const [quantity, setQuantity] = useState(String(route.params.QUANTITY));
  const [price, setPrice] = useState(String(route.params.PRICE));

  function handleUpdate() {
    const quantityParse = quantity.toString().replace(",", ".");
    const priceParse = price.toString().replace(",", ".");

    //Validate values input
    if (isNaN(quantityParse)) {
      return Alert.alert("Erro", "O valor da quantidade está invalído.");
    }

    if (isNaN(priceParse)) {
      return Alert.alert("Erro", "O valor da quantidade está invalído.");
    }

    db.transaction(tx => {
      tx.executeSql(
        "UPDATE LISTITEMS  SET product = ?, brand = ? , price = ?, quantity = ?  WHERE ID = ?",
        [product, brand, priceParse, quantityParse, id],
        (_, rs) => {
          navigation.navigate("AddItems", {
            edit_id: id,
            editedProduct: product,
            editedBrand: brand,
            editedQuantity: quantityParse,
            editedPrice: priceParse
          });
        },
        (_, error) => {}
      );
    });
  }

  return (
    <Container>
      <Label>PRODUTO</Label>
      <Input onChangeText={setProduct} defaultValue={product} />
      <Label>MARCA</Label>
      <Input onChangeText={setBrand} defaultValue={brand} />
      <Label>QUANTIDADE</Label>
      <Input onChangeText={setQuantity} defaultValue={quantity} />
      <Label>PREÇO</Label>
      <Input onChangeText={setPrice} defaultValue={price} />
      <Button onPress={handleUpdate}>Confirmar edição</Button>
    </Container>
  );
}
