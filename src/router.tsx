import { HashRouter as BrowserRouter, Route, Routes } from "react-router-dom";

// import "react-toastify/dist/ReactToastify.css"


import { ToastContainer } from "react-toastify";
import Spinner from "./components/Spinner/Spinner";
import LoginUser from "./Views/LoginUser";
import BookPage from "./Views/BookPage";
import ProtectedRoute from "./components/ProtectedRouted";
import { useAppStore } from "./stores/UseAppStore";
import Menu from "./components/Menu/Menu";
import RegisterUser from "./Views/RegisterUser";
import DetailBook from "./components/Book/DetailBook";

export default function AppRouter() {

  const { isAuthenticated} = useAppStore();


  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<LoginUser />} index />
          <Route path="/register" element={<RegisterUser />} />
        <Route path="/books" element={
          
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Menu />  
            <BookPage />
          </ProtectedRoute>
          
          } />
          <Route 
            path="/books/:book_Id" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Menu />
                <DetailBook />
              </ProtectedRoute>
            } 
          />

        </Routes>
        <Spinner />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
