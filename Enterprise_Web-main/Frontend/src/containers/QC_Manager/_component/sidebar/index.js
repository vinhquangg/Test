import { Layout, Menu, Button } from "antd";
import React from "react";
import "./style.css";
import { useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";

import { PieChartOutlined } from "@ant-design/icons";

import { NavLink, BrowserRouter, Route } from "react-router-dom";
import DashboardPage from "../../Dashboard";
import Category from "../../Category";
import AddCategory from "../../Category/AddCategory";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actLogout } from "../../../Admin/AuthPage/modules/actions";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function SideBar(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    collapsed: false,
  });

  const onCollapse = (collapsed) => {
    setState({ collapsed });
  };
  const { collapsed } = state;

  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo p-2 flex justify-center ">
            <a href="/#">
              <img
                src="/asset/img/logo1.png"
                style={{ height: 40, width: 40 }}
              />
            </a>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={props.path}>
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <NavLink exact to="/QC/dashboard">
                Dashboard
              </NavLink>
            </Menu.Item>

            <SubMenu key="6" icon={<CategoryIcon />} title="Category">
              <Menu.Item key="7" icon={<CategoryIcon />}>
                <NavLink to="/QC/category">List Category</NavLink>
              </Menu.Item>
              <Menu.Item accessKey="8" key="9" icon={<CategoryIcon />}>
                <NavLink activeClassName="active" to="/QC/addcategory">
                  Add Category
                </NavLink>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background pt-2  bg-pink-800  "
            style={{ padding: 0 }}
          >
            <div className="flex justify-between">
              <div></div>
              <div className="flex  mx-6 ">
                <div className="cursor-pointer text-red-500 hover:text-red-700 flex items-center">
                  <Button
                    type="primary"
                    onClick={() => {
                      dispatch(actLogout(history));
                    }}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Route exact path="/QC/dashboard" component={DashboardPage} />
            <Route exact path="/QC/category" component={Category} />
            <Route exact path="/QC/addcategory" component={AddCategory} />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Design ©2021 Created by Admin
          </Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}
