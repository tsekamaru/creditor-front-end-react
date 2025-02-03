import { toast } from "react-toastify";

const errorHandler = (error) => {
  console.error("Error details:", error); // More detailed logging

  if (!error.response) {
    // No response received (e.g., Network error, CORS issue, Server down)
    toast.error("Network error. Please check your connection and try again.");
  } else {
    const { status, data } = error.response;

    switch (status) {
      case 400:
        toast.error(data.message || "Invalid request. Please check your input.");
        break;
      case 401:
        toast.error("Unauthorized. Please log in again.");
        break;
      case 403:
        toast.error("Forbidden. You don't have permission to access this resource.");
        break;
      case 404:
        toast.error(data.message || "Requested resource not found.");
        break;
      case 408:
        toast.error("Request timeout. Please try again.");
        break;
      case 409:
        toast.error("Conflict error. This may be due to duplicate data.");
        break;
      case 413:
        toast.error("Payload too large. Try uploading a smaller file.");
        break;
      case 415:
        toast.error("Unsupported media type. Check the file format.");
        break;
      case 422:
        toast.error("Unprocessable request. Some fields may be invalid.");
        break;
      case 429:
        toast.error("Too many requests. Please slow down and try again later.");
        break;
      case 500:
        toast.error("Internal server error. Please try again later.");
        break;
      case 502:
        toast.error("Bad gateway. The server received an invalid response.");
        break;
      case 503:
        toast.error("Service unavailable. The server is currently down.");
        break;
      case 504:
        toast.error("Gateway timeout. The server took too long to respond.");
        break;
      default:
        toast.error(data.message || "An unexpected error occurred. Please try again.");
        break;
    }
  }
};

export default errorHandler;
