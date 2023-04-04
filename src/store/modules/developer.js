import { getDeveloperInfo } from "@/api/developer";

const state = {
  info: null
};

const mutations = {
  SET_DEVELOPER: (state, developer) => {
    state.info = developer;
  }
};

const actions = {
  // user login
  setDeveloperInfo({ commit }) {
    getDeveloperInfo()
      .then(response => {
        // console.log(response,87843)
        if (response.code == 0) {
          commit("SET_DEVELOPER", response.data);
        }
      })
      .catch(error => {
        console.log("获取开发者信息错误");
      });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
