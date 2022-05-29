import routesConfig from '~/config/routes'

// Layouts
import { HeaderOnly } from '~/components/Layout'

import Home from '~/pages/Home'
import Following from '~/pages/Following'
import Profile from '~/pages/Profile'
import Upload from '~/pages/Upload'
import Search from '~/pages/Search'

const publicRoutes = [ // Không cần đăng nhập vẫn xem được

    { path: routesConfig.home, component: Home },
    { path: routesConfig.following, component: Following },
    { path: routesConfig.profile, component: Profile },
    { path: routesConfig.upload, component: Upload, layout: HeaderOnly },
    { path: routesConfig.search, component: Search, layout: null },
]
const priveRoutes = [ // Không đăng nhập sẽ hướng đến trang log-in

]

export { publicRoutes, priveRoutes }