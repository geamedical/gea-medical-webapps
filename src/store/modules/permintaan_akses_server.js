/* eslint-disable no-empty-pattern */
import $axios from "../api";
const state = () => ({
  form: {
    authorization_id: "",
    server: "",
  },
  rightMenuDrawer: [
    ["List Data", "mdi-view-list", "permintaan-server.data", "read-permission"],
    [
      "Buat Data Baru",
      "mdi-plus-box",
      "permintaan-server.add",
      "create-permission",
    ],
  ],
});

const mutations = {
  CLEAR_FORM(state) {
    state.form = {
      authorization_id: "",
      server: "",
    };
  },
};

const actions = {
  index({}, payload) {
    return new Promise((resolve) => {
      const { page, itemsPerPage, sortBy, sortDesc } = payload.options;
      const search = payload.search;
      $axios
        .get(
          `api/permintaan-akses-server?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`
        )
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
        .put(`api/permintaan-akses-server/${payload.id}`, {
          status: payload.status,
        })
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
        .delete(`api/permintaan-akses-server/${payload}`)
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
