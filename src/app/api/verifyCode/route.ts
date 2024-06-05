import connectDb from "@/lib/dbConncet";
import UserModel from "@/model/User";


export async function POST(request: Request) {
  await connectDb();
  try {
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({
      username: decodedUsername,
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "No user found",
        },
        {
          status: 500,
        }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNoExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNoExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        {
          success: true,
          message: "User is verified",
        },
        {
          status: 200,
        }
      );
    }else if(!isCodeNoExpired){
        return Response.json(
            {
              success: false,
              message: "Code is expired",
            },
            {
              status: 400,
            }
          );
    }else{
        return Response.json(
            {
              success: false,
              message: "Wrong verify code",
            },
            {
              status: 400,
            }
          );
    }
  } catch (error) {
    console.error("Error");
    return Response.json({
      success: false,
      message: "Error verifying user code",
    });
  }
}
