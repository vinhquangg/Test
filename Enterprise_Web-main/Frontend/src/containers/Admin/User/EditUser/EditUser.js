import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Select } from "antd";
import Loader from "./../../../../components/Loader/";
import { actFetchUpdateUser } from "./update/modules/actions";
import { actFetchEditUser } from "./modules/actions";
import { actFetchListDepartment } from "../../Department/modules/actions";

export default function EditUser(props) {
  const data = useSelector((state) => state.editUserReducer.data);
  const loading = useSelector((state) => state.editUserReducer.loading);
  const error = useSelector((state) => state.editUserReducer.error);

  const [dataValue, setDataValue] = useState();
  const data2 = useSelector((state2) => state2.listDepartmentReducer.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actFetchListDepartment());
    setDataValue(data2);
  }, [data2]);

  const children = [];
  if (data2) {
    {
      data2.map((data2) => {
        children.push(
          <Select.Option value={data2.id}>{data2.name}</Select.Option>
        );
      });
    }
  }

  useEffect(() => {
    const id = props.match.params.id;
    dispatch(actFetchEditUser(id));
  }, [0]);

  const [state, setState] = useState({
    name: data?.name,
    email: data?.email,
    // role: data?.role,
  });

  // const testing = () => {
  //   console.log(data);
  // };
  // testing();

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

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const id = props.match.params.id;
    dispatch(actFetchUpdateUser(state, props.history, id));
  };
  return (
    <>
      <Form
        onSubmitCapture={handleUpdateUser}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
      >
        <h3 className=" text-center">Update User</h3>
        {/* <Form.Item label="Id">
          <Input name="id" value={data?.id} disabled />
        </Form.Item> */}
        <Form.Item label="Name">
          <Input
            name="name"
            defaultValue={data?.name}
            onChange={handleOnchange}
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            name="email"
            defaultValue={data?.email}
            onChange={handleOnchange}
          />
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
            className=" bg-indigo-800 p-2 text-white ml-48  rounded  "
            type="submit"
          >
            Update
          </button>
        </Form.Item>
      </Form>
    </>
  );
}
