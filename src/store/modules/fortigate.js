/* eslint-disable no-empty-pattern */
import $axios from "../api";
const state = () => ({});

const mutations = {};

const actions = {
  index({}, payload) {
    return new Promise((resolve) => {
      $axios
        .get(`api/fortigate?target=${payload}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  },
  store({}, payload) {
    return new Promise((resolve) => {
      $axios
        .post(`api/fortigate?target=${payload.target}`, payload.data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  },
  update({}, payload) {
    return new Promise((resolve) => {
      $axios
        .put(
          `api/fortigate/${payload.id}?target=${payload.target}`,
          payload.data
        )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  },
  delete({}, payload) {
    return new Promise((resolve) => {
      $axios
        .delete(`api/fortigate/${payload.id}?target=${payload.target}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  },
  attr({}, payload) {
    return new Promise((resolve) => {
      $axios
        .get(`api/fortigate/?attr=${payload}&target=user-local`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  },
  show({}, payload) {
    return new Promise((resolve) => {
      $axios
        .get(`api/fortigate/${payload.id}?&target=${payload.target}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  },
  deleteMember({}, payload) {
    return new Promise((resolve) => {
      $axios
        .delete(`api/fortigate/${payload.id}?members=${payload.member}&target=${payload.target}`)
        .then((response) => {
          resolve(response);
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
