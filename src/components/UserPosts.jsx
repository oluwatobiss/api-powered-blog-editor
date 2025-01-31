import { useEffect, useState } from "react";

const userToken = localStorage.getItem("apiPoweredBlogToken");
const backendUri = import.meta.env.PUBLIC_BACKEND_URI;

export default function UserPosts() {
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState([]);
  const [reload, setReload] = useState(false);

  async function deletePost(postId) {
    try {
      await fetch(`${backendUri}/posts/${postId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setReload(!reload);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  async function editPost(post) {
    localStorage.setItem("apiPoweredBlogPostToEdit", JSON.stringify(post));
    window.location.href = "/edit-post/";
  }

  function createPostElements(posts) {
    const drafts = posts.map((post) => (
      <div key={post.id} className="post-card">
        <span className="post-status">
          {post.published ? "published" : "draft"}
        </span>
        <h3 className="post-card-title">{post.title}</h3>
        <button type="button" onClick={() => deletePost(post.id)}>
          Delete
        </button>
        <button type="button" onClick={() => editPost(post)}>
          Edit
        </button>
      </div>
    ));
    return <article>{drafts}</article>;
  }

  function showNoPosts() {
    return userId ? <p>No drafts are available.</p> : "";
  }

  useEffect(() => {
    let userDataJson = localStorage.getItem("apiPoweredBlogUserData");
    userDataJson === "undefined" && (userDataJson = undefined);

    const userData = userDataJson && JSON.parse(userDataJson);
    userData?.id && setUserId(userData.id);

    async function getPosts() {
      const fetchUrl =
        userData.status === "ADMIN"
          ? `${backendUri}/posts?status=${userData?.status}`
          : `${backendUri}/posts/authors/${userData?.id}`;

      try {
        const response = await fetch(fetchUrl, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        const posts = await response.json();
        setPosts(posts);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }
    userData && getPosts();
  }, [reload]);

  return (
    <>
      <h1>{userId ? "All posts" : "Only members are allowed here 😍"}</h1>
      {posts.length ? createPostElements(posts) : showNoPosts()}
    </>
  );
}
