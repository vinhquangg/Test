import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Table, Input } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import { actFetchListDepartment } from "./modules/actions";
import { actFetchDeleteDepartment } from "./deleteDepartment/actions";

export default function Department(props) {
  const data = useSelector((state) => state.listDepartmentReducer.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actFetchListDepartment());
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",

      sorter: (a, b) => a.name.length - b.name.length,
      width: "50%",
    },
    {
      title: "Action",
      dataIndex: "action",

      render: (text, item) => {
        return (
          <Fragment>
            <span
              style={{ cursor: "pointer" }}
              key="2"
              onClick={() => {
                if (
                  window.confirm(
                    `Are you sure you want to delete ${item.name} ?`
                  )
                ) {
                  dispatch(actFetchDeleteDepartment(item.id));
                }
              }}
            >
              <DeleteIcon color="error" />
            </span>
          </Fragment>
        );
      },

      width: "50%",
    },
  ];

  return (
    <div className="container text text-4xl  ">
      <h3 className=" text-center">Department Management</h3>
      <Button
        type="primary"
        className="mb-2 rounded  "
        onClick={() => {
          props.history.push("/dashboard/adddepartment");
        }}
      >
        Add Department
      </Button>

      <Table columns={columns} dataSource={data} />
    </div>
  );
}
