import { useForm } from '@inertiajs/react';
import SubmitButton from './SubmitButton';

function LoginForm({ setSelectedForm }) {
    // Form helper from Inertia documentation (https://www.inertiajs.com/forms)
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: ''
    });


    function submit(e) {
        e.preventDefault();
        post('/login');
    }

    return (
        <form onSubmit={submit} className='w-3/12 mx-auto bg-white shadow-xl rounded-lg p-8'>
            <h2 className='text-center font-bold text-3xl mb-4'>Log in</h2>

            <div className='flex flex-col gap-y-2'>
                <div className='flex flex-col'>
                    <label htmlFor="email">Email address</label>
                    <input className='p-1 border-1 border-black rounded-md' type="email" name="email" required value={data.email} onChange={e => setData('email', e.target.value)} />
                    {errors.email && <div>{errors.email}</div>}
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="password">Password</label>
                    <input className='p-1 border-1 border-black rounded-md' type="password" name="password" required value={data.password} onChange={e => setData('password', e.target.value)} />
                    {errors.password && <div>{errors.password}</div>}
                </div>
            </div>
            <p className='mt-2'>Don't have an account yet? <span onClick={() => setSelectedForm('register')} className='hover:underline cursor-pointer text-blue-500'>Register</span></p>
            <div className='mx-auto w-1/2 *:w-full mt-4'>
                <SubmitButton text='Log in' />
            </div>
        </form>
    );
}

export default LoginForm;