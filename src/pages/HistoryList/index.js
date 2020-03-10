import React, { useEffect, useState, useMemo } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { parseISO, format } from "date-fns";
import pt from "date-fns/locale/pt";

import {
  Container,
  List,
  Item,
  Title,
  Date,
  Price,
  DetailView,
  Separator,
  DeleteButton,
  DeleteView,
  UpdateButton,
  UpdateButtonText
} from "./styles";

import db from "./../../database";
import Background from "./../../components/Background";
import { formatPriceBR } from "./../../utils/Currency";

export default function HistoryList({ navigation }) {
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    navigation.addListener("focus", () => {
      setRefreshing(true);
    });
  }, [navigation]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "select LIST.ID, LIST.NAME, SUM(QUANTITY * PRICE) as TOTAL, LIST.CREATED_AT FROM LISTITEMS INNER JOIN LIST ON LIST.ID = LISTITEMS.LIST_ID GROUP BY LIST_ID",
        [],
        (_, { rows: { _array: list } }) => {
          setList(list);
        }
      );
    });

    setRefreshing(false);
  }, [refreshing]);

  function handleRefresh() {
    setRefreshing(true);
  }

  const listSize = useMemo(() => list.length, [list]);

  function handleEdit(item) {
    const { ID } = item;

    db.transaction(tx => {
      tx.executeSql(
        "select LISTITEMS.ID, LIST_ID, PRODUCT, PRICE, QUANTITY, BRAND FROM LISTITEMS INNER JOIN LIST ON LIST.ID = LISTITEMS.LIST_ID WHERE LISTITEMS.LIST_ID = ?",
        [ID],
        (_, { rows: { _array: items } }) => {
          navigation.navigate("AddItems", {
            list_id: ID,
            name: item.NAME,
            items
          });
        }
      );
    });
  }

  function handleDelete(data) {
    const { ID } = data;

    db.transaction(tx => {
      tx.executeSql("delete from list where id = ?;", [ID], () => {
        setList(list.filter(item => item.ID !== ID));
      });
    });
  }

  function renderRightActions(data) {
    return (
      <DeleteView>
        <DeleteButton onPress={() => handleDelete(data)}>
          <MaterialCommunityIcons name={"delete"} size={32} color={"#FFF"} />
        </DeleteButton>
      </DeleteView>
    );
  }

  function ListItems({ item }) {
    const date = parseISO(item.CREATED_AT);

    const formattedDate = format(date, "'Dia' dd 'de' MMMM', às ' HH:mm'h'", {
      locale: pt
    });
    setRefreshing(false);

    return (
      <List>
        <Swipeable renderRightActions={() => renderRightActions(item)}>
          <Item onPress={() => handleEdit(item)}>
            <Title>{item.NAME}</Title>
            <Separator />
            <DetailView>
              <Date>{formattedDate}</Date>
              <Price>{formatPriceBR(item.TOTAL)}</Price>
            </DetailView>
          </Item>
        </Swipeable>
      </List>
    );
  }

  return (
    <Background>
      <Container list={listSize}>
        {listSize ? (
          <FlatList
            data={list}
            renderItem={({ item }) => <ListItems item={item} />}
            keyExtractor={item => String(item.ID)}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            showsVerticalScrollIndicator={false}
            tintColor="#fff"
          />
        ) : (
          <UpdateButton onPress={handleRefresh}>
            {refreshing ? (
              <ActivityIndicator color={"#FFF"} size={24} />
            ) : (
              <UpdateButtonText>Atualizar</UpdateButtonText>
            )}
          </UpdateButton>
        )}
      </Container>
    </Background>
  );
}
