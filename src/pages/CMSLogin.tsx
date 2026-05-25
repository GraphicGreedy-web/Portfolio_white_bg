import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cmsLoginRoute } from "../api";
import SEO, { noindexRobots } from "../components/SEO";

export default function CMSLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await cmsLoginRoute({ username, password });
      localStorage.setItem("cmsToken", res.data.token);
      navigate("/cms");
    } catch {
      setError("Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-6 lg:px-12">
      <SEO
        title="CMS Login"
        description="Private CMS login for the Graphic Greedy portfolio."
        path="/cms/login"
        robots={noindexRobots}
      />
      <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-serif font-bold text-gray-900">CMS Login</h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Username</span>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Password</span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              required
            />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-gray-900 px-5 py-3 font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-60"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
