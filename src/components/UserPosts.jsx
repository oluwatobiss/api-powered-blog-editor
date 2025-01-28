import { useEffect, useState } from "react";

export default function UserPosts() {
  const [posts, setPosts] = useState([]);
  const [reload, setReload] = useState(false);

  async function deletePost(postId) {
    try {
      await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "DELETE",
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
    return posts.map((post) => {
      return (
        <div key={post.id} className="post-card">
          <h3 className="post-card-title">{post.title}</h3>
          <button type="button" onClick={() => deletePost(post.id)}>
            Delete
          </button>
          <button type="button" onClick={() => editPost(post)}>
            Edit
          </button>
        </div>
      );
    });
  }

  useEffect(() => {
    let userDataJson = localStorage.getItem("apiPoweredBlogUserData");

    console.log("=== Editor's UserPosts useEffect ===");
    console.log(userDataJson);

    userDataJson === "undefined" && (userDataJson = undefined);

    const userData = userDataJson && JSON.parse(userDataJson);

    console.log("=== UserPosts useEffect ===");
    console.log(userData);

    async function getPosts() {
      const fetchUrl =
        userData.status === "ADMIN"
          ? "http://localhost:3000/posts"
          : `http://localhost:3000/posts/authors/${userData?.id}`;

      console.log("=== getPosts UserPosts fetchUrl ===");
      console.log(fetchUrl);

      try {
        const response = await fetch(fetchUrl);
        const posts = await response.json();

        console.log("=== getPosts UserPosts try block ===");
        console.log(posts);

        setPosts(posts);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }
    userData && getPosts();
  }, [reload]);

  return <article>{posts.length ? createPostElements(posts) : ""}</article>;
}
