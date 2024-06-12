import { SignUp } from "@clerk/clerk-react";

function SignUpScreen() {
    return (
        <div className="flex-grow flex flex-col h-full ">
            <div className="flex flex-grow justify-center ">

                <div className="flex flex-col flex-1 items-center justify-top text-center pt-20 "
                     style={{
                         background: 'linear-gradient(to top, #fda642 50%, #ffffff 100%)',
                     }}
                >
                    <div className="mb-5">
                        <img src="/src/assets/peacock.png" alt="Descriptive Text" className="max-w-[300px] max-h-[300px] " />
                    </div>
                    <div>
                        <img src="/src/assets/AUIS_black_3.png" alt="Descriptive Text" className="max-w-xs max-h-xs" />
                    </div>
                </div>
                <div className="flex flex-1 items-center justify-center ">
                    <SignUp />
                </div>
            </div>
        </div>
    );
}

export default SignUpScreen;
