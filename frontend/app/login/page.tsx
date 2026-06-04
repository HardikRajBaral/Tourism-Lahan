import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema, formSchema } from "@/utils/zod";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
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
          <form></form>
        </div>
      </div>
    </div>
  );
}
