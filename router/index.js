import path from "path";

const resolve = pagePath => path.resolve(__dirname, pagePath);


export const $routes = [
  {
    name: "home",
    path: "/",
    component: resolve("../pages/index.vue")
  },
  {
    name: "list",
    path: "/list.html",
    component: resolve("../pages/list/index.vue")
  }
];

const extendRoutes = routes => {
  routes.length = 0; // 清除 nuxt 自己生成的路由，这里不要用 空数组 赋值
  routes.push(...$routes);
};

export default { middleware: ['rou'],base: "/", extendRoutes };
