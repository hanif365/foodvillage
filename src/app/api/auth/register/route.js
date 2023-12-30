import User from "@/models/User";
import connectDB from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    phoneNumber,
    nid,
    dateOfBirth,
    address,
    roles,
  } = await request.json();

  if (password !== confirmPassword) {
    return new NextResponse("Passwords do not match", {
      status: 400,
    });
  }

  await connectDB();

  const hashedPassword = await bcrypt.hash(password, 5);

  console.log("Role fron Backend: ", roles);

  const userRoles = roles ? roles[0] === 'user' ? ['user'] : roles.concat('user') : ['user'];

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
    nid,
    dateOfBirth,
    address,
    roles: userRoles,
  });

  try {
    await newUser.save();
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
