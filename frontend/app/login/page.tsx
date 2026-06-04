import { FormSchema, formSchema } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function LoginPage() {


  const handleLogin= async(data:FormSchema)=>{
    
    const res= await fetch("/api/v1/users/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    })
    reset()
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver:zodResolver(formSchema)
  });
  return (
    <div>
      <div>
        <div>
          <h1>Login </h1>
          <p>Welcome to the the site .</p>
        </div>
        <div>
          <form onSubmit={handleSubmit(handleLogin)}>
            {/*username or email */}
            <div>
              <label htmlFor="identifier">Email or Username</label>
              <input  type='text' id="identifier"  {...register("identifier")} />
              {errors.identifier && <p>{errors.identifier.message}</p>} 
            </div>
            {/*username or email */}
            <div>
              <label htmlFor="password">Password</label>
              <input type='password' id="password" {...register("password")} />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            {/*submitting button */}
            <div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
