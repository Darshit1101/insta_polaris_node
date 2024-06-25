// // src/components/ChangePassword/ChangePasswordComponent.js
// import React from "react";

// const Password = ({
//   email,
//   setEmail,
//   oldPassword,
//   setOldPassword,
//   newPassword,
//   setNewPassword,
//   handleChangePassword,
//   loading,
//   message,
//   error,
// }) => {
//   return (
//     <div>
//       <form
//         className="container w-25 my-5 registerForm"
//         onSubmit={handleChangePassword}
//       >
//         <h2 className="text-center my-4">Change Password</h2>
//         <div className="mb-3">
//           <label htmlFor="exampleInputEmail1" className="form-label">
//             Email address
//           </label>
//           <input
//             type="email"
//             className="form-control"
//             id="exampleInputEmail1"
//             aria-describedby="emailHelp"
//             value={email}
//             placeholder="Enter your email"
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="oldPassword" className="form-label">
//             Old Password
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             id="oldPassword"
//             placeholder="Enter your old password"
//             value={oldPassword}
//             onChange={(e) => setOldPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="newPassword" className="form-label">
//             New Password
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             id="newPassword"
//             placeholder="Enter your new password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="btn btn-primary my-4"
//           disabled={loading}
//         >
//           {loading ? "Submitting..." : "Submit"}
//         </button>
//         {message && <p className="mt-3">{message}</p>}
//         {error && <p className="mt-3 text-danger">{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default Password;

import React from "react";
import {
  FormLayout,
  TextField,
  Button,
  InlineError,
  Text,
  InlineStack,
  Card,
} from "@shopify/polaris";

const ChangePasswordComponent = ({
  email,
  setEmail,
  oldPassword,
  setOldPassword,
  newPassword,
  setNewPassword,
  handleChangePassword,
  loading,
  message,
  error,
}) => {
  return (
    <InlineStack align="center">
      <Card>
        <FormLayout>
          <InlineStack align="center">
            <Text variant="heading2xl" as="h3">
              Change Password
            </Text>
          </InlineStack>
          <TextField
            value={email}
            onChange={setEmail}
            label="Email address"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
          />
          <TextField
            value={oldPassword}
            onChange={setOldPassword}
            label="Old Password"
            type="password"
            placeholder="Enter your old password"
          />
          <TextField
            value={newPassword}
            onChange={setNewPassword}
            label="New Password"
            type="password"
            placeholder="Enter your new password"
          />
          <Button
            size="large"
            onClick={handleChangePassword}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
          {message && <Text variant="bodyMd">{message}</Text>}
          {error && <InlineError message={error} />}
        </FormLayout>
      </Card>
    </InlineStack>
  );
};

export default ChangePasswordComponent;
