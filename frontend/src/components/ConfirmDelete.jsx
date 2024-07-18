import { useCalContext } from "../utils/ContextProvider";

const ConfirmDelete = () => {
  //  Get states from the context:
  const {
    setCalendars,
    baseUrl,
    currentCalendar,
    setCurrentCalendar,
    setShowConfirmation,
  } = useCalContext();

  // Delete a calendar:
  const deleteCalendar = async (cal) => {
    const res = await fetch(`${baseUrl}/calendars/${cal._id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();

    if (currentCalendar && currentCalendar._id === cal._id) {
      setCurrentCalendar(null);
    }
    setCalendars(data.calendars);
    setShowConfirmation(false);
  };

  return (
    <div className="modal">
      <div className="modalInner coloredModal">
        <p>
          Are you sure you want to delete this calendar with all its events?
        </p>
        <button
          className="standardButton coloredButton"
          onClick={() => deleteCalendar(currentCalendar)}
        >
          Yes
        </button>
        <button
          className="standardButton coloredButton"
          onClick={() => setShowConfirmation(false)}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
