import { useState } from "react";
import {
    createUserDocumentFromAuth,
    createAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };
    
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // confirm that the password matches, see if we auth with email and passwords
        if (password !== confirmPassword) {
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );
            await createUserDocumentFromAuth(user, { displayName });
        } catch (err) {
            if (err.code === "auth/email-already-in-use") {
                alert("already in use");
            } else {
                console.log("there is err", err);
            }
        }
        resetFormFields();
    };

    return (
        <div>
            <h1>Sign up with your email and passwors</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Display Name</label>
                <input
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                />
                <br />
                <br />
                <label htmlFor="">Email</label>
                <input
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />
                <br />
                <br />
                <label htmlFor="">Password</label>
                <input
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />
                <br />
                <br />
                <label htmlFor="">Confirm Password</label>
                <input
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                />
                <br />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SignUpForm;
