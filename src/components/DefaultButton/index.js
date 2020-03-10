import React from "react";
import { ActivityIndicator } from "react-native";

import { Button, TextButton } from "./styles";

export default function DefaultButton({ children, loading, ...rest }) {
  return (
    <Button {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#eee" />
      ) : (
        <TextButton>{children}</TextButton>
      )}
    </Button>
  );
}
