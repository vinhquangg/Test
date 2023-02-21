import { Layout, Menu, Button } from "antd";
import React from "react";
import "./style.css";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleIcon from "@mui/icons-material/People";

import { PieChartOutlined } from "@ant-design/icons";

import { NavLink, BrowserRouter, Route } from "react-router-dom";
import DashboardPage from "../../Dashboard";
import Post from "../../Post";
import AddPost from "../../Post/AddPost";
import DetailPage from "../../Post/PostDetail";
import Comment from "../../Comment";
import AddComment from "../../Comment/AddComment";

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
              <NavLink exact to="/Staff/dashboard">
                Dashboard
              </NavLink>
            </Menu.Item>

            <SubMenu key="2" icon={<AccountCircleIcon />} title="Post">
              <Menu.Item key="3" icon={<PeopleIcon />}>
                <NavLink to="/Staff/post">List Post</NavLink>
              </Menu.Item>
              <Menu.Item accessKey="4" key="5" icon={<PersonAddIcon />}>
                <NavLink activeClassName="active" to="/Staff/addpost">
                  Add Post
                </NavLink>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="6" icon={<AccountCircleIcon />} title="Comment">
              <Menu.Item key="7" icon={<PeopleIcon />}>
                <NavLink to="/Staff/comment">List Comment</NavLink>
              </Menu.Item>
              <Menu.Item accessKey="8" key="9" icon={<PersonAddIcon />}>
                <NavLink activeClassName="active" to="/Staff/addcomment">
                  Add Comment
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
            <Route exact path="/Staff/dashboard" component={DashboardPage} />
            <Route exact path="/Staff/post" component={Post} />
            <Route exact path="/Staff/addpost" component={AddPost} />
            <Route exact path="/Staff/postDetail/:id" component={DetailPage} />
            <Route exact path="/Staff/comment" component={Comment} />
            <Route exact path="/Staff/addcomment" component={AddComment} />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Design ©2021 Created by Admin
          </Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}
