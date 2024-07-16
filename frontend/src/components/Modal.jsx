import { useCalContext } from "../utils/ContextProvider";
import deleteIcon from "../assets/deleteIcon.svg";

const Modal = () => {
  const {
    setShowModal,
    errorMessage,
    setErrorMessage,
    setToggleUpdate,
    baseUrl,
    currentCalendar,
    setCurrentCalendar,
    currentEvent,
    setCurrentEvent,
    modalType,
  } = useCalContext();

  const changeInput = (e) => {
    setCurrentEvent({ ...currentEvent, [e.target.name]: e.target.value });
  };

  const resetModal = () => {
    setCurrentEvent({
      title: "",
      start: "",
      startTime: "",
      end: "",
      endTime: "",
    });
    setShowModal(false);
  };

  const sendEventData = (e) => {
    e.preventDefault();

    const start = new Date(
      `${currentEvent.start}${
        currentEvent.startTime ? `T${currentEvent.startTime}` : ``
      }`
    );
    const end = new Date(
      `${currentEvent.end}${
        currentEvent.endTime ? `T${currentEvent.endTime}` : ``
      }`
    );
    const fetchEvent = async () => {
      const dataRaw = await fetch(
        `${baseUrl}/api/calendars/${currentCalendar._id}/events${
          modalType === "update" ? `/${currentEvent._id}` : ``
        }`,
        {
          method: `${modalType === "create" ? "POST" : "PATCH"}`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: currentEvent.title,
            start,
            end,
            calendarId: currentCalendar._id,
          }),
          credentials: "include",
        }
      );
      const data = await dataRaw.json();

      if (!data) {
        setErrorMessage(data.error);
      }
      setCurrentCalendar(data);

      setToggleUpdate((prev) => !prev);
      return data;
    };
    fetchEvent();
    resetModal();
  };

  const deleteEvent = async () => {
    const dataRaw = await fetch(
      `${baseUrl}/api/calendars/${currentCalendar._id}/events/${currentEvent._id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const data = await dataRaw.json();
    if (!data) {
      setErrorMessage(data.error);
    }
    setToggleUpdate((prev) => !prev);
    resetModal();
  };

  return (
    <div className="modal">
      <form className="modalInner" onSubmit={(e) => sendEventData(e)}>
        {currentEvent._id && (
          <button className="editButton" onClick={deleteEvent}>
            <img src={deleteIcon} alt="Delete icon" />
          </button>
        )}
        <h3>{modalType === "create" ? "New event" : "Edit event"}</h3>
        <label htmlFor="title" className="labelBold">
          Title{" "}
        </label>
        <input
          type="text"
          value={currentEvent.title}
          name="title"
          id="title"
          onChange={(e) => changeInput(e)}
          required
          placeholder="Meeting with..."
        />
        <label htmlFor="start" className="labelBold">
          Start{" "}
        </label>
        <input
          type="date"
          name="start"
          id="start"
          value={currentEvent.start}
          onChange={(e) => changeInput(e)}
          required
        />
        <label
          htmlFor="startTime"
          className={currentEvent.startTime ? "labelBold" : ""}
        >
          Time (optional)
        </label>
        <input
          type="text"
          pattern="(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]"
          placeholder="13:00"
          name="startTime"
          id="startTime"
          value={currentEvent.startTime}
          onChange={(e) => changeInput(e)}
        />
        <label htmlFor="end" className="labelBold">
          End{" "}
        </label>
        <input
          type="date"
          name="end"
          id="end"
          value={currentEvent.end}
          onChange={(e) => changeInput(e)}
          required
        />
        <label
          htmlFor="endTime"
          className={currentEvent.endTime ? "labelBold" : ""}
        >
          Time (optional){" "}
        </label>
        <input
          type="text"
          pattern="(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]"
          placeholder="15:00"
          name="endTime"
          id="endTime"
          value={currentEvent.endTime}
          onChange={(e) => changeInput(e)}
        />

        <button type="submit" className="standardButton submitButton">
          {modalType === "create" ? "Create" : "Update"}
        </button>
        <button type="text" className="standardButton" onClick={resetModal}>
          Close
        </button>
      </form>
    </div>
  );
};

export default Modal;
