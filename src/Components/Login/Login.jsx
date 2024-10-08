import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import './Login.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    // Função para lidar com o login
    const handleSubmit = (event) => {
        event.preventDefault();

        // Obtém os usuários do localStorage ou define como vazio se não houver
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Verifica se o usuário existe e se a senha está correta
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            alert('Login bem-sucedido!');
        } else {
            alert('Usuário ou senha incorretos.');
        }
    };

    // Função para lidar com o cadastro
    const handleRegister = (event) => {
        event.preventDefault();

        // Obtém os usuários do localStorage ou define como vazio se não houver
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Verifica se o email já foi cadastrado
        const userExists = users.some(user => user.username === username);

        if (userExists) {
            alert('Esse email já está cadastrado.');
        } else {
            // Adiciona o novo usuário à lista de usuários
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Cadastro realizado com sucesso! Agora você pode fazer login.');
            setIsRegistering(false);
        }
    };

    return (
        <div className='container'>
            <form onSubmit={isRegistering ? handleRegister : handleSubmit}>
                <>
                    <h1>{isRegistering ? 'Cadastre-se' : 'Acesse o Sistema'}</h1>
                    <div className="input-field">
                        <input type="email" placeholder='Digite seu e-mail' 
                        required
                        onChange={(e) => setUsername(e.target.value)} />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-field">
                        <input type='password' placeholder='Digite sua senha'
                        required
                        onChange={(e) => setPassword(e.target.value)} />
                        <FaLock className="icon" />
                    </div>

                    {!isRegistering && (
                        <div className="recall-forget">
                            <label>
                                <input type='checkbox' />
                                Lembre de mim.
                            </label>
                            <a href="#">Esqueci a senha?</a>
                        </div>
                    )}
                    
                    <button>{isRegistering ? 'Cadastrar' : 'Entrar'}</button>

                    <div className="signup-link">
                        <p>
                            {isRegistering ? (
                                <span>Já tem conta? <a href="#" onClick={() => setIsRegistering(false)}>Login</a></span>
                            ) : (
                                <span>Não tem conta? <a href="#" onClick={() => setIsRegistering(true)}>Cadastre-se</a></span>
                            )}
                        </p>
                    </div>
                </>
            </form>
        </div>
    )
}

export default Login;
