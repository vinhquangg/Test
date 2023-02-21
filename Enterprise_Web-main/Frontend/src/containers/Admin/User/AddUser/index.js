import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Select } from "antd";
import { actFetchAddUser } from "./modules/actions";
import { actFetchListDepartment } from "../../Department/modules/actions";
import Loader from "./../../../../components/Loader/";

export default function AddUser() {
  const data = useSelector((state) => state.addUserReducer.data);
  const loading = useSelector((state) => state.addUserReducer.loading);
  const error = useSelector((state) => state.addUserReducer.error);

  const [dataValue, setDataValue] = useState();
  const data2 = useSelector((state2) => state2.listDepartmentReducer.data);
  useEffect(() => {
    dispatch(actFetchListDepartment());
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

  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    departmentId: "",
    role: "",
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    dispatch(actFetchAddUser(state));
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSelectRole = (value) => {
    setState({
      ...state,
      role: value,
    });
  };

  const handleSelectDepartment = (value) => {
    setState({
      ...state,
      departmentId: value,
    });
  };

  if (loading) return <Loader />;

  const renderNotice = () => {
    if (!error && data) {
      return (
        <div className="alert alert-success">Successfully added new user</div>
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
        onSubmitCapture={handleAddUser}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
      >
        <h3 className=" text-center">Add New User</h3>
        {renderNotice()}
        <Form.Item label="Name">
          <Input name="name" onChange={handleOnchange} />
        </Form.Item>
        <Form.Item label="Email">
          <Input name="email" onChange={handleOnchange} />
        </Form.Item>
        <Form.Item label="Password">
          <Input name="password" onChange={handleOnchange} />
        </Form.Item>
        <Form.Item label="Department">
          <Select
            placeholder="Select Department"
            onChange={handleSelectDepartment}
          >
            {children}
          </Select>
        </Form.Item>
        <Form.Item label="Role">
          <Select placeholder="Select Role" onChange={handleSelectRole}>
            <Select.Option value="QC Manager">QC Manager</Select.Option>
            <Select.Option value="QC Coordinator">QC Coordinator</Select.Option>
            <Select.Option value="Admin">Admin</Select.Option>
            <Select.Option value="Staff">Staff</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <button
            className=" bg-indigo-800 p-2 text-white ml-48  rounded align-center "
            type="submit"
          >
            Add User
          </button>
        </Form.Item>
      </Form>
    </>
  );
}
