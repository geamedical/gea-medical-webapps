/* eslint-disable no-empty-pattern */
import $axios from "../api";
const state = () => ({
  form: {
    primary_authorization_id: "",
    secondary_authorization_id: "",
    dirname: "",
  },
  rightMenuDrawer: [
    [
      "List Data",
      "mdi-view-list",
      "folder-nas-permission.data",
      "read-permission",
    ],
    [
      "Buat Data Baru",
      "mdi-plus-box",
      "folder-nas-permission.add",
      "create-permission",
    ],
  ],
});

const mutations = {
  CLEAR_FORM(state) {
    state.form = {
      primary_authorization_id: "",
      secondary_authorization_id: "",
      dirname: "",
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
          `api/nas-permission?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  },
  attr_form_user({}, search) {
    return new Promise((resolve) => {
      $axios
        .get(`api/users?page=1&limit=10&sortBy=&sortDesc=true&search=${search}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  },
  store({ commit, state }) {
    return new Promise((resolve) => {
      $axios
        .post("api/nas-permission", state.form)
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
        .get(`api/nas-permission/${payload}`)
        .then((response) => {
          const x = response.data.data;
          state.form = {
            primary_authorization_id: x.primary_authorization_id,
            secondary_authorization_id: x.secondary_authorization_id,
            dirname: x.dirname,
          };
          resolve(response.data);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  },
  update({ commit, state }, payload) {
    return new Promise((resolve) => {
      $axios
        .put(`api/nas-permission/${payload}`, state.form)
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
        .delete(`api/nas-permission/${payload}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  },
  getdir({ }, payload) {
    return new Promise(resolve => {
        $axios.get(`/dir?directory=${payload}`)
            .then(response => {
                resolve(response.data.res.data.readir)
            })
            .catch(error => {
                resolve(error.response)
            })
    })
},
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
