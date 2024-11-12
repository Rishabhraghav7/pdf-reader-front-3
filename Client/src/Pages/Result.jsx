import React, { useEffect, useRef, useState } from 'react';
import './Result.css';
import axios from 'axios';

const Result = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [userId, setUserId] = useState(Date.now());
    const [numRecords, setNumRecords] = useState('');
    const [isLoading, setIsLoading] = useState(false); // New loading state
    const [expandedMessageIndex, setExpandedMessageIndex] = useState(null); // Track expanded message
    const [secondOutput, setSecondOutput] = useState(''); // State for the second output (sidebar content)
    const [isSidebarVisible, setIsSidebarVisible] = useState(false); // State to control sidebar visibility
    const ws = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket(`ws://localhost:5000/ws/${userId}`);

        const handleMessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, { sender: 'bot', content: event.data }]);
            setIsLoading(false); // Stop loading once message is received
            setSecondOutput(event.data); // Update second output when new message is received
        };

        ws.current.onmessage = handleMessage;
        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            ws.current.onmessage = null; // Clean up the message listener
            ws.current.close();
        };
    }, [userId]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (input.trim()) {
            ws.current.send(input);
            setMessages((prevMessages) => [...prevMessages, { sender: 'user', content: input }]);
            console.log('Sent message', messages);
            setInput('');
            setIsLoading(true); // Start loading after sending a message
        }
    };

    const getPreviousConversation = () => {
        ws.current.send(`get_previous_conversation ${userId} ${numRecords}`);
        setIsLoading(true); // Start loading when fetching previous conversations
    };

    const getAllConversations = () => {
        ws.current.send(`get_all_conversations ${userId}`);
        setIsLoading(true); // Start loading when fetching all conversations
    };

    const toggleSidebar = () => {
        setIsSidebarVisible((prevState) => !prevState); // Toggle sidebar visibility
    };

    return (
        <section style={{ display: "flex" }}>

            <div className="container mt-4 chat-container">
                <form onSubmit={getPreviousConversation}>
                    {/* Additional inputs for conversation retrieval can go here */}
                </form>

                <div className="chat-main">
                    <h1>FastAI ChatBot</h1>

                    <div className="conversation-history">
                        {isLoading ? (
                            <div className="loading-spinner">Loading...</div>
                        ) : (
                            messages.map((msg, index) => (
                                <div key={index} className={`message ${msg.sender}`}>
                                    <strong>{msg.sender === 'user' ? 'You' : 'PDF_QA'}:</strong>
                                    {msg.sender === 'bot' ? (
                                        <div className="message-container">
                                            <div
                                                className={`message-content ${expandedMessageIndex === index ? 'open' : ''}`}
                                                onClick={() => toggleSidebar(index)}
                                            >
                                                {msg.content.substring(0, 100)}{msg.content.length > 100 && '...'} {/* Short preview */}
                                            </div>
                                            {expandedMessageIndex === index && (
                                                <div className="message-sidebar">
                                                    {msg.content} {/* Full message when sidebar is open */}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        msg.content
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    <h2>Chat</h2>
                    <form onSubmit={sendMessage} className="message-form">
                        <input
                            type="text"
                            className="form-control message-input"
                            placeholder="Type your message"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />

                        <button type="submit" className="btn send-button">Send</button>
                        <div className="sidebar-toggle">
                <button onClick={toggleSidebar} className="btn toggle-btn">
                    {isSidebarVisible ? 'Hide Output' : 'Show Output'}
                </button>
            </div>
                    </form>
                </div>
            </div>

            {/* Button to toggle sidebar visibility */}
           

            {/* Sidebar for the second output, only visible when isSidebarVisible is true */}
            {isSidebarVisible && (
                <div className="sidebar">
                    <h2>Second Output</h2>
                    <div className="sidebar-content">
                        {secondOutput && secondOutput}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Result;
