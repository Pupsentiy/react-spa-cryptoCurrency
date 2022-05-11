import Home from "../components/Home/Home"
import Portfolio from "../components/Portfolio/Portfolio"

const config = [
    {
        path:'/',
        element: <Home/>
    },
    {
        path:'/portfolio',
        element: <Portfolio/>
    }
]

export default config

