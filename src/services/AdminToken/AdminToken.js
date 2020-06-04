import {AsyncStorage} from "react-native";

const AdminToken = {
    async getToken(){
        return await AsyncStorage.getItem("julis-admin");
    },
    hasToken(){
        return AdminToken.getToken();
    },
    async saveToken(token){
        return await AsyncStorage.setItem("julis-admin", token);
    },
    async deleteToken(){
        return await AsyncStorage.removeItem("julis-admin");
    }
};

export default AdminToken;