import {
  Anchor,
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
import logo from "../assets/mock logo.avif";

export const Login = () => {
  return (
    <div className={classes.container}>
      <Container size={420} className={classes.container__inner}>
        <Paper withBorder p={22} className={classes.form_container}>
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
            label="Email"
            placeholder="you@gmail.com"
            mt={"xl"}
          />
          <PasswordInput
            size="sm"
            label="Password"
            placeholder="Your password"
            mt="md"
          />
          <Button fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
