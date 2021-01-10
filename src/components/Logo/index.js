import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link to="/"><img className="logo" alt="Build App logo" src="/logo.webp" /></Link>
    )
}

export default Logo;