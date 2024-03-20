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
                    <p>
                        <input type="email" id="email" name="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <i className="validation"><span></span><span></span></i>
                    </p>
                    <p>
                        <input type="password" id="password" name="password" placeholder="Contraseña" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        <i className="validation"><span></span><span></span></i>
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