import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Select, Checkbox } from "antd";
import { actFetchAddPost } from "./modules/actions";
import { actFetchListCategory } from "../../../QC_Manager/Category/modules/actions";
import Loader from "../../../../components/Loader";
import emailjs from "@emailjs/browser";
import { actFetchListUser } from "../../../Admin/User/modules/actions";

export default function AddPost() {
  const data = useSelector((state) => state.addPostReducer.data);
  const loading = useSelector((state) => state.addPostReducer.loading);
  const error = useSelector((state) => state.addPostReducer.error);

  const { TextArea } = Input;

  const data2 = useSelector((state2) => state2.listCategoryReducer.data);

  const data3 = useSelector((state2) => state2.listUserReducer.data);

  const [dataValue, setDataValue] = useState([]);
  const [userValue, setUserValue] = useState([]);

  useEffect(() => {
    dispatch(actFetchListUser());
    setUserValue(data3);
  }, [0]);

  useEffect(() => {
    dispatch(actFetchListCategory());
    setDataValue(data2);
  }, [0]);

  const children = [];
  if (data2) {
    {
      data2.map((data) => {
        children.push(
          <Select.Option value={data.id}>{data.name}</Select.Option>
        );
      });
    }
  }

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

  const dispatch = useDispatch();

  const [state, setState] = useState({
    title: "",
    description: "",
    content: "",
    userId: "",
    categoryId: "",
    view: 0,
    like: 0,
    dislike: 0,
  });

  const handleAddPost = (e) => {
    e.preventDefault();
    dispatch(actFetchAddPost(state));
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSelectCategory = (value) => {
    setState({
      ...state,
      categoryId: value,
    });
  };

  const handleSelectUserId = (value) => {
    setState({
      ...state,
      userId: value,
    });
  };

  const style = {
    justifyContent: "center",
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
        onSubmitCapture={handleAddPost}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
      >
        <h3 className=" text-center">Add New Post</h3>
        {renderNotice()}
        <Form.Item label="Title">
          <Input name="title" onChange={handleOnchange} />
        </Form.Item>
        <Form.Item label="Description">
          <Input name="description" onChange={handleOnchange} />
        </Form.Item>
        <Form.Item label="Content">
          <TextArea
            style={{ height: 120 }}
            name="content"
            onChange={handleOnchange}
          />
        </Form.Item>
        <Form.Item label="Category">
          <Select placeholder="Select Category" onChange={handleSelectCategory}>
            {children}
          </Select>
        </Form.Item>

        <Form.Item label="User ID">
          <Select placeholder="Select User ID" onChange={handleSelectUserId}>
            {childrenUser}
          </Select>
        </Form.Item>

        <Form.Item style={style}>
          <Checkbox>Agree to Terms and Conditions</Checkbox>
        </Form.Item>

        <Form.Item>
          <button
            className=" bg-indigo-800 p-2 text-white ml-48  rounded align-center "
            type="submit"
          >
            Add Post
          </button>
        </Form.Item>
      </Form>
    </>
  );
}
