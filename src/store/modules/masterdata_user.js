/* eslint-disable no-empty-pattern */
import $axios from "../api";
const state = () => ({
  form: {
    role_id: "",
    dept_id: "",
    name: "",
    nik: "",
    pin: "",
    email: "",
    username: "",
    birthdate: "",
    gender: "",
    marital: "",
    npwp: "",
    noktp: "",
    address: "",
    telp: "",
    activation: false,
    password: "",
    password_confirmation: "",
  },
  rightMenuDrawer: [
    ["List Data", "mdi-view-list", "master-data-pengguna.data", "read-user"],
    [
      "Buat Data Baru",
      "mdi-plus-box",
      "master-data-pengguna.add",
      "create-user",
    ],
  ],
});

const mutations = {
  CLEAR_FORM(state) {
    state.form = {
      role_id: "",
      dept_id: "",
      name: "",
      nik: "",
      pin: "",
      email: "",
      username: "",
      birthdate: "",
      gender: "",
      marital: "",
      npwp: "",
      noktp: "",
      address: "",
      telp: "",
      activation: false,
      password: "",
      password_confirmation: "",
    };
  },
};

const actions = {
  index({}, payload) {
    return new Promise((resolve) => {
      const { page, itemsPerPage, sortBy, sortDesc } = payload.options;
      const search = payload.search;
      const start = payload.start;
      const finish = payload.finish;
      $axios
        .get(
          `api/users?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}&start=${start}&finish=${finish}`
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  },
  attr_form_user() {
    return new Promise((resolve) => {
      $axios
        .get("api/users-attr")
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  },
  store({ commit }, payload) {
    return new Promise((resolve) => {
      $axios
        .post("api/users", payload)
        .then((response) => {
          commit("CLEAR_FORM");
          resolve(response.data);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  },
  edit({ state }, payload) {
    return new Promise((resolve) => {
      $axios
        .get(`api/users/${payload}`)
        .then((response) => {
          const x = response.data.data;
          state.form = {
            role_id: x.role_id,
            dept_id: x.dept_id,
            name: x.name,
            nik: x.nik,
            pin: x.pin,
            email: x.email,
            username: x.username,
            birthdate: x.birthdate,
            gender: x.gender,
            marital: x.marital,
            npwp: x.npwp,
            noktp: x.noktp,
            address: x.address,
            telp: x.telp,
            activation: x.activation,
            password: x.pin,
            password_confirmation: x.pin,
          };
          resolve(response.data);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  },
  update({ commit }, payload) {
    return new Promise((resolve) => {
      $axios
        .put(`api/users/${payload.id}`, payload.data)
        .then((response) => {
          commit("CLEAR_FORM");
          resolve(response.data);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  },
  delete({}, payload) {
    return new Promise((resolve) => {
      $axios
        .delete(`api/users/${payload}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
