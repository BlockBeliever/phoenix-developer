/** When your routing table is too long, you can split it into small modules**/

import Layout from "@/layout";

const developRouter = [
  {
    path: "/info",
    component: Layout,
    redirect: "noRedirect",
    name: "Info",
    meta: {
      title: "资料",
      icon: "chart"
    },
    children: [
      {
        path: "apply",
        component: () => import("@/views/info/apply"),
        name: "ApplyInfo",
        meta: { title: "申请资料", noCache: true }
      }
      // {
      //   path: "develop",
      //   component: () => import("@/views/info/develop"),
      //   name: "DevelopInfo",
      //   meta: { title: "开发资料", noCache: true }
      // }
    ]
  },
  {
    path: "/app",
    component: Layout,
    redirect: "noRedirect",
    name: "App",
    meta: {
      title: "应用",
      icon: "component"
    },
    children: [
      {
        path: "apply",
        component: () => import("@/views/app/apply"),
        name: "ApplyApp",
        meta: { title: "应用申请", noCache: true } // 关注列表 ，授权用户（授权后关注，）点击后可以查看应用相关资料
      },
      {
        path: "list",
        component: () => import("@/views/app/list"),
        name: "ListApp",
        meta: { title: "应用列表", noCache: true }
      },
      {
        path: "menber",
        component: () => import("@/views/app/menber"),
        name: "AppTokenMenberList",
        hidden: true,
        meta: { title: "代币用户", noCache: true } // 代币分布情况
      },
      {
        path: "develop-info",
        component: () => import("@/views/app/developInfo"),
        name: "AppDevelopInfo",
        hidden: true,
        meta: { title: "开发者", noCache: true } // 代币分布情况
      },
      {
        path: "pay",
        component: () => import("@/views/app/pay"),
        name: "AppPayInfo",
        hidden: true,
        meta: { title: "支付设置", noCache: true } // 代币分布情况
      },
      {
        path: "edit",
        component: () => import("@/views/app/edit"),
        name: "EditApp",
        hidden: true,
        meta: { title: "编辑应用", noCache: true } // 关注列表 ，授权用户（授权后关注，）点击后可以查看应用相关资料
      }
    ]
  },
  {
    path: "/coin",
    component: Layout,
    redirect: "noRedirect",
    name: "Coin",
    meta: {
      title: "代币",
      icon: "money"
    },
    children: [
      {
        path: "generate",
        component: () => import("@/views/token/generate"),
        name: "IssueToken",
        meta: { title: "发行代币", noCache: true }
      },
      {
        path: "list",
        component: () => import("@/views/token/list"),
        name: "TokenList",
        meta: { title: "代币列表", noCache: true } // 代币分布情况
      },
      {
        path: "menber",
        component: () => import("@/views/token/menber"),
        name: "TokenMenberList",
        hidden: true,
        meta: { title: "代币用户", noCache: true } // 代币分布情况
      },
      {
        path: "flow",
        component: () => import("@/views/token/flow"),
        name: "TokenFlow",
        hidden: true,
        meta: { title: "代币流水", noCache: true } // 代币分布情况
      },
      {
        path: "issue",
        component: () => import("@/views/token/issue"),
        name: "TokenIssue",
        hidden: true,
        meta: { title: "增发代币", noCache: true } // 代币分布情况
      },
      {
        path: "issue-list",
        component: () => import("@/views/token/issueList"),
        name: "TokenIssueList",
        hidden: true,
        meta: { title: "审核增发", noCache: true } // 代币分布情况
      }
    ]
  },
  {
    path: "/document",
    component: Layout,
    redirect: "noRedirect",
    name: "Document",
    meta: {
      title: "文档",
      icon: "documentation"
    },
    children: [
      {
        path: "oauth",
        component: () => import("@/views/doc/oauth"),
        name: "OauthDoc",
        meta: { title: "授权登陆", noCache: true }
      },
      {
        path: "userInfo",
        component: () => import("@/views/doc/userInfo"),
        name: "UserInfo",
        meta: { title: "用户信息", noCache: true }
      },
      {
        path: "pay",
        component: () => import("@/views/doc/pay"),
        name: "PayDoc",
        meta: { title: "授权支付", noCache: true }
      },
      {
        path: "frozen",
        component: () => import("@/views/doc/pay"),
        name: "PayDoc",
        meta: { title: "冻结接口", noCache: true }
      },
      {
        path: "notification",
        component: () => import("@/views/doc/notification"),
        name: "NotificationDoc",
        meta: { title: "消息通知", noCache: true }
      },
      {
        path: "follow",
        component: () => import("@/views/doc/notification"),
        name: "FollowDoc",
        meta: { title: "推荐接口", noCache: true }
      }
    ]
  },
  {
    path: "/development",
    component: Layout,
    redirect: "noRedirect",
    name: "Development",
    meta: {
      title: "文档",
      icon: "documentation"
    },
    children: [
      {
        path: "documentation",
        component: () => import("@/views/development/documentation"),
        name: "DevelopmentDocumentation",
        meta: { title: "开发文档", noCache: true }
      }
    ]
  },
];

export default developRouter;
