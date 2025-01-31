const AddLoanTab = () => {
  return (
    <div>
      <h1>Add Loan</h1>
      <form>
        <label>
          Loan Amount:
          <input type="number" name="amount" />
        </label>
        <br />
        <label>
          Interest Rate:
          <input type="number" name="interestRate" />
        </label>
        <br />
        <label>
          Loan Term (years):
          <input type="number" name="term" />
        </label>
        <br />
        <button type="submit">Add Loan</button>
      </form>
    </div>
  );
};

export default AddLoanTab;
