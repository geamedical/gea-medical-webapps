/* eslint-disable no-empty-pattern */
import $axios from "../api";

const state = () => ({
  form: {
    user: {
      id: "",
      name: "",
      telp: "",
      role_id: "",
      dept_id: "",
    },
    user_accepted: {
      accept_primary_id: "",
      accept_secondary_id: "",
    },
    request: [],
    directory: [],
    server: [],
  },
  rightMenuDrawer: [
    [
      "List Data",
      "mdi-view-list",
      "form-permintaan.data",
      "read-form-permintaan",
    ],
    [
      "Buat Data Baru",
      "mdi-plus-box",
      "form-permintaan.add",
      "create-form-permintaan",
    ],
  ],
});

const mutations = {
  CLEAR_FORM(state) {
    state.form = {
      user: {
        id: "",
        name: "",
        telp: "",
        role_id: "",
        dept_id: "",
      },
      user_accepted: {
        accept_primary_id: "",
        accept_secondary_id: "",
      },
      request: [],
      directory: [],
      server: [],
    };
  },
  SET_FORM(state, payload) {
    state.form = {
      user: payload.user,
      user_accepted: payload.user_accepted,
      request: payload.request,
      directory: payload.directory,
      server: payload.server,
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
          `api/form-permintaan?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}&start=${start}&finish=${finish}`
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  },
  attr_form() {
    return new Promise((resolve) => {
      $axios
        .post("api/form-permintaan/formset")
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  },
  store({ state, commit }) {
    return new Promise((resolve) => {
      $axios
        .post("api/form-permintaan", state.form)
        .then((response) => {
          commit("CLEAR_FORM");
          resolve(response.data);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  },
  edit({ commit }, payload) {
    return new Promise((resolve) => {
      $axios
        .get(`api/form-permintaan/${payload}`)
        .then((response) => {
          commit("SET_FORM", {
            user: response.data.data.user,
            user_accepted: response.data.data.user_accepted,
            request: response.data.data.request,
            directory: response.data.data.directory,
            server: response.data.data.server,
          });
          resolve(response.data);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  },
  setStatus({}, payload) {
    return new Promise((resolve) => {
      $axios
        .put(`api/form-permintaan/${payload.id}`, payload)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  },
  update({}, payload) {
    return new Promise((resolve) => {
      $axios
        .put(`api/form-permintaan/${payload.id}`, payload.form)
        .then((response) => {
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
        .delete(`api/form-permintaan/${payload}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  },
  validatePin({}, payload) {
    return new Promise((resolve) => {
      $axios
        .post(`api/form-permintaan/validate-pin`, { pin: payload })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  },

  getdir({}) {
    return new Promise((resolve) => {
      $axios
        .get(`api/form-permintaan?dir-permission=true`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  },
  getserver({}) {
    return new Promise((resolve) => {
      $axios
        .get(
          `api/form-permintaan?server-permission=true`
        )
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
