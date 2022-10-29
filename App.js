import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

export default function App() {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [idsearch, setIdsearch] = useState("");
  const [name, setName] = useState("");
  const [email, SetEmail] = useState("");

  const getUsers = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getUserById = async (id) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      const json = await response.json();
      setData(json);
      if (json.name != null) {
        setName(json.name);
        SetEmail(json.email);
      } else {
        alert("El usuario no se encuentra, digite otro id");
      }
    } catch (error) {
      console.error(error);
    } finally {  
      setLoading(false);
    }
  };

  useEffect(() => {
    // getUsers(); // se ejecutara este método al iniciar por primera vez el componente
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TouchableOpacity
        style={[styles.styleButton, { backgroundColor: "#EEEEEE" }]}
        onPress={() => getUsers() && setLoading(true)}
      >
        <Text style={[{ color: "#624F82" }]}>Listar usuarios</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.styleButton, { backgroundColor: "#EEEEEE" }]}
        onPress={()=> getUserById(idsearch)}
      >
        <Text style={[{ color: "lightblue" }]}>Buscar por id</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.styleInputs}
        placeholder="Digite el id del usuario a buscar"
        onChangeText={(idsearch) => setIdsearch(idsearch)}
        value={idsearch}
      />
      <TextInput
        style={styles.styleInputs}
        onChangeText={(name) => setName(name)}
        value={name}
      />

      <TextInput
        style={styles.styleInputs}
        onChangeText={(email) => SetEmail(email)}
        value={email}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="lightblue" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.styleButton,
                { backgroundColor: item.id % 2 == 1 ? "#624F82" : "lightblue" },
              ]}
              onPress={() => {
                // alert(`Corre: ${item.email}, Nombre usuario: ${item.username}`)
                if (
                  confirm(`Está seguro de borrar el usuario: ${item.name} ?`)
                ) {
                  alert("Se borro el usuario exitosamente");
                }
              }}
            >
              <Text style={[{ color: "white" }]}>
                Nombre usuario: {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  styleButton: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    marginBottom: 20,
  },
  styleInputs: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "lighseagreen",
    marginTop: 10,
    textAlign: "center",
    padding: 5,
  },
});
