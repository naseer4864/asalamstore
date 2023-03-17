import { useState } from "react";
import {  signInwithGooglePopup, signInAuthuserwithemailandpassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../formInput/form-input.component";
import "./sign-in-form.style.scss";
import Button from "../button/button.component";


const defaultFormFields = {
    email: "",
    password: "",
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password, } = formFields;

   
    const resetForm = () => {
        setFormFields(defaultFormFields)
    };

    const SignInWithGoogle = async () => {
         await signInwithGooglePopup();
        

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthuserwithemailandpassword(email, password)
           
            resetForm()
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("incorrect password for email");
                    break;
                case "auth/user-not-found":
                    alert("no user associated with this email");
                    break;
                default:
                    console.log(error)
            }

        }


    };

    const handleChange = (event) => {
        const { name, value } = event.target;


        setFormFields({ ...formFields, [name]: value })
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>sign in with your email and password</span>

            <form onSubmit={handleSubmit}>

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


                <div style={{display: "flex", justifyContent:"space-between"}}>
                    <Button type="submit" style={{marginLeft:"10px"}}>Sign In</Button>
                    <Button type="button" buttonType="google" onClick={SignInWithGoogle} style={{marginLeft:"10px"}}> Google sign in </Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;