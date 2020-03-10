import React from "react";

import { LinearGradient } from "expo-linear-gradient";

export default function Background({ children, ...rest }) {
  return (
    <LinearGradient
      colors={["#1e0b2e", "#35154f", "#54237d"]}
      style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  );
}
