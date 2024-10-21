import React, { useState } from 'react';

const Chatbot = () => {
  const [chatMessages, setChatMessages] = useState([
    "Chatbot: Ask me any questions regarding Kean University to get started.",
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Predefined responses for Kean University-specific questions
  const predefinedResponses = {
    "where is kean university located": "Kean University is located in Union, New Jersey, USA.",
    "what programs are offered at kean university": "Kean University offers a wide variety of programs, including degrees in Business, Education, Liberal Arts, Sciences, Health, and more.",
    "what is kean university's mascot": "Kean University's mascot is the Cougar.",
    "how do i apply to kean university": "You can apply to Kean University by visiting their official website at https://www.kean.edu/apply and following the application instructions.",
    "what are the tuition fees at kean university": "Tuition fees at Kean University vary based on the program and student status. You can find more details at https://www.kean.edu/tuition-and-fees.",
  };

  // Function to send a message and get a response
  const handleSend = async () => {
    if (inputMessage.trim()) {
      setChatMessages([...chatMessages, `You: ${inputMessage}`]);
      setLoading(true);  // Start showing "Chatbot is typing..."

      const lowerCaseInput = inputMessage.trim().toLowerCase();

      // Delay the chatbot's response by 1.5 seconds (1500 ms)
      setTimeout(() => {
        // Check if the message matches a predefined question
        if (predefinedResponses.hasOwnProperty(lowerCaseInput)) {
          const predefinedResponse = predefinedResponses[lowerCaseInput];
          setChatMessages((prevMessages) => [...prevMessages, `Chatbot: ${predefinedResponse}`]);
        } else {
          setChatMessages((prevMessages) => [
            ...prevMessages,
            "Chatbot: Sorry, I don't have that information. You can visit Kean University's website at https://www.kean.edu for more details.",
          ]);
        }

        setInputMessage(""); // Clear input
        setLoading(false);   // Stop showing "Chatbot is typing..."
      }, 1500);  // 1.5 seconds delay
    }
  };

  return (
    <div>
      {/* Button to toggle chatbot visibility */}
      <button 
        onClick={() => setIsChatbotVisible(!isChatbotVisible)} 
        style={{
          position: 'fixed', 
          bottom: '20px', 
          right: '20px', 
          padding: '10px 20px',
          backgroundColor: '#0288d1', 
          color: '#fff', 
          borderRadius: '5px', 
          border: 'none', 
          cursor: 'pointer'
        }}
      >
        {isChatbotVisible ? 'Hide Chatbot' : 'Show Chatbot'}
      </button>

      {/* Conditional rendering of chatbot */}
      {isChatbotVisible && (
        <div className="chatbot-container" style={{ position: 'fixed', bottom: '20px', right: '20px', width: '300px', backgroundColor: '#fff', border: '2px solid #0288d1', borderRadius: '10px', padding: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          
          {/* Close Chatbot button */}
          <div style={{ textAlign: 'right', marginBottom: '10px' }}>
            <button
              onClick={() => setIsChatbotVisible(false)} // Hide the chatbot when clicked
              style={{
                backgroundColor: '#0288d1',
                color: '#fff',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Close Chatbot
            </button>
          </div>
          
          <div className="chat-window" style={{ maxHeight: '300px', overflowY: 'scroll', backgroundColor: '#e3f2fd', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #81d4fa' }}>
            {chatMessages.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
            {loading && <p>Chatbot is typing...</p>}  {/* Show this message while waiting */}
          </div>
          
          <div className="chat-input" style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask a question..."
              style={{ color: '#000', flexGrow: '1', padding: '10px', borderRadius: '5px', border: 'none' }} // Ensure text is visible
              disabled={loading} // Disable input while waiting for API response
            />
            <button 
              onClick={handleSend} 
              disabled={loading} 
              style={{ padding: '10px', backgroundColor: '#0288d1', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '5px' }}
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
