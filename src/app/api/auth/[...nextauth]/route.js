import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "../../../../utils/Db";
import User from "../../../../Models/User";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

const handler= NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            httpOptions: {
                timeout: 10000
            }
        }),
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",
            async authorize(credentials){

                await connectDB();

                try{
                    const user = await User.findOne({email: credentials.email});
                    if(user){
                        // check password
                        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                        if(isPasswordCorrect){
                            return user;
                        } else{
                            throw new Error("Wrong Credentials");
                        }

                    } else{
                        throw new Error("User not found");
                    }

                } catch(error){
                  throw new Error(error);
                }

            }
            
         
        })
    ],
    pages: {
    error:"/dashboard/login"
    }
})

export {handler as GET, handler as POST}