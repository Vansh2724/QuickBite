import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import AboutUSPage from "./pages/AboutUSPage";
import Footer from "./components/Footer";
import FAQsPage from "./pages/FAQsPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import OrderStatusPage from "./pages/OrderStatusPage";
import React from "react";
const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero={true}>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />

      <Route
        path="/search/:city"
        element={
          <Layout showHero={false}>
            <SearchPage />
          </Layout>
        }
      />

      <Route
        path="/detail/:restaurantId"
        element={
          <Layout showHero={false}>
            <DetailPage />
            <Footer />
          </Layout>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/order-status"
          element={
            <Layout>
              <OrderStatusPage />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
              <Footer />
            </Layout>
          }
        />
        { <Route
          path="/manage-restaurant"
          element={
            <Layout>
              <ManageRestaurantPage />
            </Layout>
          }
        /> }
      </Route>

      <Route
        path="/about-us"
        element={
          <Layout>
            <AboutUSPage />
            <Footer />
          </Layout>
        }
      />
      <Route
        path="/faqs"
        element={
          <Layout>
            <FAQsPage />
          </Layout>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
