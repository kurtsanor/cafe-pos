import {
  Button,
  Center,
  Container,
  Image,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "../styles/Login.module.css";
import logo from "../assets/fluxposlogo.avif";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth.api";
import type { ApiResponse } from "../types/response/apiResponse";
import type { LoginRequest, LoginResponse } from "../types/auth/auth";
import { useForm } from "@mantine/form";
import { setAccessToken } from "../store/auth.store";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation<
    ApiResponse<LoginResponse>,
    Error,
    LoginRequest
  >({
    mutationFn: login,
    onSuccess: (response) => {
      if (!response.data) {
        return;
      }
      setAccessToken(response.data?.accessToken);
      navigate("/dashboard");
    },
    onError(error: any) {
      notifications.show({
        color: "red",
        icon: <IconX />,
        message: error.response.data.message,
        position: "bottom-left",
      });
    },
  });

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (val) => (val ? null : "This field is required"),
      password: (val) => (val ? null : "This field is required"),
    },
  });

  const handleLogin = () => {
    loginMutation.mutate(form.values);
  };

  return (
    <form className={classes.container} onSubmit={form.onSubmit(handleLogin)}>
      <Container size={420} className={classes.container__inner}>
        <Paper shadow="xs" withBorder p={22} className={classes.form_container}>
          <Center>
            <Image
              src={logo}
              fit="cover"
              h={70}
              w={70}
              className={classes.logo}
            />
          </Center>

          <Title ta="center" className={classes.title}>
            Welcome back!
          </Title>

          <Text className={classes.subtitle} ta={"center"}>
            Smart POS. Smarter business.
          </Text>

          <TextInput
            size="sm"
            label="Username"
            placeholder="john.doe"
            mt={"xl"}
            {...form.getInputProps("username")}
            disabled={loginMutation.isPending}
          />
          <PasswordInput
            size="sm"
            label="Password"
            placeholder="Your password"
            mt="xs"
            {...form.getInputProps("password")}
            disabled={loginMutation.isPending}
          />
          <Button
            fullWidth
            mt="md"
            loading={loginMutation.isPending}
            type="submit"
          >
            Sign in
          </Button>
        </Paper>
      </Container>
    </form>
  );
};

export default Login;
