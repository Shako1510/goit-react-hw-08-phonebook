import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import NotFoundPage from 'pages/notFound/NotFoundPage';
import Loader from '../Loader/Loader';
import AppBar from "../AppBar/AppBar";
import HomePage from "../Home/Home";
import Layout from "components/Layout/Layout";
import { DivBox } from "./AppStyled";
import { getIsLoading, getIsRefreshing } from "redux/selectors";
import { refresh } from "redux/operation";
import PrivateRoute from "components/PrivateRoute";
import PublicRoute from "components/PublicRoute";

const Register = lazy(() => import('../../pages/register/RegisterPage'));
const Login = lazy(() => import('../../pages/login/LoginPage'));
const Contacts = lazy(() => import('../../pages/contacts/ContactsPage'));

export function App() {
  const loader = useSelector(getIsLoading);
  const isRefresh = useSelector(getIsRefreshing);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  if (isRefresh) {
    return <p>Refresh</p>
  }

  return (
    <DivBox>

      <AppBar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index="/" element={<HomePage />} />
          <Route element={<PublicRoute />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/contacts" element={<Contacts />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>


      {loader && <Loader />}
    </DivBox>
  );
};




