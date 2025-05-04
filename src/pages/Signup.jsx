import React from "react";
import { useFormik } from "formik";
import { signUpValidator as validate } from "../utils/helpers/formValidator";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/axiosConfig";
import { ToastContainer , toast } from 'react-toastify';


function Signup() {
  const navigate = useNavigate();
  const logintoast = () =>{ 
    toast.success("Welcome To BoostU!");}
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      const { firstName, lastName, email, password } = values;
      const jsonUser = JSON.stringify({ firstName, lastName, email, password });

      api
        .post("/auth/signup", jsonUser, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 201) {
            toast.success("Your account has been created!", { duration: 4000 });
            setTimeout(() => {
              navigate("/auth/login");
            }, 1000);
          }
        })
        .catch((error) => {
          if (error.code === "ERR_BAD_REQUEST")
            toast.error("User already exists.", { duration: 4000 });
          else console.log(error)
        });
    },
  });
  return (
    <div className="wrapper dark:text">
<div className="p-8 mt-[8%] w-1/2 h-max mx-auto bg-lightColor-100 border-4 border-lightColor-300 dark:border-grayshade-300 dark:bg-grayshade-400 rounded-lg">
<div className="text-center mb-4">
          <h1 className="text-purpleshade-400 font-extrabold text-4xl mb-3">
            Sign Up
          </h1>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="grid md:grid-cols-2 content-center"
        >
          <div className="form-section  md:col-span-2">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Enter your first name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
            <span>
              {formik.touched.firstName && formik.errors.firstName
                ? `*${formik.errors.firstName}`
                : null}
            </span>
          

       
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Enter your last name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
            <span>
              {formik.touched.lastName && formik.errors.lastName
                ? `*${formik.errors.lastName}`
                : null}
            </span>
          

          
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <span>
              {formik.touched.email && formik.errors.email
                ? `*${formik.errors.email}`
                : null}
            </span>
         

         
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <span>
              {formik.touched.password && formik.errors.password
                ? `*${formik.errors.password}`
                : null}
            </span>
          </div>

          <div className="form-section items-center md:col-span-2">
            <button type="submit" onClick={logintoast} >Sign Up</button>
            <Link to={"/auth/login"}>Login</Link>
          </div>
        </form>
      </div>
      <ToastContainer />

    </div>
  );
}

export default Signup;
