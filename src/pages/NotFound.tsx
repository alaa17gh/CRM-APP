import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-8xl font-bold text-gray-200">404</h1>
            <p className="text-2xl font-semibold text-gray-700 mt-4">Page not found</p>
            <p className="text-gray-400 mt-2">The page you're looking for doesn't exist.</p>
            <Link
            to="/"
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >  
            Back to Dashboard
            </Link>
        </div>
    )
}

export default NotFound
