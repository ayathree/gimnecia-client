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
import PayCard from "../pages/payCard/PayCard";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/dash/member/Profile";
import AllUser from "../pages/dash/admin/AllUser";
import AdminRoute from "./AdminRoute";
import ApplyTrainers from "../pages/dash/admin/ApplyTrainers";
import ApplicantDetails from "../pages/dash/admin/ApplicantDetails";
import FinalTrainers from "../pages/dash/admin/FinalTrainers";
import TrainerRouter from "./TrainerRouter";
import ManageSlot from "../pages/dash/trainer/ManageSlot";
import AddNewSlot from "../pages/dash/trainer/AddNewSlot";
import AddNewForum from "../pages/dash/trainer/AddNewForum";
import Balance from "../pages/dash/admin/Balance";
import AllNewLetter from "../pages/dash/allNewsLetter/AllNewLetter";
import BookedDetails from "../pages/dash/trainer/BookedDetails";

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
          loader:({params})=>fetch(`http://localhost:5000/confirmedTrainer/${params.id}`)

        },
        {
          path:'/bookedTrainer/:id',
          element:<PrivateRoute><BookedTrainer></BookedTrainer></PrivateRoute>,
          loader:({params})=>fetch(`http://localhost:5000/trainee/${params.id}`)


        },
        {
          path:'/payment/:id',
          element:<PrivateRoute> <Payment></Payment></PrivateRoute>,
          loader:({params})=>fetch(`http://localhost:5000/bookedUser/${params.id}`)


        },
        {
          path:'/payCard/:id',
          element:<PrivateRoute><PayCard></PayCard></PrivateRoute>,
          loader:({params})=>fetch(`http://localhost:5000/bookeee/${params.id}`)


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
    // dashboard
    {
      path:'dashboard',
      element:<Dashboard></Dashboard>,
      children:[
        {
          path:'profile',
          element:<PrivateRoute><Profile></Profile></PrivateRoute>
        },


        // admin
        {
          path:'allUsers',
          element:<AdminRoute><AllUser></AllUser></AdminRoute>
        },
        {
          path:'allNewsSub',
          element:<AdminRoute><AllNewLetter></AllNewLetter></AdminRoute>
        },
        {
          path:'appliedTrainer',
          element:<AdminRoute><ApplyTrainers></ApplyTrainers> </AdminRoute>
        },
        {
          path:'applicantDetails/:id',
          element:<AdminRoute> <ApplicantDetails></ApplicantDetails> </AdminRoute>,
          loader:({params})=>fetch(`http://localhost:5000/trainers/${params.id}`)


        },
        {
          path:'allTrainerConfirmed',
          element:<AdminRoute><FinalTrainers></FinalTrainers></AdminRoute>
        },
        {
          path:'balance',
          element:<AdminRoute><Balance></Balance></AdminRoute>
        },

        // trainer
        {
          path:'manageSlot',
          element:<TrainerRouter><ManageSlot></ManageSlot></TrainerRouter>
        },
        {
          path:'addNewSlot',
          element:<TrainerRouter><AddNewSlot></AddNewSlot></TrainerRouter>,
          
          
        },
        {
          path:'addNewForum',
          element:<TrainerRouter><AddNewForum></AddNewForum></TrainerRouter>
        },
        {
          path:'bookeDetails/:id',
          element:<TrainerRouter><BookedDetails></BookedDetails></TrainerRouter>,
          loader:({params})=>fetch(`http://localhost:5000/bookeee/${params.id}`)
          
        }
      ]
    }
  ]);