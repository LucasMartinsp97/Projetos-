//hoks > Storage.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
  // Buscar os itens salvos
  const getItem = async (key) => {
    try {
      const passwords = await AsyncStorage.getItem(key);
      return JSON.parse(passwords) || [];
    } catch (error) {
      console.log("Erro ao buscar", error);
      return [];
    }
  };

  // Salvar um item no Storage
  const saveItem = async (key, value) => {
    try {
      let password = await getItem(key);

      password.push(value);

      await AsyncStorage.setItem(key, JSON.stringify(password));
    } catch (error) {
      console.log("ERRO AO SALVAR", error);
    }
  };

  // Remover algo do storage
  const removeItem = async (key, item) => {
    try {
      let password = await getItem(key);

      let myPasswords = password.filter((password) => {
        return password !== item;
      });

      await AsyncStorage.setItem(key, JSON.stringify(myPasswords));
      
      return myPasswords;

    } catch (error) {
      console.log("ERRO AO DELETAR", error);
    }
  };

  return {
    getItem,
    saveItem,
    removeItem,
  };
};

export default useStorage;