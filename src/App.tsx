import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { login, selectLogin, logout } from '@myStore/slices/login';
import { useAppDispatch, useAppSelector } from '@myStore/hooks';
import { Login } from '@myPages/login';
import { LOGIN_STATE_ENUM } from '@myConstants/index';
import { Layout, Menu, type MenuProps, ConfigProvider, theme, Switch, Button } from 'antd';
import appService from './App.service';
import { useEffect, useState } from 'react';
import './App.less';

const { Content, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable'
};

const items: MenuProps['items'] = [
  {
    key: 'news',
    label: '新闻'
  },
  {
    key: 'projects',
    label: '项目'
  },
  {
    key: 'labels',
    label: '标签'
  },
  {
    key: 'articles',
    label: '文章'
  },
  {
    key: 'diaries',
    label: '日记'
  },
  {
    key: 'love',
    label: '恋爱清单'
  },
  {
    key: 'novels',
    label: '小说',
    children: []
  }
];

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const loginState = useAppSelector(selectLogin);
  const [userEmail, setUserEmail] = useState('');
  const [themeMode, setThemeMode] = useState('light');
  const [selectRouteKey, setSelectRouteKey] = useState('news');
  const [routeBarList, setRouteBarList] = useState(items);
  const dispatch = useAppDispatch();

  const testLoginState = async () => {
    const res = await appService.testLoginState();
    if (res.success) {
      dispatch(login());
      setUserEmail(res.data.user.email);
    } else {
      dispatch(logout());
      setUserEmail('');
    }
  };

  const getAllNovels = async () => {
    const res = await appService.getAllNovels();
    if (res.success) {
      // 将小说放进路由
      setRouteBarList(
        items &&
          items.map(item => {
            if (item?.key === 'novels') {
              // @ts-expect-error children
              item.children = res.data.map(novel => {
                return {
                  key: `novels/${novel.id}`,
                  label: novel.name
                };
              });
            }
            return item;
          })
      );
    }
  };

  useEffect(() => {
    getAllNovels();
  }, [loginState]);

  const Logout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    testLoginState();
  }, [loginState]);

  useEffect(() => {
    getAllNovels();
  }, []);

  const selectRoute: MenuProps['onClick'] = e => {
    setSelectRouteKey(e.key);
    navigate(e.key);
  };

  useEffect(() => {
    const themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setThemeMode(themeMode);
  }, []);

  useEffect(() => {
    setSelectRouteKey(location.pathname.slice(1));
  }, [location]);

  return (
    <div>
      <ConfigProvider
        theme={{
          // 1. 单独使用暗色算法
          algorithm: themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
        }}
      >
        <Layout hasSider>
          <Sider style={siderStyle}>
            <div className="app-user-email">{userEmail || '未登录'}</div>
            <div className="app-user-email">
              <Button type="primary" onClick={Logout}>
                登出
              </Button>
            </div>
            <div className="app-theme-mode">
              light
              <Switch onChange={value => setThemeMode(value ? 'dark' : 'light')} />
              dark
            </div>
            <Menu
              onClick={selectRoute}
              theme="dark"
              mode="inline"
              selectedKeys={[selectRouteKey]}
              defaultSelectedKeys={['news']}
              items={routeBarList}
            />
          </Sider>
          <Layout style={{ marginInlineStart: 200 }}>
            <Content style={{ margin: '0 16px 0', overflow: 'initial' }}>
              <Outlet></Outlet>
            </Content>
          </Layout>
        </Layout>
        <Login
          show={loginState === LOGIN_STATE_ENUM.LOGOUT}
          closeEvent={() => {
            dispatch(login());
          }}
        ></Login>
      </ConfigProvider>
    </div>
  );
}

export default App;
