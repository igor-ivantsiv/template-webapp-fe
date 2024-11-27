import errorImage from "../assets/404.png";

interface ErrorPageProps {}

const ErrorPage = ({}: ErrorPageProps) => {
  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <img style={{ width: "600px" }} src={errorImage} alt="404" />
      </div>
    </>
  );
};

export default ErrorPage;
