import { createRouter, createWebHashHistory } from 'vue-router'
import DesignSystemView from '../views/DesignSystemView.vue'
import DesignShowcaseView from '../views/DesignShowcaseView.vue'

/** Hash 路由：离线 file:// 可用；与 Vite `base` 一致以便 GitHub Pages 子路径部署 */
export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/showcase',
      name: 'design-showcase',
      component: DesignShowcaseView,
    },
    /**
     * 文档站只保留这一条 + showcase，避免 /doc/x 与 catch-all 两条路由共用同一组件导致反复销毁重建、主区空白。
     */
    { path: '/:pathMatch(.*)*', name: 'design-system', component: DesignSystemView },
  ],
})
