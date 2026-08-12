import { Link } from "react-router";

const Error = () => {
    return (
        <div className="error-page">
            <h1>Page Not Found 404</h1>
            <Link to='/' className="error-page-link">
                Back to home page
            </Link>
        </div>
    )
}

export default Error