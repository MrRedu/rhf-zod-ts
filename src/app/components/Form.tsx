"use client";
import { userScheme } from "@/schemes/userScheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const FormItem = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

const HelperText = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-sm text-red-500">{children}</p>;
};

const labelStyle = "text-lg text-sm font-bold";
const inputStyle = "border border-gray-300 rounded p-2";
const buttonStyle = "bg-blue-500 text-white rounded p-2 w-full";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  weight: string;
  plans: string;
  birthdate: string;
}

export const Form = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<FormData>({
    // npm install -E @hookform/resolvers
    resolver: zodResolver(userScheme),
  });

  const onSubmit = handleSubmit((data) => {
    console.table(data);
    alert("Form submitted");
  });

  return (
    <div className="flex gap-8 justify-center flex-col md:flex-row items-center md:items-start">
      <form
        className="flex flex-col gap-4 w-full max-w-md p-8 rounded-md shadow-md"
        onSubmit={onSubmit}
      >
        <FormItem>
          <label htmlFor="name" className={labelStyle}>
            Name
          </label>
          <input
            type="text"
            id="name"
            className={inputStyle}
            {...register("name")}
          />
          {errors.name && (
            <HelperText>{errors.name.message as string}</HelperText>
          )}
        </FormItem>
        <FormItem>
          <label htmlFor="email" className={labelStyle}>
            Email
          </label>
          <input
            type="email"
            id="email"
            className={inputStyle}
            {...register("email")}
          />
          {errors.email && (
            <HelperText>{errors.email.message as string}</HelperText>
          )}
        </FormItem>
        <FormItem>
          <label htmlFor="password" className={labelStyle}>
            Password
          </label>
          <input
            type="password"
            id="password"
            className={inputStyle}
            {...register("password")}
          />
          {errors.password && (
            <HelperText>{errors.password.message as string}</HelperText>
          )}
        </FormItem>
        <FormItem>
          <label htmlFor="confirmPassword" className={labelStyle}>
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className={inputStyle}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <HelperText>{errors.confirmPassword.message as string}</HelperText>
          )}
        </FormItem>
        <FormItem>
          <label htmlFor="weight" className={labelStyle}>
            Weight
          </label>
          <input
            type="number"
            id="weight"
            className={inputStyle}
            {...register("weight")}
          />
          {errors.weight && (
            <HelperText>{errors.weight.message as string}</HelperText>
          )}
        </FormItem>
        <FormItem>
          <label htmlFor="plans" className={labelStyle}>
            Plans
          </label>
          <select id="plans" className={inputStyle} {...register("plans")}>
            <option value="free">Basic</option>
            <option value="pro">Medium</option>
            <option value="premium">Premium</option>
          </select>
          {errors.plans && (
            <HelperText>{errors.plans.message as string}</HelperText>
          )}
        </FormItem>
        <FormItem>
          <label htmlFor="birthdate" className={labelStyle}>
            Birthdate
          </label>
          <input
            type="date"
            id="birthdate"
            className={inputStyle}
            {...register("birthdate")}
          />
          {errors.birthdate && (
            <HelperText>{errors.birthdate.message as string}</HelperText>
          )}
        </FormItem>
        <div className="flex justify-between gap-2">
          <button type="button" className={buttonStyle} onClick={() => reset()}>
            Reset
          </button>
          <button type="submit" className={buttonStyle}>
            Send
          </button>
        </div>
      </form>
      <div>
        <pre className=" w-full max-w-md p-8 rounded-md shadow-md">
          <code>{JSON.stringify(watch(), undefined, 2)}</code>
        </pre>
      </div>
    </div>
  );
};
