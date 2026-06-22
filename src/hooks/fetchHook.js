import { useEffect } from "react";
import { getBlog, getBrand, getComment, getContact, getSingleBrand, getSingleVisualComm, getVideo, getVisualComm } from "../components/fetchRoutes";
import { useState } from "react";
export const getBlogHook = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        getBlog().then(setBlogs);
    }, []);
    return blogs
}
export const getBrandHook = () => {
    const [brands, setBrands] = useState([]);
    useEffect(() => {
        getBrand().then(setBrands);
        console.log("hook worked")
    }, []);
    return brands
}
export const getSingleBrandHook = (brandId) => {
    const [brand, setBrand] = useState(undefined);
    useEffect(() => {
        if (!brandId) {
            setBrand(null);
            return;
        }

        getSingleBrand(brandId)
            .then(setBrand)
            .catch(() => setBrand(null));
    }, [brandId]);
    return brand
}
export const getCommentHook = () => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        getComment().then(setComments);
    }, []);
    return comments
}
export const getContactHook = () => {
    const [contacts, setContacts] = useState([]);
    useEffect(() => {
        getContact().then(setContacts);
    }, []);
    return contacts
}
export const getVideoHook = () => {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        getVideo().then(setVideos);
    }, []);
    console.log("videos hook: ", videos)
    return videos
}
export const getVisualCommHook = () => {
    const [visualComms, setVisualComms] = useState([]);
    useEffect(() => {
        getVisualComm().then(setVisualComms);
    }, []);
    return visualComms
}
export const getSingleVisualCommHook = (visualId) => {
    const [visualComm, setVisualComm] = useState(undefined);
    useEffect(() => {
        if (!visualId) {
            setVisualComm(null);
            return;
        }

        getSingleVisualComm(visualId)
            .then(setVisualComm)
            .catch(() => setVisualComm(null));
    }, [visualId]);
    return visualComm
}
