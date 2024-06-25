import React from "react";
import insta from "../../img/insta_logo.jpg";

const SignupComponent = ({
  user,
  inputHandler,
  collectData,
  loading,
  error,
}) => {
  return (
    <form className="container w-25 my-5 registerForm">
      <img
        src={insta}
        className="img-fluid instaHome"
        alt=""
        height={100}
        width={100}
      />
      <h2 className="text-center my-4">Register</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="mb-3">
        <label htmlFor="exampleInputName" className="form-label">
          Name
        </label>
        <input
          value={user.name}
          name="name"
          onChange={inputHandler}
          placeholder="Enter your name"
          type="text"
          className="form-control"
          id="exampleInputName"
          aria-describedby="nameHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          value={user.email}
          name="email"
          onChange={inputHandler}
          placeholder="Enter your email"
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          value={user.password}
          name="password"
          onChange={inputHandler}
          placeholder="Enter your password"
          type="password"
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="imageUpload" className="form-label">
          Upload Image
        </label>
        <input
          onChange={inputHandler}
          name="image"
          accept="image/*"
          type="file"
          className="form-control"
          id="imageUpload"
        />
        <div className="form-text imageFormat">
          Upload an image. Supported formats: JPG, PNG.
        </div>
      </div>

      <button
        onClick={collectData}
        type="button"
        className="btn btn-primary mb-3"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default React.memo(SignupComponent);
