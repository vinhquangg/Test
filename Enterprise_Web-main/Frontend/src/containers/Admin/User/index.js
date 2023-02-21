import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Table, Input } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { actFetchListUser } from "./modules/actions";
import { actFetchDeleteUser } from "./EditUser/deleteUser/actions";
import { NavLink } from "react-router-dom";

export default function User(props) {
  const data = useSelector((state) => state.listUserReducer.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actFetchListUser());
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",

      sorter: (a, b) => a.name.length - b.name.length,
      width: "5%",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      width: "10%",
    },

    {
      title: "Department",
      dataIndex: "department",
      sorter: (a, b) => a.department - b.department,
      render: (text, item) => {
        return item.department.name;
      },
      width: "5%",
    },
    {
      title: "Role",
      dataIndex: "role",
      sorter: (a, b) => a.role.length - b.role.length,
      width: "5%",
    },
    {
      title: "Action",
      dataIndex: "action",

      render: (text, item) => {
        return (
          <Fragment>
            <NavLink
              key="1"
              className=" p-2 "
              to={`/dashboard/edituser/${item.id}`}
            >
              <EditIcon color="secondary" />
            </NavLink>
            <span
              style={{ cursor: "pointer" }}
              key="2"
              onClick={() => {
                if (
                  window.confirm(
                    `Are you sure you want to delete ${item.name} ?`
                  )
                ) {
                  dispatch(actFetchDeleteUser(item.id));
                }
              }}
            >
              <DeleteIcon color="error" />
            </span>
          </Fragment>
        );
      },

      width: "10%",
    },
  ];

  return (
    <div className="container text text-4xl  ">
      <h3 className=" text-center">User Management</h3>
      <Button
        type="primary"
        className="mb-2 rounded  "
        onClick={() => {
          props.history.push("/dashboard/adduser");
        }}
      >
        Add User
      </Button>

      <Table columns={columns} dataSource={data} />
    </div>
  );
}
