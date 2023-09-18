import { logout, getInfo, refreshToken } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import router, { resetRouter } from "@/router";

const state = {
  token: getToken(),
  name: "",
  uid: "",
  avatar: "",
  introduction: "",
  roles: []
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_UID: (state, uid) => {
    state.uid = uid;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  }
};

const actions = {
  // user login
  login({ commit }, data) {
   
    commit("SET_TOKEN", data);
    setToken(data);
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const { data } = response;
          if (!data) {
            reject("Verification failed, please Login again.");
          }
          commit("SET_ROLES", ["admin"]);
          commit("SET_NAME", data.nickname);
          commit("SET_UID", data.uid);
          commit("SET_NAME", data.nickname);
          commit("SET_AVATAR", data.avatar);
          commit("SET_INTRODUCTION", "守护您的网络隐私与安全");
          var roles = {
            roles: ["admin"]
          };
          resolve(roles);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // logout(state.token)
      //   .then(() => {
          commit("SET_TOKEN", "");
          commit("SET_ROLES", []);
          removeToken();
          resetRouter();
          commit("")
          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          dispatch("tagsView/delAllViews", null, { root: true });
          resolve();
        // })
        // .catch(error => {
        //   reject(error);
        // });
    });
  },

  // remove token
  resetToken({ commit, dispatch, state }) {
    return new Promise(resolve => {
      refreshToken().then(res => {
        console.log(res, "========frensh");

        if (res.code == 0) {
          // 刷新一下三个
          // access: ""
          // expiredAt: 1600578452;
          // refresh: "NGZJMZK4MZETZGFIMC01MWI0LTK3MGYTNMI4OWU5MDYYY2M0";
          var data = state.token;
          data.access = res.data.access_token;
          data.refresh = res.data.refresh_token;
          var now = Date.parse(new Date()) / 1000;
          data.expiredAt = now + res.data.expires_in;
          console.log("熟悉成功");
          commit("SET_TOKEN", data);
          setToken(data);
          resolve(0);
        } else {
          commit("SET_TOKEN", "");
          commit("SET_ROLES", []);
          removeToken();
          resetRouter();
          
          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          dispatch("tagsView/delAllViews", null, { root: true });
          resolve(1);
        }
      });
    });
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + "-token";

    commit("SET_TOKEN", token);
    setToken(token);

    const { roles } = await dispatch("getInfo");

    resetRouter();

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch("permission/generateRoutes", roles, {
      root: true
    });
    // dynamically add accessible routes
    router.addRoutes(accessRoutes);

    // reset visited views and cached views
    dispatch("tagsView/delAllViews", null, { root: true });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
