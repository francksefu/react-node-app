import { useContext, useState } from "react";
import UsersContext from "../../context/user";
import { Link } from "react-router";
import { useNavigate } from 'react-router-dom';

//Quand tu reviens tu devra tester le sign in et commencer a corriger des petites chose, ensuite va
//falloir que tu t assure que l application est professionnel, car il devraq etre ajouter a ton portfolio, bref tu fdoit etre 
//fiere du truc

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [names, setNames] = useState('');
    const [message, setMessage] = useState('');
    const [ dateT, setDate ] = useState('');
    const {signUser, token} = useContext(UsersContext);
    const navigate = useNavigate();

    const handleSubmit  = async (e) => {
        e.preventDefault();
        console.log(dateT);
        if (! dateT) {
            setMessage('Date of birth is required, fill it before submit');
            return;
        }

        if (! names) {
            setMessage('Names is required, fill it before submit');
            return;
        }
        
        if (! username) {
            setMessage('UserName is required, fill it before submit');
            return;
        }

        if (! password) {
            setMessage('Hey !You abuse now, password is a must, fill it before submit');
            return;
        }
        await signUser({username, password, names, dateT}, 'http://localhost:3001/signup');
    }
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
                            id="date"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            value={dateT}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <small className="text-red-500">{message}</small>
                        </div>

                    <div>
                        <label htmlFor="names" className="block text-sm/6 font-medium text-gray-900">Your names</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                placeholder="user name"
                                required
                                value={names}
                                onChange={(e) => setNames(e.target.value)}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>
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
                        <button onClick = {handleSubmit} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                        <p className="text-center text-gray-500">Already have an account? <Link className="text-indigo-600 hover:text-indigo-500" to="/signin">sign in</Link></p>
                    </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;