import React from "react";
// import "./UploadPost.css";
import {
  Text,
  TextField,
  InlineStack,
  Button,
  Box,
  Card,
} from "@shopify/polaris";

const UploadPostComponent = ({
  body,
  setBody,
  setImage,
  handleSubmit,
  loading,
  error,
}) => {
  return (
    <InlineStack align="center">
      <Box paddingBlockStart="2400">
        <Card>
          <InlineStack align="center">
            <Text variant="headingXl" as="h4">
              Create New Post
            </Text>
          </InlineStack>
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          <form>
            <div className="form-group">
              <Box padding={300}>
                <Text variant="headingMd" as="h6">
                  Caption:
                </Text>
                <TextField
                  value={body}
                  onChange={setBody}
                  className="btn btn-light"
                  id="caption"
                  name="caption"
                  placeholder="Write a caption..."
                ></TextField>
              </Box>
            </div>
            <div className="form-group">
              <Box padding={300}>
                <Text variant="headingMd" as="h6">
                  Select Image:
                </Text>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                />
              </Box>
            </div>

            <Box padding={300}>
              <Button onClick={handleSubmit} size="large">
                Share
              </Button>
            </Box>
          </form>
        </Card>
      </Box>
    </InlineStack>
  );
};

export default UploadPostComponent;
