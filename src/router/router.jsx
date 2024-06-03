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
import BookedTrainer from "../pages/bookedTrainer/BookedTrainer";
import Payment from "../pages/payment/Payment";

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
          path:'/trainerDetails/:id',
          element:<TrainerDetails></TrainerDetails>,
          loader:({params})=>fetch(`http://localhost:5000/trainers/${params.id}`)

        },
        {
          path:'/bookedTrainer/:id',
          element:<PrivateRoute><BookedTrainer></BookedTrainer></PrivateRoute>,
          loader:({params})=>fetch(`http://localhost:5000/trainee/${params.id}`)


        },
        {
          path:'/payment',
          element:<PrivateRoute> <Payment></Payment></PrivateRoute>,
          // loader:({params})=>fetch(`http://localhost:5000/booked/${params.id}`)


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