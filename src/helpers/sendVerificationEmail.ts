import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmails";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email : string,
    username : string,
    verifyCode : string
):Promise<ApiResponse>

{
try{

    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Anonymous app verification code',
        react: VerificationEmail({username , otp : verifyCode})
      });


    return {
        success : true,
        message : 'Email send successfully'
    }

}catch(emailError){
    console.error('Email Error',emailError);
    return {
        success : false,
        message : 'Failed to send verification'
    }
}
}

