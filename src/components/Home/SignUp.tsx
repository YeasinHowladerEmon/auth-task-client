

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { IUserInputs } from "./SignIn";
import { Link } from "react-router-dom";
import axios from "axios";


const UserSchema: ZodType<IUserInputs> = z
    .object({
        name: z
            .string()
            .nonempty({ message: "Name is required" }),
        email: z
            .string()
            .nonempty({ message: "Email is required" }).email(),
        password: z.string()
            .min(6, { message: "password must be at least 6 characters" })
            .max(10, { message: "Password must not exceed 10 characters" })
    })
    .required();

export type UserSchemaType = z.infer<typeof UserSchema>;
const SignUp = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UserSchemaType>({
        resolver: zodResolver(UserSchema)
    });
    const onSubmit = async (data: UserSchemaType) => {
        await axios.post('', data)
            .then((data) => console.log(data))
            .catch((err) => console.log(err))

        reset()
    }
    return (
        <div className=" mt-10">
            <div className='grid grid-cols-1 justify-items-center'>
                <h1 className='text-4xl'>Sign Up </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="lg:w-[60%] md:w-[43%] w-[100%] mt-4">
                    <div >
                        <label className='label'>Name</label>
                        <input type="text" className="input input-bordered input-primary w-full " placeholder="Name"   {...register('name')} />
                        {errors.name && <p>{errors.name.message}</p>}
                    </div>
                    <div className="mt-4">
                        <label className='label'>Email</label>
                        <input type="text" className="input input-bordered input-primary w-full " placeholder="Email"   {...register('email')} />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div className="mt-4">
                        <label className='label'>Password</label>
                        <input type="text" className="input input-bordered input-primary w-full " placeholder="Password"   {...register('password')} />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>


                    <button className='mt-8 btn btn-primary' type="submit">Submit</button>
                </form>
                <Link to='/' className="mt-4">
                    <h1 className='text-xl'>Sign In </h1>
                </Link>
            </div>
        </div>
    );
};

export default SignUp;