import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import downloadIcon from "../assets/download-svgrepo-com.svg";
import PropTypes from "prop-types";

const DownloadButton = ({ inputData, inputFileName }) => {
  const downloadExcel = (data, fileName = "data.xlsx") => {
    if (!data || data.length === 0) {
      console.warn("No data available to export.");
      return;
    }

    // Convert JSON data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Write the workbook and create a Blob
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Trigger download
    saveAs(blob, fileName);
  };

  return (
    <button
      className="btn btn-success d-flex align-items-center"
      onClick={() => downloadExcel(inputData, inputFileName)}
    >
      <img
        className="me-2"
        src={downloadIcon}
        alt="..."
        width={"16px"}
        style={{ filter: "invert(1)" }}
      />{" "}
      Excel
    </button>
  );
};
DownloadButton.propTypes = {
  inputData: PropTypes.array.isRequired,
  inputFileName: PropTypes.string.isRequired,
};

export default DownloadButton;
