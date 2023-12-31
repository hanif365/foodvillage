import User from "@/models/User";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";


export const GET = async (req) => {
    await connectDB();
  
    try {
      const queryParams = req.nextUrl.searchParams;
      const userId = queryParams.get("userId");
      const userEmail = queryParams.get("userEmail");
  
      // console.log("UserId:", userId);
      // console.log("User Email",userEmail);

      let user;

      if(userId){
        user = await User.findById(userId);
      }
      else{
        user = await User.findOne({ email: userEmail });
      }
  
      
      // console.log("User: ", user);
      return new NextResponse(JSON.stringify(user), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      return new NextResponse(err.message, {
        status: 500,
      });
    }
  };