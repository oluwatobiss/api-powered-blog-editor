import { useState } from "react";

const postDataJson = localStorage.getItem("apiPoweredBlogPostToEdit");
const postData = postDataJson && JSON.parse(postDataJson);

export default function EditPostForm() {
  const [title, setTitle] = useState(postData.title);
  const [body, setBody] = useState(postData.body);
  const [published, setPublished] = useState(postData.published);
  const [errors, setErrors] = useState([]);

  async function submitPostUpdates(e) {
    e.preventDefault();
    console.log("=== submitPostUpdates ===");
    console.log(postData);

    try {
      const userToken = localStorage.getItem("apiPoweredBlogToken");
      const response = await fetch(
        `${import.meta.env.PUBLIC_BACKEND_URI}/posts/${postData.id}`,
        {
          method: "PUT",
          body: JSON.stringify({ title, body, published }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const responseObj = await response.json();

      console.log("=== submitPost Response ===");
      console.log(responseObj);
      console.log(responseObj.errors?.length);

      responseObj.errors?.length
        ? setErrors(responseObj.errors)
        : (window.location.href = "/");
    } catch (e) {
      console.error(e);
    }
  }

  function showErrorFor(field) {
    return errors.find((c) => c.path === field) ? (
      <div className="error">{errors.find((c) => c.path === field).msg}</div>
    ) : (
      ""
    );
  }

  return (
    <form onSubmit={submitPostUpdates}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {showErrorFor("title")}
      </div>
      <div>
        <label htmlFor="body">Body</label>
        <textarea
          name="body"
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        {showErrorFor("body")}
      </div>
      <div className="checkbox-container">
        <label htmlFor="publishPost">Publish Now?</label>
        <input
          type="checkbox"
          id="publishPost"
          checked={published}
          onChange={() => setPublished(!published)}
        />
      </div>
      <button type="submit">Update Post</button>
    </form>
  );
}
