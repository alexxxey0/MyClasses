import { useForm } from '@inertiajs/react';
import SubmitButton from './SubmitButton';

function RegisterForm({ setSelectedForm }) {
    // Form helper from Inertia documentation (https://www.inertiajs.com/forms)
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        name: '',
        surname: '',
        phone_number: '',
        password: '',
        password_confirmation: '',
        profile_picture: ''
    });


    function submit(e) {
        e.preventDefault();
        post('/login');
    }

    return (
        <form onSubmit={submit} className='w-3/12 mx-auto bg-white shadow-xl rounded-lg p-8'>
            <h2 className='text-center font-bold text-3xl mb-4'>Register</h2>

            <div className='flex flex-col gap-y-2'>
                <p><span className='text-red-500'>*</span> indicates a required field</p>
                <div className='flex flex-col'>
                    <label htmlFor="name">Name<span className='text-red-500'>*</span></label>
                    <input className='p-1 border-1 border-black rounded-md' type="text" name="name" id="name" required value={data.name} onChange={e => setData('name', e.target.value)} />
                    {errors.name && <div>{errors.name}</div>}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="surname">Surname<span className='text-red-500'>*</span></label>
                    <input className='p-1 border-1 border-black rounded-md' type="text" name="surname" id="surname" required value={data.surname} onChange={e => setData('surname', e.target.value)} />
                    {errors.surname && <div>{errors.surname}</div>}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="email">Email<span className='text-red-500'>*</span></label>
                    <input className='p-1 border-1 border-black rounded-md' type="email" name="email" id="email" required value={data.email} onChange={e => setData('email', e.target.value)} />
                    {errors.email && <div>{errors.email}</div>}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="phone_number">Phone number</label>
                    <input className='p-1 border-1 border-black rounded-md' type="text" name="phone_number" id="phone_number" value={data.phone_number} onChange={e => setData('phone_number', e.target.value)} />
                    {errors.phone_number && <div>{errors.phone_number}</div>}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password">Password<span className='text-red-500'>*</span></label>
                    <input className='p-1 border-1 border-black rounded-md' type="password" name="password" id="password" required value={data.password} onChange={e => setData('password', e.target.value)} />
                    {errors.password && <div>{errors.password}</div>}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password_confirmation">Confirm password<span className='text-red-500'>*</span></label>
                    <input className='p-1 border-1 border-black rounded-md' type="password" name="password_confirmation" id="password_confirmation" required value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} />
                    {errors.password_confirmation && <div>{errors.password_confirmation}</div>}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="profile_picture">Profile picture</label>
                    <input className='p-1 border-1 border-black rounded-md' type="file" accept="image/*" name="profile_picture" id="profile_picture" onChange={e => setData('profile_picture', e.target.files[0])} />
                    {errors.profile_picture && <div>{errors.profile_picture}</div>}
                </div>
            </div>
            <p className='mt-2'>Already have an account? <span onClick={() => setSelectedForm('login')} className='hover:underline cursor-pointer text-blue-500'>Log in</span></p>
            <div className='mx-auto w-1/2 *:w-full mt-4'>
                <SubmitButton text='Register' />
            </div>
        </form>
    );
}

export default RegisterForm;