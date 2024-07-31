import connectDB from "@/utils/Db";
import { NextResponse } from "next/server";
import User from "../../../../Models/User";
import bcrypt from 'bcrypt';
console.log("hello", 'from line 4');

export const POST = async ( request ) => {
    const { name, email, password } = await request.json();
        
    
    try {
      
        await connectDB();
        const hashpassword = await bcrypt.hash(password, 10);
        
        const newUser =  new User({
             name, // Assuming you meant to use `name` here
            email,
            password: hashpassword
        });

        await newUser.save();
        return new NextResponse('User has been created', { status: 201 });

    } catch (error) {
        console.error(error); // Log the error to the console
        return new NextResponse(error.message, { status: 500 });
    }
}
