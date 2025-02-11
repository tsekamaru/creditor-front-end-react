import Hero from "../../assets/Fintech.jpg";

const HomePage = () => {
  return (
    <div className="container-fluid bg-secondary-subtle" id="homePage">
      <div className="row py-5">
        <div className="col-md-6">
          <img
            className="img-fluid"
            src={Hero}
            alt=""
            style={{ objectFit: "cover", width: "100%" }}
          />
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center flex-column pt-5">
          <h1 className="fw-bold">Can you make the perfect finance?</h1>
          <p className="fw-medium">
            Creditor is the most innovative and digitalized way to finance the micro-loaning.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
