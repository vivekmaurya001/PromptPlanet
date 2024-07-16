"use client";
import Profile from "@components/Profile";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setposts] = useState([]);
  const handleDelete = async (post) => {
    router.push(`/delete-prompt?id=${post._id}`);
  };
  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session.user.id}/posts`);
      const data = await response.json();

      setposts(data);
    };
    if (session?.user.id) fetchPost();
  }, []);
  return (
    <Profile
      name="My"
      desc="Welcome to my profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
