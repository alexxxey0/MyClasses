function SubmitButton(props) {
    return(
        <button type="submit" className='bg-[#34D399] font-semibold text-lg p-2 rounded-md mt-4 shadow active:translate-y-0.5 active:shadow-inner hover:scale-105 transition cursor-pointer'>{props.text}</button>
    );
}

export default SubmitButton;