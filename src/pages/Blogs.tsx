import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  blogRoute,
  cloudinaryUploadRoute,
  createBlogRoute,
  deleteBlogRoute,
  updateBlogRoute,
} from "../api";
import SmartImage from "../components/SmartImage";
import SEO from "../components/SEO";
import { buildBreadcrumbSchema, buildCollectionSchema } from "../seo/site";

type BlogItem = {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: string;
  imagePublicId?: string;
  createdAt?: string;
  updatedAt?: string;
};

type FormState = {
  title: string;
  excerpt: string;
  content: string;
  image: string;
  imagePublicId: string;
  file: File | null;
  preview: string;
};

const emptyForm: FormState = {
  title: "",
  excerpt: "",
  content: "",
  image: "",
  imagePublicId: "",
  file: null,
  preview: "",
};

export default function Blogs() {
  const token = localStorage.getItem("cmsToken");
  const isCmsLoggedIn = Boolean(token);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null);
  const [editForm, setEditForm] = useState<FormState>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadBlogs = async () => {
    const res = await blogRoute();
    setBlogs(res.data.blogs || []);
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const uploadIfNeeded = async (state: FormState) => {
    if (!state.file) {
      return {
        image: state.image,
        imagePublicId: state.imagePublicId,
      };
    }

    const formData = new FormData();
    formData.append("file", state.file);
    formData.append("folder", "blogs");
    const res = await cloudinaryUploadRoute(formData);

    return {
      image: res.data.file.url,
      imagePublicId: res.data.file.publicId,
    };
  };

  const getPayload = async (state: FormState) => {
    const uploaded = await uploadIfNeeded(state);

    return {
      title: state.title,
      excerpt: state.excerpt,
      content: state.content,
      image: uploaded.image,
      imagePublicId: uploaded.imagePublicId,
    };
  };

  const updateFile = (
    currentState: FormState,
    setState: (state: FormState) => void,
    file: File | null
  ) => {
    setState({
      ...currentState,
      file,
      preview: file ? URL.createObjectURL(file) : "",
    });
  };

  const handleCreate = async (event: FormEvent) => {
    event.preventDefault();
    setMessage("");
    setIsSaving(true);

    try {
      const payload = await getPayload(form);
      await createBlogRoute(payload);
      setForm(emptyForm);
      await loadBlogs();
      setMessage("Blog created successfully");
    } catch {
      setMessage("Could not create blog. Check the CMS login and Cloudinary settings.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = async (event: FormEvent) => {
    event.preventDefault();
    if (!editingBlog) return;
    setMessage("");
    setIsSaving(true);

    try {
      const payload = await getPayload(editForm);
      await updateBlogRoute(editingBlog._id, payload);
      setEditingBlog(null);
      setEditForm(emptyForm);
      await loadBlogs();
      setMessage("Blog updated successfully");
    } catch {
      setMessage("Could not update blog. Check the CMS login and Cloudinary settings.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (blog: BlogItem) => {
    const shouldDelete = window.confirm(`Delete "${blog.title}"?`);
    if (!shouldDelete) return;

    await deleteBlogRoute(blog._id);
    await loadBlogs();
  };

  const openEdit = (blog: BlogItem) => {
    setEditingBlog(blog);
    setEditForm({
      title: blog.title || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      image: blog.image || "",
      imagePublicId: blog.imagePublicId || "",
      file: null,
      preview: "",
    });
  };

  const renderForm = (
    state: FormState,
    setState: (state: FormState) => void,
    onSubmit: (event: FormEvent) => void,
    submitLabel: string
  ) => (
    <form onSubmit={onSubmit} className="space-y-5">
      <label className="block">
        <span className="text-sm font-medium text-gray-700">Title</span>
        <input
          value={state.title}
          onChange={(event) => setState({ ...state, title: event.target.value })}
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
          required
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Short description</span>
        <textarea
          value={state.excerpt}
          onChange={(event) => setState({ ...state, excerpt: event.target.value })}
          className="mt-2 min-h-28 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
          required
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Blog content</span>
        <textarea
          value={state.content}
          onChange={(event) => setState({ ...state, content: event.target.value })}
          className="mt-2 min-h-48 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
          required
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Cover image</span>
        <input
          type="file"
          accept="image/*"
          onChange={(event) =>
            updateFile(state, setState, event.target.files?.[0] || null)
          }
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3"
          required={!state.image}
        />
      </label>

      {(state.preview || state.image) && (
        <SmartImage
          src={state.preview || state.image}
          alt={state.title || "Blog cover"}
          className="h-56 w-full rounded-xl bg-gray-100 object-cover"
        />
      )}

      <button
        type="submit"
        disabled={isSaving}
        className="rounded-full bg-gray-900 px-6 py-3 font-medium text-white hover:bg-gray-800 disabled:opacity-60"
      >
        {isSaving ? "Saving..." : submitLabel}
      </button>
    </form>
  );

  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-24">
      <SEO
        title="Blogs"
        description="Read blog updates, creative insights, and design thinking from Graphic Greedy."
        path="/blogs"
        schema={[
          buildCollectionSchema({
            name: "Graphic Greedy Blogs",
            description:
              "Blog updates, creative insights, and design notes from Graphic Greedy.",
            path: "/blogs",
            keywords: ["graphic design blog", "creative insights", "branding articles"],
          }),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blogs", path: "/blogs" },
          ]),
        ]}
      />

      <section className="px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-gray-500">Journal</p>
          <h1 className="mt-4 text-5xl font-serif font-bold text-gray-900 lg:text-7xl">
            Blogs
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-600">
            Thoughts, process notes, and creative stories from the studio.
          </p>

          {isCmsLoggedIn ? (
            <div className="mt-8 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2 text-sm font-medium text-emerald-700">
              CMS mode is active. You can create, edit, and delete blogs here.
            </div>
          ) : (
            <div className="mt-8">
              <Link
                to="/cms/login"
                className="inline-flex rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
              >
                CMS Login
              </Link>
            </div>
          )}
        </div>
      </section>

      {isCmsLoggedIn && (
        <section className="px-6 pb-8 lg:px-12">
          <div className="mx-auto max-w-5xl rounded-3xl border border-gray-200 bg-gray-50 p-6 lg:p-8">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Create Blog</h2>
            <p className="mt-2 text-gray-600">
              Publish a new blog post directly from the CMS-enabled blogs page.
            </p>
            <div className="mt-6">{renderForm(form, setForm, handleCreate, "Create Blog")}</div>
            {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
          </div>
        </section>
      )}

      <section className="px-6 py-12 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2">
          {blogs.map((blog) => (
            <article
              key={blog._id}
              className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
            >
              <SmartImage
                src={blog.image || ""}
                alt={blog.title}
                className="h-72 w-full bg-gray-100 object-cover"
              />
              <div className="p-6 lg:p-8">
                <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                  {new Date(blog.updatedAt || blog.createdAt || Date.now()).toLocaleDateString()}
                </p>
                <h2 className="mt-3 text-3xl font-serif font-bold text-gray-900">
                  {blog.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-gray-600">
                  {blog.excerpt}
                </p>
                <div className="mt-6 whitespace-pre-line text-gray-700">
                  {blog.content}
                </div>

                {isCmsLoggedIn && (
                  <div className="mt-8 flex gap-3">
                    <button
                      onClick={() => openEdit(blog)}
                      className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog)}
                      className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:border-red-500"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {!blogs.length && (
          <div className="mx-auto max-w-3xl rounded-3xl border border-dashed border-gray-300 px-6 py-16 text-center text-gray-500">
            No blogs yet. {isCmsLoggedIn ? "Use the form above to publish the first one." : "Check back soon."}
          </div>
        )}
      </section>

      {editingBlog && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-6">
          <div className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-gray-500">CMS</p>
                <h2 className="mt-2 text-2xl font-serif font-bold text-gray-900">
                  Edit Blog
                </h2>
              </div>
              <button
                onClick={() => setEditingBlog(null)}
                className="rounded-full border border-gray-300 px-4 py-2 text-sm"
              >
                Close
              </button>
            </div>
            {renderForm(editForm, setEditForm, handleUpdate, "Update Blog")}
          </div>
        </div>
      )}
    </div>
  );
}
