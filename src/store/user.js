import axios from "axios";

export default {
  state: {
    user: null,
    token: localStorage.getItem("token") || ""
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    }
  },
  actions: {
    registerUser({ commit }, formData) {
      commit("clearError");
      commit("setLoading", true);
      return new Promise((resolve, reject) => {
        axios({
          url: "https://localhost:44363/api/Users",
          data: formData,
          method: "POST"
        })
          .then(resp => {
            commit("setLoading", false);
            resolve(resp);
          })
          .catch(err => {
            commit("setLoading", false);
            commit("setError", err.message);
            reject(err);
          });
      });
    },
    loginUser({ commit }, { login, password }) {
      commit("clearError");
      commit("setLoading", true);
      return new Promise((resolve, reject) => {
        axios({
          url: "https://localhost:44363/api/Auth/login",
          data: { login, password },
          method: "POST"
        })
          .then(resp => {
            const token = resp.data.token;
            const parsedToken = JSON.parse(
              atob(
                token
                  .split(".")[1]
                  .replace("-", "+")
                  .replace("_", "/")
              )
            );
            const user = {
              id: parsedToken.id,
              login: parsedToken.login,
              role: parsedToken.role
            };
            commit("setUser", user);
            commit("setLoading", false);
            localStorage.setItem("token", token);
            commit("setToken", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            resolve(resp);
          })
          .catch(err => {
            commit("setLoading", false);
            commit("setError", err.message);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    keepUserLoggedIn({ commit }, payload) {
      commit("setToken", payload);
      const parsedToken = JSON.parse(
        atob(
          payload
            .split(".")[1]
            .replace("-", "+")
            .replace("_", "/")
        )
      );
      const user = {
        id: parsedToken.id,
        login: parsedToken.login,
        role: parsedToken.role
      };
      commit("setUser", user);
    },
    logout({ commit }) {
      commit("setUser", null);
      commit("setToken", null);
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    isUserAuthenticated(state) {
      return state.user !== null;
    },
    isUserAdmin(state) {
      return state.user.role === "admin";
    }
  }
};
