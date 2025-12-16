import api from "./api";

interface FormData {
  name?: string,
  email?: string,
  password?: string,
  telephone?: string,
};

interface reqResponse {
    status: boolean,
    massage: string,
}

const userService = {
    async loginUser(data: FormData) {
        const {email, password} = data
        const response = await api.post<reqResponse>("/login", {email, password});
        return response;
    },
    async logout() {
        const response = await api.post<reqResponse>("/logout");
        return response;
    },
    async createUser(data: FormData) {
        const response = await api.post<reqResponse>("/registration", data);
        return response;
    },
    async auth() {
        const response = await api.get<reqResponse>("/me");
        return response;
    },
    async getAllUsers() {
        const response = await api.get<reqResponse>("/allUser");
        return response;
    },
    async getUser() {
        const response = await api.get<reqResponse>("/user");
        return response;
    },
    async deleteUser() {
        const response = await api.delete<reqResponse>("/user");
        return response;
    },
    async updateUser(data: FormData) {
        const response = await api.put<reqResponse>("/user", data);
        return response;
    }
}


export default userService