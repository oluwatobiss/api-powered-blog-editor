import { useEffect, useState } from "react";

export default function Navigation() {
  const [userToken, setUserToken] = useState("");
  const [userStatus, setUserStatus] = useState("");

  function logoutUser() {
    localStorage.removeItem("apiPoweredBlogToken");
    localStorage.removeItem("apiPoweredBlogUserData");
    window.location.href = "/";
  }

  useEffect(() => {
    let userToken = localStorage.getItem("apiPoweredBlogToken");
    let userDataJson = localStorage.getItem("apiPoweredBlogUserData");

    console.log("=== Editor's Navigation useEffect ===");
    console.log(userToken);
    console.log(userDataJson);

    userToken === "undefined" && (userToken = undefined);
    userDataJson === "undefined" && (userDataJson = undefined);

    const userData = userDataJson && JSON.parse(userDataJson);
    console.log("=== Navigation useEffect ===");
    console.log(userData);

    userToken && setUserToken(userToken);
    userData?.status && setUserStatus(userData.status);
  }, []);

  console.log("=== Navigation ===");
  console.log(userStatus);

  return (
    <div className="nav-links">
      <a href="/">Home</a>
      {!userToken && <a href="/sign-up">Sign up</a>}
      {userToken && userStatus === "ADMIN" ? (
        <a href="/manage-staff/">Manage staff</a>
      ) : (
        ""
      )}
      {userToken && (
        <>
          <a href="/create-post/">Create post</a>
          <span onClick={logoutUser}>Log out</span>
        </>
      )}
    </div>
  );
}
