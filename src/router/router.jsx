import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Home from "../pages/home/Home";
import AllTrainer from "../pages/alltrainer/AllTrainer";
import AllClasses from "../pages/classes/AllClasses";
import Community from "../pages/community/Community";
import Login from "../pages/Login";
import Register from "../pages/Register";
import TrainerDetails from "../pages/trainerDetails/TrainerDetails";
import BeATrainer from "../pages/beATrainer/BeATrainer";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children:[
        {
          path:'/',
          element:<Home></Home>
        },
        {
          path:'/allTrainer',
          element:<AllTrainer></AllTrainer>
        },
        {
          path:'/trainerDetails',
          element:<TrainerDetails></TrainerDetails>

        },
        {
          path:'/beATrainer',
          element:<PrivateRoute><BeATrainer></BeATrainer></PrivateRoute>

        },
        {
          path:'/allClasses',
          element:<AllClasses></AllClasses>
        },
        {
          path:'/community',
          element:<Community></Community>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/register',
          element:<Register></Register>
        }
      ]
    },
  ]);