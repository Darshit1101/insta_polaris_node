import React from "react";
import {
  Text,
  FormLayout,
  TextField,
  Button,
  InlineError,
  InlineStack,
  Card,
  Box,
} from "@shopify/polaris";
import { useNavigate } from "react-router-dom";

const SignupComponent = ({
  user,
  inputHandler,
  collectData,
  loading,
  error,
}) => {
  const navigate = useNavigate();

  return (
    <InlineStack align="center">
      <Box paddingBlockStart="1000">
        <Card>
          <FormLayout>
            <InlineStack align="center">
              <Text variant="heading2xl" as="h3">
                Register Form
              </Text>
            </InlineStack>
            {error && <InlineError message={error} />}
            <Box padding="200">
              <TextField
                value={user.name}
                onChange={(value) => inputHandler(value, "name")}
                label="Name"
                placeholder="Enter your name"
              />
            </Box>
            <Box padding="200">
              <TextField
                value={user.email}
                onChange={(value) => inputHandler(value, "email")}
                label="Email address"
                type="email"
                placeholder="Enter your email"
              />
            </Box>
            <Box padding="200">
              {" "}
              <TextField
                value={user.password}
                onChange={(value) => inputHandler(value, "password")}
                label="Password"
                type="password"
                placeholder="Enter your password"
              />
            </Box>

            <Box padding="200">
              <div variant="headingMd" as="h6">
                Upload Image
              </div>
              <input
                onChange={(e) => inputHandler(e.target.files[0], "image")}
                accept="image/*"
                type="file"
                className="form-control"
                id="imageUpload"
              />

              <Text variant="headingSm" as="h6">
                Upload an image. Supported formats: JPG, PNG.
              </Text>
            </Box>
            <Box padding="200">
              <Button size="large" onClick={collectData} disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </Button>

              <Button onClick={() => navigate("/login")}>Login</Button>
            </Box>
          </FormLayout>
        </Card>
      </Box>
    </InlineStack>
  );
};

export default SignupComponent;
