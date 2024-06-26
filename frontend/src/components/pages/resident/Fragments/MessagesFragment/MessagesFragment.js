import './MessagesFragment.css';
import { FiSend} from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';
import { RiUserFill} from 'react-icons/ri';
import { FiSearch } from 'react-icons/fi';
import company_logo from "../../../company_logo.png";

function MessagesFragment() {

    const placeholderProfile = Array.from({ length: 10}, (_, index) => ({
        id: index + 1,
        name: `Caregiver ${index + 1}`,
        icon: <RiUserFill style={{ fontSize: '15px', color: 'black' }} />,
        chatSnippet: 'Always happy to help...', 
    }));


    //store messages
    const [messages, setMessages] = useState([]);
    // store current message
    const [currentMessage, setCurrentMessage] = useState('');

    const chatEndRef = useRef(null);
    //automatically scrolls to the current message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView();
    }, [messages]);


    // Function to handle sending messages
    const sendMessage = () => {
        if (currentMessage.trim() !== '') {
        // Add current message to messages array
        setMessages(prevMessages => [...prevMessages, currentMessage]);
        // Clear input field after sending message
        setCurrentMessage('');
        }
    };

    

    return (
        
        <div className="message-container">
            <div className ="heading">
                <h1>Chat With</h1>
                <h3>a Caregiver</h3>

                <div className="search-container">
                        <input type="text" placeholder="Search..." className="search-input" />
                        <button className="search-button">
                            <FiSearch className="search-button-icon" />
                        </button>
                </div>

                <div className="profiles-list">
                    {placeholderProfile.map(profile => (
                        <div key={profile.id} className="profile-instance">
                            <div className="profile-detail">
                                <div className="profile-icon">{profile.icon}</div>
                                <div className="profile-details">
                                    <p className="prof-name">{profile.name}</p>
                                    <p className="chat-snippet">{profile.chatSnippet}</p>
                                 </div>
                            </div>
                        </div>
                        ))}
                    </div>
            </div>

            <div className="chat-space">
                <img src={company_logo} alt="company logo" className="logo-style" />
                {/* Display messages */}
                {messages.map((message, index) => (
                    <div key={index} className="sent-message">
                    <span className="you-text">You</span> 
                    <span className="message-text">{message}</span>
                </div>
                ))}

                 <div  ref={chatEndRef}></div>
            </div>

            <div className="message-input-container">
                <textarea
                placeholder="Type your message..."
                value={currentMessage}
                onChange={e => setCurrentMessage(e.target.value)}
                />   
            </div>

            <button className="send-button" onClick={sendMessage}>
                <FiSend />
                </button> 

        </div>
        
    );
}

export default MessagesFragment;

