
import { Field, Input, Card, Button, Stack, Text } from "@chakra-ui/react"
import { PasswordInput } from "./ui/password-input"
import { useUserContext } from "@/context/UserContext"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
export default function Form() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const { login, isLoading } = useUserContext();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            const res = await login(data);
            console.log(res)
            if (res.detail) {
                setError("formError", {
                    type: "manual",
                    message: res.detail
                });
            }
            if (res.access && res.refresh) {
                navigate('/dashboard');
            }
        } catch (err) {
            console.log("May be error in network");
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card.Root>
                <Card.Header>
                    <Card.Title>Login</Card.Title>
                    <Card.Description>
                        Login with your credientials
                    </Card.Description>
                </Card.Header>
                <Card.Body>
                    {errors.formError && <Text color="red.500">{errors.formError.message}</Text>}
                    <Stack gap="4" w="full">
                        <Field.Root invalid={!!errors.username}>
                            <Field.Label>Username</Field.Label>
                            <Input type="text" {...register('username', { required: "This field is requred" })} />
                            {errors.username && <Field.ErrorText>{errors.username.message}</Field.ErrorText>}
                        </Field.Root>
                        <Field.Root invalid={!!errors.password}>
                            <Field.Label>Password</Field.Label>
                            <PasswordInput {...register('password', { required: "This field is requred" })} />
                            {errors.password && <Field.ErrorText>{errors.password.message}</Field.ErrorText>}
                        </Field.Root>
                    </Stack>
                </Card.Body>
                <Card.Footer justifyContent="flex-end">
                    <Button variant="outline">Cancel</Button>
                    <Button variant="solid" type="submit" loading={isLoading} loadingText="Wait..." spinnerPlacement="start">Login</Button>
                </Card.Footer>
            </Card.Root>
        </form>
    )
}