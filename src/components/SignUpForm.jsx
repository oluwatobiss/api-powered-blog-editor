import { useState } from "react";

export default function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [errors, setErrors] = useState([]);

  async function registerUser(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.PUBLIC_BACKEND_URI}/users`,
        {
          method: "POST",
          body: JSON.stringify({
            firstName,
            lastName,
            username,
            email,
            password,
            admin,
            adminCode,
          }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      const userData = await response.json();
      userData.errors?.length
        ? setErrors(userData.errors)
        : (window.location.href = "/");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
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
    <form onSubmit={registerUser}>
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
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {showErrorFor("password")}
      </div>
      <div className="checkbox-container">
        <label htmlFor="adminCheckbox">Admin?</label>
        <input
          type="checkbox"
          id="adminCheckbox"
          checked={admin}
          onChange={() => setAdmin(!admin)}
        />
      </div>
      {admin ? (
        <div>
          <label htmlFor="adminCode">Enter your passcode:</label>
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
      <button type="submit">Sign up</button>
    </form>
  );
}
