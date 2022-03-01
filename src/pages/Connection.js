import { SignInForm, SignUpForm } from "../components/ConnectionForm.js";

export const SignIn = () => {

    // function handleClick(e) {
    //Quand on recoit un clique de Sign Up on affiche le formulaire de SIgnUp et inversement
    // }
    //let txt = "Sign up"; // a modifier pour recupéré le txt venant du bouton cliqué 

    return (
        <>
            <main>
                <h1>Let's connect yourself !</h1>

                <SignInForm />
                
            </main>
        </>
    )
};

export const SignUp = () => {

    return (
        <>
            <main>
                <h1>Let's connect yourself !</h1>

                <SignUpForm />
                
            </main>
        </>
    )
};

export const Connection = () => {
    //Pour essayer de centraliser les deux du dessus 
    return (
        <>

        </>
    )
};
