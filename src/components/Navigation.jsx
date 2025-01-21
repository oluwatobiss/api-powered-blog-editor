const userDataJson = localStorage.getItem("apiPoweredBlogUserData");
const userData = userDataJson && JSON.parse(userDataJson);
const userStatus = userData.status;

export default function Navigation() {
  console.log("=== Navigation ===");
  console.log(userData);

  return (
    <div className="nav-links">
      <a href="/">Home</a>
      <a href="/create-post/">Create post</a>
      {userStatus === "ADMIN" ? (
        <a href="/manage-members/">Manage members</a>
      ) : (
        ""
      )}
    </div>
  );
}
