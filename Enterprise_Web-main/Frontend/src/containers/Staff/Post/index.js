import React, { createElement, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Table, Tooltip } from "antd";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import { actFetchListPost } from "./modules/actions";

export default function Post(props) {
  const data = useSelector((state) => state.listPostReducer.data);

  const dispatch = useDispatch();

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  useEffect(() => {
    dispatch(actFetchListPost());
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",

      sorter: (a, b) => a.title.length - b.title.length,
      width: "10%",
    },
    {
      title: "Like",
      width: "1%",
      render: () => {
        return (
          <>
            <span className="comment-action">{likes}</span>
          </>
        );
      },
    },
    {
      title: "Dislike",
      width: "1%",
      render: () => {
        return (
          <>
            <span className="comment-action">{dislikes}</span>
          </>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "10%",
      render: () => {
        return (
          <>
            <Tooltip key="comment-basic-like" title="Like">
              <span onClick={like}>
                {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
              </span>
            </Tooltip>
            <Tooltip key="comment-basic-dislike" title="Dislike">
              <span onClick={dislike}>
                {React.createElement(
                  action === "disliked" ? DislikeFilled : DislikeOutlined
                )}
              </span>
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <div className="container text text-4xl  ">
      <h3 className=" text-center">Post</h3>
      <Button
        type="primary"
        className="mb-2 rounded  "
        onClick={() => {
          props.history.push("/Staff/addpost");
        }}
      >
        Add Post
      </Button>

      <Table columns={columns} dataSource={data} />
    </div>
  );
}
