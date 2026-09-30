import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    aadharName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    permanentAddress: "",
    currentAddress: "",
    city: "",
    state: "",
    photo: null
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm({
      ...form,
      [name]: files ? files[0] : value
    });
  };

  const handleSameAddress = (e) => {
    if (e.target.checked) {
      setForm({
        ...form,
        currentAddress: form.permanentAddress
      });
    } else {
      setForm({
        ...form,
        currentAddress: ""
      });
    }
  };

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.aadharName.trim()) {
      newErrors.aadharName = "Aadhaar name is required";
    } else if (
      form.name.trim().toLowerCase() !==
      form.aadharName.trim().toLowerCase()
    ) {
      newErrors.aadharName = "Name and Aadhaar name must be the same";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!form.dob) {
      newErrors.dob = "Date of birth is required";
    }

    if (!form.gender) {
      newErrors.gender = "Select your gender";
    }

    if (!form.permanentAddress.trim()) {
      newErrors.permanentAddress = "Permanent address is required";
    }

    if (!form.currentAddress.trim()) {
      newErrors.currentAddress = "Current address is required";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!form.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!form.photo) {
      newErrors.photo = "Photo is required";
    } else {
      if (!["image/jpeg", "image/png"].includes(form.photo.type)) {
        newErrors.photo = "Only JPG and PNG images are allowed";
      }

      if (form.photo.size > 2 * 1024 * 1024) {
        newErrors.photo = "Photo must be less than 2 MB";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      alert("Form submitted successfully!");
    }
  };

  const handleClear = () => {
    setForm({
      name: "",
      aadharName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      dob: "",
      gender: "",
      permanentAddress: "",
      currentAddress: "",
      city: "",
      state: "",
      photo: null
    });

    setErrors({});
    document.getElementById("photo").value = "";
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Registration Form</h1>

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <p>{errors.name}</p>

        <label>Aadhaar Name</label>
        <input
          type="text"
          name="aadharName"
          value={form.aadharName}
          onChange={handleChange}
        />
        <p>{errors.aadharName}</p>

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <p>{errors.email}</p>

        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          maxLength="10"
          value={form.phone}
          onChange={handleChange}
        />
        <p>{errors.phone}</p>

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <p>{errors.password}</p>

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <p>{errors.confirmPassword}</p>

        <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
        />
        <p>{errors.dob}</p>

        <label>Gender</label>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <p>{errors.gender}</p>

        <label>Permanent Address</label>
        <textarea
          name="permanentAddress"
          value={form.permanentAddress}
          onChange={handleChange}
        />
        <p>{errors.permanentAddress}</p>

        <label>
          <input
            type="checkbox"
            onChange={handleSameAddress}
          />
          Current address same as permanent address
        </label>

        <label>Current Address</label>
        <textarea
          name="currentAddress"
          value={form.currentAddress}
          onChange={handleChange}
        />
        <p>{errors.currentAddress}</p>

        <label>City</label>
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
        />
        <p>{errors.city}</p>

        <label>State</label>
        <input
          type="text"
          name="state"
          value={form.state}
          onChange={handleChange}
        />
        <p>{errors.state}</p>

        <label>Photo</label>
        <input
          id="photo"
          type="file"
          name="photo"
          accept=".jpg,.jpeg,.png"
          onChange={handleChange}
        />
        <small>JPG/PNG only, maximum size: 2 MB</small>
        <p>{errors.photo}</p>

        <div className="buttons">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;