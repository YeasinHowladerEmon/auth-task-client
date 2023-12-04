
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ZodType, z } from "zod";
export type IUserInputs = {
    name?: string;
    email: string;
    password: string;
};

 const UserSchema: ZodType<IUserInputs> = z
    .object({
        email: z
            .string()
            .nonempty({ message: "Email is required" }).email(),
        password: z.string()
            .min(6, { message: "password must be at least 6 characters" })
            .max(10, { message: "Password must not exceed 10 characters" })
    })
    .required();

export type UserSchemaType = z.infer<typeof UserSchema>;
const SignIn = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UserSchemaType>({
        resolver: zodResolver(UserSchema)
    });
    const onSubmit = (data: UserSchemaType) => {
        console.log(data);
    }
    return (
        <div className=" mt-10">
            <div className='grid grid-cols-1 justify-items-center'>
                <h1 className='text-4xl'>Sign In </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="lg:w-[60%] md:w-[43%] w-[100%] mt-4">
                    <div className="">
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
            <Link to='/signup' className="mt-4 ">
            <h1 className='text-xl'>Create a new Account? Sign Up </h1>
            </Link>
            </div>
        </div>
    );
};

export default SignIn;