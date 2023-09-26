import React, { useState } from "react";

const TableRow = ({
  user,
  selected,
  handleRowSelection,
  handleDelete,
  setUsers,
  users,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const { id } = user || {};
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSave = (id) => {
    setIsEditing(!isEditing);
    let array = users;
    users.forEach(async (ele, index) => {
      if (ele.id === id) {
        let obj = editedUser;
        array[index] = obj;
        await setUsers(array);
        console.log(users);
        return;
      }
    });
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };
  return (
    <tr className={selected ? "selected" : ""}>
      <td>
        <input
          type="checkbox"
          checked={selected}
          onChange={(event) => handleRowSelection(event, id)}
        />
      </td>
      <td>{id}</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleChange}
          />
        ) : (
          editedUser.name
        )}
      </td>
      <td>
        {" "}
        {isEditing ? (
          <input
            type="text"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
          />
        ) : (
          editedUser.email
        )}
      </td>
      <td>
        {" "}
        {isEditing ? (
          <input
            type="text"
            name="role"
            value={editedUser.role}
            onChange={handleChange}
          />
        ) : (
          editedUser.role
        )}
      </td>
      <td className="btn-container">
        {!isEditing ? (
          <button onClick={() => handleEdit()}>
            <i className="fas fa-edit"></i>
          </button>
        ) : (
          <button onClick={() => handleSave(id)}>
            <i className="fad fa-save"></i>
          </button>
        )}

        <button onClick={() => handleDelete(id)}>
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
