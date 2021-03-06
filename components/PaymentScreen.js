import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Modal,
  AsyncStorage,
  Platform
} from "react-native";
import QRCode from "./qrcode/QRCode";

export default function PaymentScreen() {
  const [modal, setModal] = useState(false);
  const [paymentValue, setPaymentValue] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("username", (err, res) => {
      if (!err) setUsername(res);
    });
  });

  return (
    <View style={styles.container}>
      <Modal visible={modal} animationType="slide">
        <View style={styles.container}>
          <QRCode
            value={username + "_" + paymentValue}
            size={300}
            bgColor="purple"
            fgColor="white"
          />
          <Button
            title="close"
            color="#9932CC"
            style={styles.button}
            onPress={() => setModal(false)}
          />
        </View>
      </Modal>
      <TextInput
        style={styles.input}
        keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
        onChangeText={value => setPaymentValue(value)}
        placeholder="$0.00"
      />
      <Button
        color="#9932CC"
        style={styles.button}
        title="Create"
        onPress={() => setModal(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-around"
  },
  button: {
    padding: 10
  },
  input: {
    padding: 10
  },
  qr: {
    padding: 50
  }
});
