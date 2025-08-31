import { useState } from 'react';
import Step1 from './CreateSemesterSteps/Step1';
import Step2 from './CreateSemesterSteps/Step2';

function CreateSemester() {
    const [step, setStep] = useState(1);

    return (
        <div className='my-16'>
            {step === 1 && <Step1 setStep={setStep}/>}
            {step === 2 && <Step2 setStep={setStep}/>}
        </div>
    );
}

export default CreateSemester;