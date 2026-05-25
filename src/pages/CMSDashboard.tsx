import { Link, Navigate, useNavigate } from "react-router-dom";
import SEO, { noindexRobots } from "../components/SEO";

const actions = [
  { label: "Manage Logos", path: "/cms/manage/logos" },
  { label: "Manage Visual Communication", path: "/cms/manage/visuals" },
  { label: "Manage Videos", path: "/cms/manage/videos" },
];

export default function CMSDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("cmsToken");

  if (!token) return <Navigate to="/cms/login" replace />;

  return (
    <div className="min-h-screen bg-white pt-28 px-6 lg:px-12">
      <SEO
        title="CMS Dashboard"
        description="Private CMS dashboard for managing the Graphic Greedy portfolio."
        path="/cms"
        robots={noindexRobots}
      />
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">CMS</p>
            <h1 className="mt-3 text-4xl font-serif font-bold text-gray-900">
              Manage Portfolio
            </h1>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("cmsToken");
              navigate("/cms/login");
            }}
            className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900"
          >
            Logout
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {actions.map((action) => (
            <Link
              key={action.path}
              to={action.path}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center text-xl font-serif font-bold text-gray-900 transition-all hover:-translate-y-1 hover:border-gray-900 hover:shadow-lg"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
