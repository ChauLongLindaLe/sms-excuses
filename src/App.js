import { useState } from "react";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';


function App() {

  const [recipientNumber, setRecipientNumber] = useState("");
  const [message, setMessage] = useState("");

   const handleSubmit = async (e) => {
     await e.preventDefault();
       const res = await fetch("http://localhost:4000/api/messages", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           recipientNumber,
           message
         }),
       });
       const data = await res.json();

       if (data.success) {
         await toast.success("Huzzah, message has been successful");
         await setRecipientNumber("");
         await setMessage("");
       } else {
         await toast.error("Whoops try again");
       }
   };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="container-fluid">
          <div className="row no-gutter">
            <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
            <div className="col-md-8 col-lg-6">
              <div className="sms d-flex align-items-center py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-md-9 col-lg-8 mx-auto">
                      <h2 className="title">Twilio Excuse Generator</h2>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="tel"
                            id="phoneNumber"
                            placeholder="Number"
                            name="phoneNumber"
                            maxLength="15"
                            required
                            value={recipientNumber}
                            onChange={(e) => setRecipientNumber(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="form-control"
                            id="smsMessage"
                            placeholder="Message"
                          />
                        </div>
                        <h6>OR let us handle it. Choose a level of excuse</h6>
                        <select
                          className="form-control"
                          id="smsMessage"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        >
                          <option value="1" disabled>
                            Select
                          </option>
                          <option value="Sorry didn't feel like coming">
                            Honest
                          </option>
                          <option value="Sorry I don't actually like you">
                            Too Honest
                          </option>
                          <option value="My refridgerator has gained sentience and is running amok">
                            Fake but believable
                          </option>
                          <option value="New number. Who dis?">Nuclear</option>
                        </select>
                        <button
                          className="btn btn-lg btn-primary btn-block btn-sms text-uppercase font-weight-bold my-4"
                          type="submit"
                        >
                          Message
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          autoClose={8000}
          closeOnClick
          transition={Zoom}
          draggable={false}
        />
      </div>
    </div>
  );
}

export default App;
