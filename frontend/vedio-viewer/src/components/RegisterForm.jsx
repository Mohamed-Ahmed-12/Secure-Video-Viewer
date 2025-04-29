
import { Field, Input, Card, Button, Stack } from "@chakra-ui/react"
import { PasswordInput } from "./ui/password-input"
import { useUserContext } from "@/context/UserContext"
import { useForm } from "react-hook-form";
export default function Form() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const { isLoading, createUser } = useUserContext();
    const onSubmit = async (data) => {
        try {
            const res = await createUser(data);
            console.log(res)
            if (res.errors) {
                Object.keys(res.errors).forEach(field => {
                    // Set the error for each field returned from the backend
                    setError(field, {
                        type: "manual",
                        message: res.errors[field][0]
                    });
                });
            }
        } catch (error) {
            console.error("An error occurred during submission:", error);
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card.Root>
                <Card.Header>
                    <Card.Title>Register</Card.Title>
                    <Card.Description>
                        Fill in the form below to create an account
                    </Card.Description>
                </Card.Header>
                <Card.Body>
                    <Stack gap="4" w="full">
                        {errors?.username?.message}
                        <Field.Root invalid={!!errors.username}>
                            <Field.Label>Username</Field.Label>
                            <Input
                                type="text"
                                {...register("username", { required: "This field is required" })}
                            />
                            {errors.username && <Field.ErrorText>{errors.username.message}</Field.ErrorText>}
                        </Field.Root>
                        <Field.Root invalid={!!errors.email}>
                            <Field.Label>Email</Field.Label>
                            <Input type="email" {...register("email", { required: "This field is required" })} />
                            {errors.email && <Field.ErrorText>{errors.email.message}</Field.ErrorText>}
                        </Field.Root>
                        <Field.Root invalid={!!errors.password}>
                            <Field.Label>Password</Field.Label>
                            <PasswordInput {...register("password", { required: "This field is required" ,minLength: { value: 8, message: "Password must be at least 8 characters" }})} />
                            {errors.password && <Field.ErrorText>{errors.password.message}</Field.ErrorText>}
                        </Field.Root>
                    </Stack>
                </Card.Body>
                <Card.Footer justifyContent="flex-end">
                    <Button variant="outline">Cancel</Button>
                    <Button variant="solid" type="submit" loading={isLoading} loadingText="Wait..." spinnerPlacement="start">Register</Button>
                </Card.Footer>
            </Card.Root>
        </form>


    )
}