import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function Profile() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Navbar style />
      <Header type="list" />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            {user.img ? (
              <img
                src={user.img}
                alt="User's Profile"
                className="img-fluid rounded-circle"
              />
            ) : (
              <div className="placeholder">No Image</div>
            )}
          </div>
          <div className="col-md-8">
            <div className="resume-details">
              <h2 className="mb-4">{user.username}</h2>
              <p className="mb-2">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="mb-2">
                <strong>Country:</strong> {user.country}
              </p>
              <p className="mb-2">
                <strong>City:</strong> {user.city}
              </p>
              <p className="mb-2">
                <strong>Phone:</strong> {user.phone}
              </p>
              <p className="mb-2">
                <strong>Join Date:</strong>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
