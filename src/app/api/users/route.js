import User from "@/models/User";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();

  try {
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), {
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

export const PATCH = async (req) => {
  await connectDB();

  try {
    const queryParams = req.nextUrl.searchParams;
    const userId = queryParams.get("userId");
    const { name, email, phoneNumber, nid, address } = await req.json();

    // console.log("ID: ", userId);

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Update user fields
    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.nid = nid;
    user.address = address;

    // Save the updated user
    await user.save();

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


export const DELETE = async (req) => {
  await connectDB();

  try {
    const queryParams = req.nextUrl.searchParams;
    const userId = queryParams.get("userId");

    // Check if the user ID is provided
    if (!userId) {
      return new NextResponse("User ID is required", {
        status: 400,
      });
    }

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return new NextResponse("User not found", {
        status: 404,
      });
    }

    // Delete the user
    await user.deleteOne();

    return new NextResponse("User deleted successfully", {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
