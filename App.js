import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { ScreenOrientation } from "expo";
import { CreateListTable, CreateListItemsTable } from "./src/database/tables";
import Routes from "./src/routes";

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadMyFonts() {
      await Font.loadAsync({
        "open-sans-light": require("./src/assets/fonts/OpenSans-Light.ttf"),
        "open-sans-italic": require("./src/assets/fonts/OpenSans-Italic.ttf"),
        "open-sans-regular": require("./src/assets/fonts/OpenSans-Regular.ttf"),
        "open-sans-bold": require("./src/assets/fonts/OpenSans-Bold.ttf")
      });

      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
      setFontLoaded(true);
    }
    loadMyFonts();
  }, []);

  useEffect(() => {
    CreateListTable();
    CreateListItemsTable();
  }, []);

  return fontLoaded ? <Routes /> : null;
}
