import React, { useEffect, useState } from "react";
import { Keyboard, Alert } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { formatPriceBR } from "./../../utils/Currency";
import { formatISO } from "date-fns";

import {
  Container,
  BrandView,
  Brand,
  Price,
  Product,
  ProductView,
  Quantity,
  ValuesView,
  List,
  ListView,
  DetailsValuesView,
  SubView,
  ProductDetail,
  Labels,
  Value,
  Separator,
  DeleteButton,
  DeleteView,
  TotalView,
  NameView,
  Name,
  Total
} from "./styles";

import Background from "./../../components/Background";
import Button from "./../../components/DefaultButton";

import db from "./../../database";

export default function ListItems({ route, navigation }) {
  const { list_id } = route.params;
  const { name } = route.params;
  const { items } = route.params;

  const { edit_id } = route.params;
  const { editedProduct } = route.params;
  const { editedBrand } = route.params;
  const { editedQuantity } = route.params;
  const { editedPrice } = route.params;

  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [total, setTotal] = useState(0);

  const [item, setItem] = useState(items || []);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    var somaTotal = 0;

    for (var i = 0; i < item.length; i++) {
      somaTotal += item[i].PRICE * item[i].QUANTITY;
    }
    setTotal(somaTotal);
  }, [total, item]);

  useEffect(() => {
    if (edit_id) {
      setItem(state => {
        const itemUpdated = state.map(i => {
          if (i.ID == edit_id) {
            (i.PRODUCT = editedProduct),
              (i.PRICE = editedPrice),
              (i.QUANTITY = editedQuantity),
              (i.BRAND = editedBrand);
            return i;
          } else {
            return i;
          }
        });
        return itemUpdated;
      });
    }
  }, [edit_id, editedBrand, editedPrice, editedProduct, editedQuantity]);

  async function handleAddItem() {
    Keyboard.dismiss();

    const quantityParse = quantity.toString().replace(",", ".");
    const priceParse = price.toString().replace(",", ".");

    //Validate values input

    if (isNaN(quantityParse)) {
      return Alert.alert("Erro", "O valor da quantidade está invalído.");
    }

    if (isNaN(priceParse)) {
      return Alert.alert("Erro", "O valor da quantidade está invalído.");
    }

    //Format Date value before insert on database
    const date = new Date();
    const formatDate = formatISO(date);

    db.transaction(tx => {
      tx.executeSql(
        "insert into LISTITEMS (product, price, quantity, brand, list_id, created_at) values (?,?,?,?,?,?)",
        [product, priceParse, quantityParse, brand, list_id, formatDate],
        (_, rs) => {
          const id = rs.insertId;
          setItem([
            {
              ID: id,
              PRODUCT: product,
              PRICE: priceParse,
              QUANTITY: quantityParse,
              BRAND: brand || "",
              LIST_ID: list_id,
              CREATED_AT: formatDate
            },
            ...item
          ]);

          setProduct("");
          setPrice();
          setQuantity();
          setBrand("");
        },
        (_, error) => {}
      );
    });
  }

  function handleRefresh() {
    setRefreshing(true);
    db.transaction(tx => {
      tx.executeSql(
        "select LISTITEMS.ID, LIST_ID, PRODUCT, PRICE, QUANTITY, BRAND FROM LISTITEMS INNER JOIN LIST ON LIST.ID = LISTITEMS.LIST_ID WHERE LISTITEMS.LIST_ID = ? ORDER BY LISTITEMS.ID DESC",
        [list_id],
        (_, { rows: { _array: item } }) => {
          setItem(item);
        }
      );
    });
    setRefreshing(false);
  }

  function editItem(data) {
    navigation.navigate("EditItems", data);
  }

  function handleDelete(data) {
    const { ID } = data;

    db.transaction(tx => {
      tx.executeSql(
        "delete from LISTITEMS where id = ?;",
        [ID],
        (_, { rows: _array }) => {
          setItem(item.filter(item => item.ID !== ID));
        }
      );
    });
  }

  function renderRightActions(item) {
    return (
      <>
        <DeleteView>
          <DeleteButton onPress={() => handleDelete(item)}>
            <MaterialCommunityIcons name={"delete"} size={32} color={"#FFF"} />
          </DeleteButton>
        </DeleteView>
      </>
    );
  }

  function Item({ item }) {
    const totalProduct = formatPriceBR(item.QUANTITY * item.PRICE);

    return (
      <Swipeable renderRightActions={() => renderRightActions(item)}>
        <ListView>
          <ProductDetail numberOfLines={1}>
            {item.PRODUCT + " - " + item.BRAND}
          </ProductDetail>
          <Separator />
          <DetailsValuesView>
            <SubView>
              <Labels onPress={() => editItem(item)}>Preço</Labels>
              <Value onPress={() => editItem(item)}>
                {formatPriceBR(item.PRICE)}
              </Value>
            </SubView>
            <SubView>
              <Labels onPress={() => editItem(item)}>Quantidade</Labels>
              <Value onPress={() => editItem(item)}>{item.QUANTITY}</Value>
            </SubView>
            <SubView>
              <Labels>Total</Labels>
              <Value>{totalProduct}</Value>
            </SubView>
          </DetailsValuesView>
        </ListView>
      </Swipeable>
    );
  }

  return (
    <Background>
      <Container>
        <NameView>
          <Name>Lista - {name}</Name>
        </NameView>
        <Separator />
        <TotalView>
          <Total>Valor Total: {formatPriceBR(total)}</Total>
        </TotalView>
        <ProductView>
          <Product
            placeholder="Produto"
            value={product}
            onChangeText={setProduct}
          />
        </ProductView>
        <ValuesView>
          <Quantity
            placeholder="Quantidade"
            value={quantity}
            keyboardType={"numeric"}
            onChangeText={setQuantity}
          />
          <Price
            placeholder="Preço"
            value={price}
            onChangeText={setPrice}
            keyboardType={"numeric"}
          />
        </ValuesView>
        <BrandView>
          <Brand placeholder="Marca" value={brand} onChangeText={setBrand} />
        </BrandView>

        <Button onPress={handleAddItem}>Adicionar Item</Button>
        <List
          data={item}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={item => String(item.ID)}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          showsVerticalScrollIndicator={false}
        />
      </Container>
    </Background>
  );
}
