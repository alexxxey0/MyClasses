import SubmitButton from "./components/SubmitButton";
import { useState, useEffect } from "react";
import { router, usePage } from '@inertiajs/react';

export default function CreateAssignment() {
    const { user_classes } = usePage().props;

    const [data, setData] = useState({
        name: "",
        description: "",
        type: "Homework",
        deadline: "",
        class_id: ""
    });

    const [errors, setErrors] = useState({});

    // Generic field update + save to sessionStorage
    const updateField = (field, value) => {
        const updatedData = { ...data, [field]: value };
        setData(updatedData);
    };

    // Handle form submit
    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        router.post('/create_assignment', data);
    };

    return (
        <div className="my-16">
            <h1 className="text-center font-bold text-xl mb-4">Create a new assignment</h1>
            <form onSubmit={submit} className="flex flex-col gap-y-4 w-3/12 mx-auto bg-white shadow-xl rounded-lg p-8">
                <p><span className="text-red-500">*</span> indicates a required field</p>

                {/* Class */}
                <div className="flex flex-col">
                    <label htmlFor="class_id">
                        Class<span className="text-red-500">*</span>
                    </label>
                    <select
                        className="p-1 border-1 border-black rounded-md"
                        name="class_id"
                        required
                        value={data.class_id}
                        onChange={(e) => updateField("class_id", e.target.value)}
                    >
                        {user_classes.map((userClass) => (
                            <option key={userClass.id} value={userClass.id}>{userClass.name}</option>
                        ))}
                    </select>
                    {errors.type && <div className="text-red-500">{errors.type}</div>}
                </div>

                {/* Name */}
                <div className="flex flex-col">
                    <label htmlFor="educational_institution">
                        Name<span className="text-red-500">*</span>
                    </label>
                    <input
                        className="p-1 border-1 border-black rounded-md"
                        type="text"
                        name="name"
                        required
                        value={data.name}
                        onChange={(e) => updateField("name", e.target.value)}
                    />
                    {errors.name && <div className="text-red-500">{errors.name}</div>}
                </div>

                {/* Description */}
                <div className="flex flex-col">
                    <label htmlFor="description">
                        Description<span className="text-red-500">*</span>
                    </label>
                    <textarea
                        className="p-1 border-1 border-black rounded-md"
                        name="description"
                        required
                        value={data.description}
                        onChange={(e) => updateField("description", e.target.value)}
                    >
                    </textarea>
                    {errors.description && <div className="text-red-500">{errors.description}</div>}
                </div>

                {/* Type of assignment */}
                <div className="flex flex-col">
                    <label htmlFor="type">
                        Type<span className="text-red-500">*</span>
                    </label>
                    <select
                        className="p-1 border-1 border-black rounded-md"
                        name="type"
                        required
                        value={data.type}
                        onChange={(e) => updateField("type", e.target.value)}
                    >
                        <option value="Homework">Homework</option>
                        <option value="Test">Test</option>
                        <option value="Exam">Exam</option>
                    </select>
                    {errors.type && <div className="text-red-500">{errors.type}</div>}
                </div>

                {/* Deadline */}
                <div className="flex flex-col">
                    <label htmlFor="deadline">
                        Deadline<span className="text-red-500">*</span>
                    </label>
                    <input
                        className="p-1 border-1 border-black rounded-md"
                        type="date"
                        name="deadline"
                        required
                        value={data.deadline}
                        onChange={(e) => updateField("deadline", e.target.value)}
                    />
                    {errors.deadline && <div className="text-red-500">{errors.deadline}</div>}
                </div>

                <SubmitButton text="Create" />
            </form>
        </div>
    );
}