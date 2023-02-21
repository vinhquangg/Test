import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Select } from "antd";
import { actFetchAddComment } from "./modules/actions";
import Loader from "../../../../components/Loader";
import emailjs from "@emailjs/browser";
import { actFetchListPost } from "../../Post/modules/actions";
import { actFetchListUser } from "../../../Admin/User/modules/actions";

export default function AddComment() {
  const data = useSelector((state) => state.addCommentReducer.data);
  const loading = useSelector((state) => state.addCommentReducer.loading);
  const error = useSelector((state) => state.addCommentReducer.error);

  const data2 = useSelector((state) => state.listPostReducer.data);

  const data3 = useSelector((state) => state.listUserReducer.data);

  const dispatch = useDispatch();

  const [state, setState] = useState({
    content: "",
    postId: "",
    userId: "",
  });

  const [dataValue, setDataValue] = useState();
  useEffect(() => {
    dispatch(actFetchListPost());
    setDataValue(data2);
  }, [0]);

  const childrenPost = [];
  if (data2) {
    {
      data2.map((data) => {
        childrenPost.push(
          <Select.Option value={data.id}>{data.title}</Select.Option>
        );
      });
    }
  }

  const [user, setUserData] = useState();
  useEffect(() => {
    dispatch(actFetchListUser());
    setDataValue(data3);
  }, [0]);

  const childrenUser = [];
  if (data3) {
    {
      data3.map((data) => {
        childrenUser.push(
          <Select.Option value={data.id}>{data.id}</Select.Option>
        );
      });
    }
  }

  const handleAddComment = (e) => {
    e.preventDefault();
    dispatch(actFetchAddComment(state));
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSelectPost = (value) => {
    setState({
      ...state,
      postId: value,
    });
  };

  const handleSelectUser = (value) => {
    setState({
      ...state,
      userId: value,
    });
  };

  if (loading) return <Loader />;

  if (data) {
    emailjs
      .send("gmail", "template_9hro1ul", data.target, "8lsUthzGwxrJOvCVN")
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  const renderNotice = () => {
    if (!error && data) {
      return <div className="alert alert-success">{data?.content}</div>;
    }
    return (
      error && (
        <div className="alert alert-danger">
          {error?.response?.data?.content}
        </div>
      )
    );
  };

  return (
    <>
      <Form
        onSubmitCapture={handleAddComment}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
      >
        <h3 className=" text-center">Add Comment</h3>
        {renderNotice()}
        <Form.Item label="Content">
          <Input name="content" onChange={handleOnchange} />
        </Form.Item>
        <Form.Item label="Post">
          <Select placeholder="Select Post" onChange={handleSelectPost}>
            {childrenPost}
          </Select>
        </Form.Item>
        <Form.Item label="User">
          <Select placeholder="Select User" onChange={handleSelectUser}>
            {childrenUser}
          </Select>
        </Form.Item>
        <Form.Item>
          <button
            className=" bg-indigo-800 p-2 text-white ml-48  rounded align-center "
            type="submit"
          >
            Add Category
          </button>
        </Form.Item>
      </Form>
    </>
  );
}
