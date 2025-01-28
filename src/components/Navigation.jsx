import { useEffect, useState } from "react";

export default function Navigation() {
  const [userStatus, setUserStatus] = useState("");

  function logoutUser() {
    sessionStorage.removeItem("apiPoweredBlogToken");
    window.location.href = "/";
  }

  useEffect(() => {
    let userDataJson = localStorage.getItem("apiPoweredBlogUserData");

    console.log("=== Editor's Navigation useEffect ===");
    console.log(userDataJson);

    userDataJson === "undefined" && (userDataJson = undefined);

    const userData = userDataJson && JSON.parse(userDataJson);
    console.log("=== Navigation useEffect ===");
    console.log(userData);

    userData?.status && setUserStatus(userData.status);
  }, []);

  console.log("=== Navigation ===");
  console.log(userStatus);

  return (
    <div className="nav-links">
      <a href="/">Home</a>
      {!userStatus && <a href="/sign-up">Sign up</a>}
      {userStatus === "ADMIN" ? <a href="/manage-staff/">Manage staff</a> : ""}
      {userStatus && (
        <>
          <a href="/create-post/">Create post</a>
          <span onClick={logoutUser}>Log out</span>
        </>
      )}
    </div>
  );
}
