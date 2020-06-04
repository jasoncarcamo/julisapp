import {AsyncStorage} from "react-native";

const ExpoToken = {
    async getToken(){
        return await AsyncStorage.getItem("expo-token");
    },
    async saveToken(token){
        return await AsyncStorage.setItem("expo-token", token);
    },
    hasToken(){
        return ExpoToken.getToken()
    },
    async deleteToken(){
        return await AsyncStorage.removeItem("expo-token")
    }
};
 
export default ExpoToken;