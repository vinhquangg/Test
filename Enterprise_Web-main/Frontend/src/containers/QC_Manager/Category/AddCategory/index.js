import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from "antd";
import { actFetchAddCategory } from "./modules/actions";
import Loader from "../../../../components/Loader";

export default function AddCategory() {
  const data = useSelector((state) => state.addCategoryReducer.data);
  const loading = useSelector((state) => state.addCategoryReducer.loading);
  const error = useSelector((state) => state.addCategoryReducer.error);

  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    description: "",
  });

  const handleAddCategory = (e) => {
    e.preventDefault();
    dispatch(actFetchAddCategory(state));
  };

  const handleOnchange = (e) => {
    const { name, description, value } = e.target;
    setState({
      ...state,
      [name]: value,
      [description]: value,
      // [deadline]: value,
    });
  };
  if (loading) return <Loader />;

  const renderNotice = () => {
    if (!error && data) {
      return (
        <div className="alert alert-success">Add Category Successfully</div>
      );
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
        onSubmitCapture={handleAddCategory}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
      >
        <h3 className=" text-center">Add New Category</h3>
        {renderNotice()}
        <Form.Item label="Name">
          <Input name="name" onChange={handleOnchange} />
        </Form.Item>
        <Form.Item label="Description">
          <Input name="description" onChange={handleOnchange} />
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
