import { useState } from "react";
import { createAuthuserwithemailandpassword, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../formInput/form-input.component";
import "./sign-up-form.style.scss";
import Button from "../button/button.component";



const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields;
   

    const resetForm = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        if (password !== confirmPassword) {
            alert("your passwords not matched");
            return;
        }
        try {
            const { user } = await createAuthuserwithemailandpassword(email, password);
            await createUserDocFromAuth(user, { displayName });
            
            resetForm()
        } catch (error) {
            if (error.code === "auth/eamil-already-in use") {
                alert("can not create user, eamil aleady in use")
            } else {

                console.log("catching error creating user", error)
            }
        }


    };

    const handleChange = (event) => {
        const { name, value } = event.target;


        setFormFields({ ...formFields, [name]: value })
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>sign up with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text"
                    required onChange={handleChange}
                    name="displayName"
                    value={displayName}
                />

                <FormInput
                    label="Email"
                    type="email"
                    required onChange={handleChange}
                    name="email" value={email}
                />

                <FormInput
                    label="password"
                    type="password"
                    required onChange={handleChange}
                    name="password" value={password}
                />

                <FormInput
                    label="Confirm Password"
                    type="password"
                    required onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;