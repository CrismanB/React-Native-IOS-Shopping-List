import React, { useState, useEffect } from "react";
import { Keyboard, Alert } from "react-native";
import { formatISO } from "date-fns";

import { Container, Label, Input } from "./styles";

import Background from "./../../components/Background";
import DefaultButton from "./../../components/DefaultButton";

import database from "./../../database";

const db = database;

export default function User({ navigation }) {
  const [name, setName] = useState("");

  function handleSubmit() {
    if (!name) {
      return Alert.alert(
        "Erro",
        "Nome da lista em branco, crie um para prosseguir."
      );
    }

    Keyboard.dismiss();

    //Formata data antes de inserir no banco de dados.
    const date = new Date();
    const formatDate = formatISO(date);

    db.transaction(tx => {
      tx.executeSql(
        "insert into list (NAME, CREATED_AT) VALUES (?,?)",
        [name, formatDate],
        async (_, resultSet) => {
          await Alert.alert("Sucesso", "Lista criada com sucesso!");

          navigation.navigate("AddItems", {
            list_id: resultSet.insertId,
            name,
            add: true
          });
        },
        () => {
          Alert.alert("Erro", "Erro ao criar a lista!");
        }
      );
    });
  }

  return (
    <>
      <Background>
        <Container>
          <Label>Adicionar lista</Label>
          <Input
            placeholder="Nome da lista"
            value={name}
            onChangeText={setName}
            autoCorrect={false}
          />
          <DefaultButton onPress={handleSubmit}>Criar Lista</DefaultButton>
        </Container>
      </Background>
    </>
  );
}
