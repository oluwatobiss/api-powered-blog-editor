import { useState } from "react";

const userDataJson = localStorage.getItem("apiPoweredBlogUserData");
const staffDataJson = localStorage.getItem("apiPoweredBlogStaffToEdit");
const userData = userDataJson && JSON.parse(userDataJson);
const staffData = staffDataJson && JSON.parse(staffDataJson);
const backendUri = import.meta.env.PUBLIC_BACKEND_URI;

export default function EditStaffForm() {
  const [firstName, setFirstName] = useState(staffData.firstName);
  const [lastName, setLastName] = useState(staffData.lastName);
  const [username, setUsername] = useState(staffData.username);
  const [email, setEmail] = useState(staffData.email);
  const [admin, setAdmin] = useState(staffData.status === "ADMIN");
  const [adminCode, setAdminCode] = useState("");
  const [errors, setErrors] = useState([]);

  async function submitStaffUpdates(e) {
    e.preventDefault();
    try {
      const userToken = localStorage.getItem("apiPoweredBlogToken");
      const response = await fetch(`${backendUri}/users/${staffData.id}`, {
        method: "PUT",
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          admin,
          adminCode,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${userToken}`,
        },
      });
      const staffDataResponse = await response.json();
      staffDataResponse.errors?.length
        ? setErrors(staffDataResponse.errors)
        : (window.location.href = "/");
    } catch (e) {
      console.error(e);
    }
  }

  function updateAdminCode(e) {
    errors.length && setErrors([]);
    setAdminCode(e.target.value);
  }

  function showErrorFor(field) {
    return errors.find((c) => c.path === field) ? (
      <div className="error">{errors.find((c) => c.path === field).msg}</div>
    ) : (
      ""
    );
  }

  return (
    <form onSubmit={submitStaffUpdates}>
      <div>
        <label htmlFor="firstName">First name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        {showErrorFor("firstName")}
      </div>
      <div>
        <label htmlFor="lastName">Last name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        {showErrorFor("lastName")}
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {showErrorFor("username")}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {showErrorFor("email")}
      </div>
      <div className="checkbox-container">
        <label htmlFor="adminCheckbox">Admin?</label>
        <input
          type="checkbox"
          id="adminCheckbox"
          checked={admin}
          onChange={() =>
            userData.username === staffData.username ? null : setAdmin(!admin)
          }
        />
      </div>
      {admin ? (
        <div>
          <label htmlFor="adminCode">Enter admin passcode:</label>
          <input
            type="password"
            name="adminCode"
            id="adminCode"
            value={adminCode}
            onChange={updateAdminCode}
            required
          />
          {showErrorFor("adminCode")}
        </div>
      ) : (
        ""
      )}
      <button type="submit">Update Staff</button>
    </form>
  );
}
