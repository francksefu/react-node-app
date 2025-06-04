import { useContext, useState } from "react";
import UsersContext from "../../context/user";
import { Link } from "react-router";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";

const SignIn = () => {
    const {signUser, token} = useContext(UsersContext);
    const navigate = useNavigate();
    //
    const formik = useFormik({
        initialValues: {
          username: '',
          password: '',
        },
        validationSchema: Yup.object({
          username: Yup.string().email()
            .required('Required dude'),
          password: Yup.string()
            .min(8, 'Must be 8 characters or more')       
        }),
        onSubmit: async (values) => {
            await signUser(values, 'https://expense-related.netlify.app/signin');
        }
      });
      //
    
    if (token) {
        navigate("/");
    }
    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                        <div className="mt-2">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="email"
                            required
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        {formik.errors.username ? (
                    <div><small className="text-red-500">{formik.errors.username}</small></div>
                ) : null}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                        <div className="text-sm">
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                        </div>
                        </div>
                        <div className="mt-2">
                        <input type="password"
                            name="password" 
                            autoComplete="current-password"
                            value={formik.values.password}
                            required
                            onChange={formik.handleChange}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        {formik.errors.password ? (
                            <div><small className="text-red-500">{formik.errors.password}</small></div>
                        ) : null}
                        </div>
                    </div>

                    <div>
                        <button type="submit" onClick = {formik.handleSubmit} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        <p className="p-3 text-gray-500">You don't have an account? <Link className="text-indigo-600 hover:text-indigo-500" to="/signup">sign up</Link></p>
                    </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignIn;