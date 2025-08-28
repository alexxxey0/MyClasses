import { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function Home() {
    const [selectedForm, setSelectedForm] = useState('login');

    return (
        <div className='py-16'>
            <h1 className='text-center text-4xl font-bold mb-16'>Welcome to MyClasses!</h1>
            {selectedForm === 'login' && <LoginForm setSelectedForm={setSelectedForm} />}
            {selectedForm === 'register' && <RegisterForm setSelectedForm={setSelectedForm} />}
        </div>
    );
}

export default Home;

