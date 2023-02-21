import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from "antd";
import { actFetchAddDepartment } from "./modules/actions";
import Loader from "../../../../components/Loader";

export default function AddDepartment() {
  const data = useSelector((state) => state.addDepartmentReducer.data);
  const loading = useSelector((state) => state.addDepartmentReducer.loading);
  const error = useSelector((state) => state.addDepartmentReducer.error);

  // const data2 = useSelector((state2) => state2.listDepartmentReducer.data);

  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
  });

  const handleAddDepartment = (e) => {
    e.preventDefault();
    dispatch(actFetchAddDepartment(state));
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  if (loading) return <Loader />;

  const renderNotice = () => {
    if (!error && data) {
      return (
        <div className="alert alert-success">Add Department Successfully</div>
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
        onSubmitCapture={handleAddDepartment}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
      >
        <h3 className=" text-center">Add New Department</h3>
        {renderNotice()}
        <Form.Item label="Name">
          <Input name="name" onChange={handleOnchange} />
        </Form.Item>
        <Form.Item>
          <button
            className=" bg-indigo-800 p-2 text-white ml-48  rounded align-center "
            type="submit"
          >
            Add Department
          </button>
        </Form.Item>
      </Form>
    </>
  );
}
