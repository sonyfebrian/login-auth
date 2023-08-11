import PropTypes from "prop-types";

const Home = ({ userProfile }) => {
  console.log(userProfile, "home");
  return (
    <div>
      <div>
        <h3>User Profile</h3>

        <p>Email: {userProfile.email}</p>
        <p>Full Name: {userProfile.fullName}</p>
        {/* Render other profile data */}
        {/* Render other profile data */}
      </div>
    </div>
  );
};

Home.propTypes = {
  userProfile: PropTypes.func.isRequired, // Ensure setUserProfile is a required function prop
};
export default Home;
