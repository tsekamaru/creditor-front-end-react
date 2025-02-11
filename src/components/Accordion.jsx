const Accordion = ({ authMethod1, authMethod2, authMethod3, authMethod4 }) => {
  return (
    <div>
      <div className="accordion" id="accordionAuth">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button btn btn-danger fw-medium"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Login & Signup via email
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionAuth"
          >
            <div className="accordion-body">{authMethod1}</div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed btn btn-danger fw-medium "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Login via Phone
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionAuth"
          >
            <div className="accordion-body">{authMethod2}</div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed btn btn-danger fw-medium "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Login via Github & Google
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionAuth"
          >
            <div className="accordion-body container-fluid d-flex justify-content-around flex-wrap">
              {authMethod3}
              {authMethod4}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
