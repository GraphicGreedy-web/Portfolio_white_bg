import { Link } from "react-router-dom";
import SEO, { noindexRobots } from "../components/SEO";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white pt-24 px-6 lg:px-12">
      <SEO
        title="Page Not Found"
        description="The requested page could not be found on Graphic Greedy."
        path="/404"
        robots={noindexRobots}
      />
      <div className="mx-auto max-w-4xl py-16 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-500">404</p>
        <h1 className="mt-4 text-4xl font-serif font-bold text-gray-900">
          Page not found
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Try one of the main portfolio sections below.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white"
          >
            Home
          </Link>
          <Link
            to="/logo-designing"
            className="rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700"
          >
            Logo Designing
          </Link>
          <Link
            to="/visual-communication"
            className="rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700"
          >
            Visual Communication
          </Link>
        </div>
      </div>
    </div>
  );
}
