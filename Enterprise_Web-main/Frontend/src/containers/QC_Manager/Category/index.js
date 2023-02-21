import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Table, Input } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import { actFetchListCategory } from "./modules/actions";
import { actFetchDeleteCategory } from "./deleteCategory/actions";
import { CSVLink } from "react-csv";
import { actFetchListPost } from "../../Staff/Post/modules/actions";

export default function Category(props) {
  const [dataValue, setDataValue] = useState();
  const [post, setPostValue] = useState();
  const dataPost = useSelector((state) => state.listPostReducer.data);
  const data = useSelector((state) => state.listCategoryReducer.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actFetchListCategory());
    setDataValue(data);
  }, [0]);
  useEffect(() => {
    dispatch(actFetchListPost());
    setPostValue(dataPost);
  }, [0]);

  const dataCate = [];
  if (data) {
    {
      data.map((data) => {
        dataCate.push(data);
      });
    }
  }
  console.log(dataCate);

  const header = [
    { label: "Id", key: "id" },
    { label: "Name", key: "name" },
    { label: "Description", key: "description" },
  ];

  const csv = {
    filename: "Report Category.csv",
    headers: header,
    data: dataCate,
  };

  const dataExcel = [];

  if (dataPost) {
    {
      dataPost.map((data) => {
        dataExcel.push(data);
      });
    }
  }

  const headerExcel = [
    { label: "Id", key: "id" },
    { label: "Title", key: "title" },
    { label: "Description", key: "description" },
    { label: "Content", key: "content" },
    { label: "Category ID", key: "categoryId" },
    { label: "User ID", key: "userId" },
  ];

  const csvFile = {
    filename: "Report.csv",
    headers: headerExcel,
    data: dataExcel,
  };

  const columns = [
    {
      title: "Category",
      dataIndex: "name",

      sorter: (a, b) => a.name.length - b.name.length,
      width: "25%",
    },
    {
      title: "Description",
      dataIndex: "description",

      sorter: (a, b) => a.name.length - b.name.length,
      width: "25%",
    },
    {
      title: "Post Total",
      dataIndex: "description",

      sorter: (a, b) => a.name.length - b.name.length,
      render: (text, item) => {
        if (data) {
          return data.length;
        }
      },
      width: "25%",
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
                  dispatch(actFetchDeleteCategory(item.id));
                }
              }}
            >
              <DeleteIcon color="error" />
            </span>
          </Fragment>
        );
      },

      width: "25%",
    },
  ];

  return (
    <div className="container text text-4xl  ">
      <h3 className=" text-center">Category Management</h3>
      <Button
        type="primary"
        className="mb-2 rounded  "
        onClick={() => {
          props.history.push("/QC/addcategory");
        }}
      >
        Add Category
      </Button>
      <Button>
        <CSVLink {...csvFile}>Download Post</CSVLink>
      </Button>
      <Button>
        <CSVLink {...csv}>Download Category</CSVLink>
      </Button>

      <Table columns={columns} dataSource={data} />
    </div>
  );
}
