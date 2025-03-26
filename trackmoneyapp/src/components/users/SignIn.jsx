import { useContext, useState } from "react";
import UsersContext from "../../context/user";
import { Link } from "react-router";
import ExpensesList from "../expenses/ExpensesList";


const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {signUser, token} = useContext(UsersContext);

    const handleSubmit  = async (e) => {
        e.preventDefault();
        await signUser({username, password}, 'http://localhost:3001/signin');
    }
    if (token) {
        return <ExpensesList/>;
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
                            placeholder="user name"
                            required
                            onChange={(e) => setUsername(e.target.value)}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
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
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        </div>
                    </div>

                    <div>
                        <button onClick = {handleSubmit} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        <p className="p-3 text-gray-500">You don't have an account? <Link className="text-indigo-600 hover:text-indigo-500" to="/signup">sign up</Link></p>
                    </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignIn;