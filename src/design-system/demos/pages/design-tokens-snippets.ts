export const TOKENS_INJECT_SNIPPET = `// src/main.ts（本站做法）
import { injectElementPlusDesignTheme } from './design-system/theme/inject-element-plus-design-theme'

injectElementPlusDesignTheme()

const app = createApp(App)
// 再 app.use(ElementPlus) …`
