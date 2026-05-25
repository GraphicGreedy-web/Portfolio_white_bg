import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  brandRoute,
  cloudinaryUploadRoute,
  createBrandRoute,
  createVideoRoute,
  createVisualCommRoute,
  deleteBrandRoute,
  deleteVideoRoute,
  deleteVisualCommRoute,
  updateBrandRoute,
  updateVideoRoute,
  updateVisualCommRoute,
  videoRoute,
  visualCommRoute,
} from "../api";
import SmartImage from "../components/SmartImage";
import SEO, { noindexRobots } from "../components/SEO";

type CmsType = "logos" | "visuals" | "videos";

type CmsItem = {
  _id: string;
  title: string;
  image?: string;
  thumbnail?: string;
  imagePublicId?: string;
  thumbnailPublicId?: string;
};

type FormState = {
  title: string;
  image: string;
  imagePublicId: string;
  file: File | null;
  preview: string;
};

const emptyForm: FormState = {
  title: "",
  image: "",
  imagePublicId: "",
  file: null,
  preview: "",
};

const configs = {
  logos: {
    title: "Manage Logos",
    folder: "logos",
    listKey: "brands",
    getItems: brandRoute,
    createItem: createBrandRoute,
    updateItem: updateBrandRoute,
    deleteItem: deleteBrandRoute,
  },
  visuals: {
    title: "Manage Visual Communication",
    folder: "visuals",
    listKey: "visuals",
    getItems: visualCommRoute,
    createItem: createVisualCommRoute,
    updateItem: updateVisualCommRoute,
    deleteItem: deleteVisualCommRoute,
  },
  videos: {
    title: "Manage Videos",
    folder: "videos",
    listKey: "videos",
    getItems: videoRoute,
    createItem: createVideoRoute,
    updateItem: updateVideoRoute,
    deleteItem: deleteVideoRoute,
  },
} as const;

const getItemImage = (item: CmsItem) => item.image || item.thumbnail || "";
const getItemPublicId = (item: CmsItem) =>
  item.imagePublicId || item.thumbnailPublicId || "";

export default function CMSManager() {
  const { type } = useParams();
  const cmsType = type as CmsType;
  const config = configs[cmsType];
  const token = localStorage.getItem("cmsToken");
  const [items, setItems] = useState<CmsItem[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingItem, setEditingItem] = useState<CmsItem | null>(null);
  const [editForm, setEditForm] = useState<FormState>(emptyForm);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const isVideo = cmsType === "videos";

  const pageTitle = useMemo(() => config?.title || "CMS", [config]);

  const loadItems = async () => {
    if (!config) return;
    const res = await config.getItems();
    setItems(res.data[config.listKey] || []);
  };

  useEffect(() => {
    loadItems();
  }, [cmsType]);

  if (!token) return <Navigate to="/cms/login" replace />;
  if (!config) return <Navigate to="/cms" replace />;

  const uploadIfNeeded = async (state: FormState) => {
    if (!state.file) {
      return {
        image: state.image,
        imagePublicId: state.imagePublicId,
      };
    }

    const formData = new FormData();
    formData.append("file", state.file);
    formData.append("folder", config.folder);
    const res = await cloudinaryUploadRoute(formData);

    return {
      image: res.data.file.url,
      imagePublicId: res.data.file.publicId,
    };
  };

  const getPayload = async (state: FormState) => {
    const uploaded = await uploadIfNeeded(state);

    return isVideo
      ? {
          title: state.title,
          thumbnail: uploaded.image,
          thumbnailPublicId: uploaded.imagePublicId,
        }
      : {
          title: state.title,
          image: uploaded.image,
          imagePublicId: uploaded.imagePublicId,
        };
  };

  const handleCreate = async (event: FormEvent) => {
    event.preventDefault();
    setMessage("");
    setIsSaving(true);

    try {
      const payload = await getPayload(form);
      await config.createItem(payload);
      setForm(emptyForm);
      await loadItems();
      setMessage("Saved successfully");
    } catch {
      setMessage("Could not save. Check Cloudinary settings and try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = async (event: FormEvent) => {
    event.preventDefault();
    if (!editingItem) return;
    setMessage("");
    setIsSaving(true);

    try {
      const payload = await getPayload(editForm);
      await config.updateItem(editingItem._id, payload);
      setEditingItem(null);
      setEditForm(emptyForm);
      await loadItems();
      setMessage("Updated successfully");
    } catch {
      setMessage("Could not update. Check Cloudinary settings and try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (item: CmsItem) => {
    const shouldDelete = window.confirm(`Delete "${item.title}"?`);
    if (!shouldDelete) return;

    await config.deleteItem(item._id);
    await loadItems();
  };

  const openEdit = (item: CmsItem) => {
    setEditingItem(item);
    setEditForm({
      title: item.title || "",
      image: getItemImage(item),
      imagePublicId: getItemPublicId(item),
      file: null,
      preview: "",
    });
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
        <span className="text-sm font-medium text-gray-700">Image</span>
        <input
          type="file"
          accept="image/*,video/*"
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
          alt={state.title || "Current media"}
          className="h-40 w-full rounded-xl bg-gray-100 object-contain"
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
    <div className="min-h-screen bg-white pt-28 px-6 lg:px-12">
      <SEO
        title={pageTitle}
        description={`Private CMS page for ${pageTitle.toLowerCase()}.`}
        path={`/cms/manage/${cmsType}`}
        robots={noindexRobots}
      />
      <div className="mx-auto max-w-7xl">
        <Link
          to="/cms"
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          Back to CMS
        </Link>
        <h1 className="mt-4 text-4xl font-serif font-bold text-gray-900">
          {pageTitle}
        </h1>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          {renderForm(form, setForm, handleCreate, "Upload")}
          {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              <SmartImage
                src={getItemImage(item)}
                alt={item.title}
                className="h-56 w-full bg-gray-100 object-cover"
              />
              <div className="p-4">
                <h2 className="font-serif text-xl font-bold text-gray-900">
                  {item.title}
                </h2>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => openEdit(item)}
                    className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:border-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingItem && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-6">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Edit {editingItem.title}
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                className="rounded-full border border-gray-300 px-4 py-2 text-sm"
              >
                Close
              </button>
            </div>
            {renderForm(editForm, setEditForm, handleUpdate, "Update")}
          </div>
        </div>
      )}
    </div>
  );
}
