import { useEffect, useState } from "react";

const userToken = localStorage.getItem("apiPoweredBlogToken");
const backendUri = import.meta.env.PUBLIC_BACKEND_URI;

export default function StaffCards() {
  const [members, setMembers] = useState([]);
  const [reload, setReload] = useState(false);

  async function deleteMember(memberId) {
    try {
      await fetch(`${backendUri}/users/${memberId}`, {
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

  async function editMember(member) {
    localStorage.setItem("apiPoweredBlogStaffToEdit", JSON.stringify(member));
    window.location.href = "/edit-staff/";
  }

  function createStaffCards(members) {
    const userDataJson = localStorage.getItem("apiPoweredBlogUserData");
    const userData = userDataJson && JSON.parse(userDataJson);

    return members.map((member) => {
      return (
        <div key={member.id} className="member-card">
          <div className="member-card-bio">
            <span>@{member.username}</span> <span>{member.status}</span>
          </div>
          <h3 className="member-card-name">
            {member.firstName} {member.lastName}
          </h3>
          {userData.username === member.username ? (
            ""
          ) : (
            <button type="button" onClick={() => deleteMember(member.id)}>
              Delete
            </button>
          )}
          <button type="button" onClick={() => editMember(member)}>
            Edit
          </button>
        </div>
      );
    });
  }

  useEffect(() => {
    async function getMembers() {
      try {
        const response = await fetch(`${backendUri}/users`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        const members = await response.json();
        setMembers(members);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }
    getMembers();
  }, [reload]);

  return <article>{members.length ? createStaffCards(members) : ""}</article>;
}
