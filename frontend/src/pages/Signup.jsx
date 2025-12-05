import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const name = useField("text");  
  const username = useField("text");
  const password = useField("password");
  const phone_number = useField("text");
  const gender = useField("text");
  const date_of_birth = useField("date");
  const street = useField("text");
  const city = useField("text");
  const zipcode = useField("text");

  const { signup, error } = useSignup("/api/users/signup");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await signup({
      name: name.value,
      username: username.value,
      password: password.value,
      phone_number: phone_number.value,
      gender: gender.value,
      date_of_birth: date_of_birth.value,
      address: {
        street: street.value,
        city: city.value,
        zipCode: zipcode.value,
      },
    });
    if (!error) {
      console.log("success");
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input {...name} />
        <label>Username:</label>
        <input {...username} />
        <label>Password:</label>
        <input {...password} />
        <label>Phone Number:</label>
        <input {...phone_number} />
        <label>Gender:</label>
        <input {...gender} />
        <label>Date of Birth:</label>
        <input {...date_of_birth} />
        <label>Street:</label>
        <input {...street} />
        <label>City:</label>
        <input {...city} />
        <label>Zipcode:</label>
        <input {...zipcode} />
        <button>Sign up</button>
      </form>
    </div>
  );
};

export default Signup;