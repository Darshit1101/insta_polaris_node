import React from "react";
import {
  FormLayout,
  TextField,
  Button,
  Text,
  InlineStack,
  Card,
  InlineError,
  Box,
} from "@shopify/polaris";

const UpdateProfile = ({
  name,
  setName,
  email,
  setEmail,
  photo,
  setPhoto,
  handleUpdate,
  loading,
  error,
}) => {
  return (
    <InlineStack align="center">
      <Box paddingBlockStart="2400">
        <Card>
          <FormLayout>
            <InlineStack align="center">
              <Text variant="heading2xl" as="h3">
                Update Profile
              </Text>
            </InlineStack>
            <TextField
              value={name}
              onChange={(value) => setName(value)}
              label="Name"
              type="text"
              placeholder="Enter your name"
            />
            <TextField
              value={email}
              onChange={(value) => setEmail(value)}
              label="Email address"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
            />
            <div className="Polaris-FormLayout__Item">
              <label className="Polaris-Label">
                <span className="Polaris-Label__Text">Upload Image</span>
              </label>
              <input
                onChange={(e) => setPhoto(e.target.files[0])}
                name="Photo"
                accept="image/*"
                type="file"
                className="Polaris-TextField__Input"
              />
              <div className="Polaris-FormLayout__HelpText">
                Upload an image. Supported formats: JPG, PNG.
              </div>
            </div>
            <Button onClick={handleUpdate} disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </Button>
            {error && <InlineError message={error} />}
          </FormLayout>
        </Card>
      </Box>
    </InlineStack>
  );
};

export default UpdateProfile;
