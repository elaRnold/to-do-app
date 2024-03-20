import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const API_BASE_URL = 'https://todo-list-api-14tz.onrender.com/';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [userLogin, setUserLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const redirect = () => {
            if (userLogin) {
                navigate("/");
            }
        };
        redirect();
    }, [userLogin]);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_BASE_URL}authentication`, {
                "email": email,
                "password": password,
                "strategy": "local"
            });

            const token = response.data.accessToken;
            localStorage.setItem('token', token);
            setError('');
            setUserLogin(true)

        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Error al iniciar sesión. Por favor, verifica tu correo electrónico y contraseña.');
        }
    };


    return (
        <>
            <div id="login-form-wrap">
                <h2>LogIn</h2>
                {error && <div className='customError'>{error}</div>}

                <form id="login-form" onSubmit={handleLogin}>
                    <p className='customP'>
                        <svg height="43" viewBox="0 0 32 32" width="43" xmlns="http://www.w3.org/2000/svg"><g data-name="78-user"><circle cx="16" cy="8" r="7" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" className="stroke-000000"></circle><path d="M28 31a12 12 0 0 0-24 0Z" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" className="stroke-000000"></path></g></svg>
                        {/* <svg height="43" viewBox="0 0 34 34" width="43" xmlns="http://www.w3.org/2000/svg"><title /><g id="about"><path d="M16,16A7,7,0,1,0,9,9,7,7,0,0,0,16,16ZM16,4a5,5,0,1,1-5,5A5,5,0,0,1,16,4Z" /><path d="M17,18H15A11,11,0,0,0,4,29a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1A11,11,0,0,0,17,18ZM6.06,28A9,9,0,0,1,15,20h2a9,9,0,0,1,8.94,8Z" /></g></svg> */}
                        <input type="email" id="email" name="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </p>
                    <p className='customP'>
                        <svg height="43" viewBox="0 0 32 32" width="43" xmlns="http://www.w3.org/2000/svg"><g data-name="Layer 13"><path d="M25 31H7a3 3 0 0 1-3-3V17a3 3 0 0 1 3-3h18a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3ZM7 16a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V17a1 1 0 0 0-1-1Z" fill="#ffffff" className="fill-101820"></path><path d="M24 16H8a1 1 0 0 1-1-1V9a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8v6a1 1 0 0 1-1 1ZM9 14h14V9a6 6 0 0 0-6-6h-2a6 6 0 0 0-6 6ZM16 23a2 2 0 1 1 2-2 2 2 0 0 1-2 2Zm0-2Z" fill="#ffffff" className="fill-101820"></path><path d="M15 22h2v4h-2z" fill="#ffffff" className="fill-101820"></path></g></svg>
                        <input type="password" id="password" name="password" placeholder="Contraseña" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </p>
                    <p>
                        <input type="submit" id="login" value="Iniciar sesión" />
                    </p>
                </form>
            </div>

            {/* <div className='customLogin'>
                <h2 className=''>Iniciar Sesión</h2>
                {error && <div>{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="form-field">
                        <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="form-field">
                        <input type="password" placeholder="Contraseña" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="form-field">
                        <button className="btn" type='submit'>Iniciar sesión</button>
                    </div>
                </form>
            </div> */}
        </>
    );
};

export default Login;