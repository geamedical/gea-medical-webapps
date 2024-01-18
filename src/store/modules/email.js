/* eslint-disable no-empty-pattern */
import $axios from "../api";
const state = () => ({});

const mutations = {};

const actions = {
  index({}) {
    return new Promise((resolve) => {
      $axios
        .get(`api/email`)
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
