import { useContext } from "react";
import UsersContext from "../../context/user";
import { Link } from "react-router";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";

const SignUp = () => {
    const {signUser, token, message} = useContext(UsersContext);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
          username: '',
          password: '',
          names: '',
          dateT: '',
        },
        validationSchema: Yup.object({
          username: Yup.string().email()
            .required('Required dude'),
          password: Yup.string()
            .required('This field is requiered')
            .min(8, 'Must be 8 characters or more'),
          names: Yup.string()
            .required('This field is required'),
          dateT: Yup.date()
            .required('You must provide your birthday date')
        }),
        onSubmit: async (values) => {
            await signUser(values, 'https://react-node-app-3fyn.vercel.app/signup');
        }
      });
    //
    
    if (token) {
        navigate("/");
    }
    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">Your birth date</label>
                        <input
                            type="date"
                            id="dateT"
                            name="dateT"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            value={formik.values.dateT}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.dateT ? (
                            <div><small className="text-red-500">{formik.errors.dateT}</small></div>
                        ) : null}
                        
                        </div>

                    <div>
                        <label htmlFor="names" className="block text-sm/6 font-medium text-gray-900">Your names</label>
                        <div className="mt-2">
                            <input
                                id="names"
                                name="names"
                                type="text"
                                placeholder="user name"
                                required
                                value={formik.values.names}
                                onChange={formik.handleChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {formik.errors.names ? (
                            <div><small className="text-red-500">{formik.errors.names}</small></div>
                        ) : null}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                        <div className="mt-2">
                        <input
                            id="usermane"
                            name="username"
                            type="text"
                            placeholder="Your email adress"
                            value={formik.values.username}
                            required
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
                        </div>
                        <div className="mt-2">
                        <input type="password"
                            id="password"
                            name="password" 
                            autoComplete="current-password"
                            required
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        </div>
                        {formik.errors.password ? (
                            <div><small className="text-red-500">{formik.errors.password}</small></div>
                        ) : null}
                    </div>

                    <div>
                        <button type="submit" onClick = {formik.handleSubmit} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                        <p className="text-center text-gray-500">Already have an account? <Link className="text-indigo-600 hover:text-indigo-500" to="/signin">sign in</Link></p>
                    </div>
                    <div><small className="text-red-500">{message}</small></div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;