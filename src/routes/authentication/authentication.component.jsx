import SignUpForm from "../../components/sign-up-form/sign-up-form.componetn";
import SignInForm from "../../components/sign-in-form/sign-in-form.componetn";
import './authentication.style.scss';

const Authentication = () => {
    return (
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
        </div>
    );
};

export default Authentication;
