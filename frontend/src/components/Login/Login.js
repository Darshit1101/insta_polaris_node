import React from "react";
import {
  FormLayout,
  TextField,
  Button,
  InlineError,
  Text,
  Box,
  InlineStack,
  Card,
} from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginComponent = ({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  loading,
  error,
}) => {
  const navigate = useNavigate();
  return (
    <InlineStack align="center">
      <Box minWidth="27%" paddingBlockStart="2400">
        <Card>
          <FormLayout>
            <InlineStack align="center">
              <Text variant="heading2xl" as="h3">
                Login Form
              </Text>
            </InlineStack>
            <Box padding="200">
              <TextField
                value={email}
                onChange={setEmail}
                label="Email address"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
              />
            </Box>
            <Box padding="200">
              <TextField
                value={password}
                onChange={setPassword}
                label="Password"
                type="password"
                placeholder="Enter your password"
              />
            </Box>
            <Box padding="100">
              <Link to="/change-password">Change Password</Link>
            </Box>

            <Button size="large" onClick={handleLogin} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            <Button onClick={() => navigate("/")}>Register</Button>
            {error && <InlineError message={error} />}
          </FormLayout>
        </Card>
      </Box>
    </InlineStack>
  );
};

export default LoginComponent;
