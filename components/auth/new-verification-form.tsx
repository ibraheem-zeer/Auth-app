"use client";

import { useCallback , useEffect , useState } from "react";
import { CardWrapper } from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import {BeatLoader} from "react-spinners"
import { newVerification } from "@/actions/new-verification";
import { FormError } from "../form-err";
import { FormSuccess } from "../form-success";


export const NewVerificationForm = () => {
    const [error,setError] = useState<string | undefined>();
    const [success,setSuccess] = useState<string | undefined>();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const onSubmit = useCallback(() => {
        if(success || error) return;
        if(!token) {
            setError("Missing token!");
            return;
        };
        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error)
            })
            .catch(() => {
                setError("Something went wrong!");
            })
    }, [token , success , error]) 

    useEffect(()=> {
        onSubmit();
    },[onSubmit])


    return(

        <CardWrapper
            headerLable="Confirming your verification"
            backButtonLable="Back to login"
            backButtonHref="/auth/login"
        >
            <div
                className="flex items-center w-full justify-center"
            >
                {/* as if statement */}
                {!success && !error && (
                    <BeatLoader/>
                )}
                <FormSuccess message={success}/>
                {!success && (<FormError message={error}/>)}
            </div>
        </CardWrapper>
        
    )
}