import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Table, Input } from "antd";
import { actFetchListComment } from "./modules/actions";

export default function Comment(props) {
  const data = useSelector((state) => state.listCommentReducer.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actFetchListComment());
  }, [0]);

  const columns = [
    {
      title: "Comment",
      dataIndex: "content",

      sorter: (a, b) => a.content.length - b.content.length,
      width: "50%",
    },
    {
      title: "Post Title",
      dataIndex: "post",

      sorter: (a, b) => a.title.length - b.title.length,
      render: (text, item) => {
        return item?.post?.title;
      },
      width: "25%",
    },
    {
      title: "User",
      render: () => {
        return (
          <>
            <p>Anonymous</p>
          </>
        );
      },
      width: "25%",
    },
  ];

  return (
    <div className="container text text-4xl  ">
      <h3 className=" text-center">Comment Management</h3>
      <Button
        type="primary"
        className="mb-2 rounded  "
        onClick={() => {
          props.history.push("/QC/addcategory");
        }}
      >
        Add Comment
      </Button>

      <Table columns={columns} dataSource={data} />
    </div>
  );
}
