import api from "./api";

type FormData = {
  name?: string;
  email: string;
  password: string;
};

const userService = {
    async createUser(data: FormData) {
        const response = await api.post("/user", data);
        return response;
    },    
    async loginUser(data: FormData) {
        const response = await api.post("/auth/login", data);
        return response;
    }
}


export default userService