import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/Auth/AuthContext';
import AlertMessage from '../components/AlertMessage';
import { useNavigate } from 'react-router-dom';
const SignupForm = () => {
    const authContext = useContext(AuthContext);

    const { userRegistration, getDropDown } = authContext;
    const [alert, setAlert] = useState({ status: null, message: '' });
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        dob: '',
        countryId: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [countries, setCountriesOption] = useState([]); // State to store resolved categories
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const categories = await getDropDown('Country'); // Resolve the Promise
                setCountriesOption(categories || []); // Set the resolved categories
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchCountries();
    }, [getDropDown]);

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.dob) newErrors.dob = 'Date of Birth is required';
        if (!formData.countryId) newErrors.countryId = 'Country is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            const payload = {
                FirstName: formData.firstName,
                MiddleName: formData.middleName,
                LastName: formData.lastName,
                DOB: formData.dob,
                CountryId: parseInt(formData.countryId),
                Email: formData.email,
                Password: formData.password
            };

            const res = await userRegistration(payload);
            console.log(res);
            setAlert(res);
            if (res.status == true) {
                const navigate = useNavigate();
                navigate('/login');
            }
        }
    };

    return (
        <>
            <AlertMessage
                status={alert.status}
                message={alert.message}
                onClose={() => setAlert({ status: null, message: '' })}
            />
            <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                    </div>

                    <div>
                        <label className="block mb-1">Middle Name</label>
                        <input
                            type="text"
                            name="middleName"
                            value={formData.middleName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                    </div>

                    <div>
                        <label className="block mb-1">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
                    </div>

                    <div>
                        <label className="block mb-1">Country</label>
                        <select
                            name="countryId"
                            value={formData.countryId}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="">-- Select Country --</option>
                            {countries.map(country => (
                                <option key={country.id} value={country.id}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                        {errors.countryId && <p className="text-red-500 text-sm">{errors.countryId}</p>}
                    </div>

                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <div>
                        <label className="block mb-1">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </>
    );
};

export default SignupForm;
