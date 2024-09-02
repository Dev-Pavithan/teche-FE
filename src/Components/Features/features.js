import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './features.css';
import CentralImage from './center3d modal.png';
import package1 from './chat.jpeg';
import package2 from './chat+voice.jpeg';
import package3 from './3dmodal.jpeg';
import package4 from './allpackage.jpeg';

export default function Features() {
    const navigate = useNavigate(); 
    const handleDemoClick = () => {
        navigate('/login'); 
    };

    return (
        <div>
            <div className="container mt-5">
                {/* Header Section */}
                <div className="row text-center mb-5">
                    <h1 className="display-4">Unlock the Full Potential of Tech-E</h1>
                    <p className="lead">Unveil the smart tools that bring your Tech-E experience to life.</p>
                </div>

                {/* Features Section */}
                <div className="row align-items-center">
                    <div className="col-md-4 col-12 feature-section">
                        <div className="feature-container">
                            <div className="feature-icon mb-2">🧠💬</div>
                            <h5>Natural Language Processing (NLP)</h5>
                            <p>Seamlessly understand and interact with the chatbot as it comprehends and processes your natural language inputs, providing relevant and accurate responses.</p>
                        </div>
                        <div className="feature-container">
                            <div className="feature-icon mb-2">❤️👫</div>
                            <h5>Companionship</h5>
                            <p>Experience genuine, human-like interactions with a chatbot that offers companionship and emotional support, reducing loneliness and fostering a sense of connection.</p>
                        </div>
                        <div className="feature-container">
                            <div className="feature-icon mb-2">🤖💼</div>
                            <h5>Personal Assisting</h5>
                            <p>Benefit from personalized assistance with tasks, reminders, and information management, tailored to meet your unique needs and preferences.</p>
                        </div>
                    </div>

                    <div className="col-md-4 col-12 text-center mb-4">
                        <img alt="Central Image" src={CentralImage} className="centered-image" />
                    </div>

                    <div className="col-md-4 col-12 feature-section">
                        <div className="feature-container">
                            <div className="feature-icon mb-2">🔤🔊</div>
                            <h5>Text to Speech</h5>
                            <p>Enjoy a more interactive experience with the chatbot’s ability to convert text into natural-sounding speech, enhancing accessibility and user engagement.</p>
                        </div>
                        <div className="feature-container">
                            <div className="feature-icon mb-2">🤖</div>
                            <h5>AI Model</h5>
                            <p>Interact with a powerful AI model that leverages advanced algorithms to understand and respond to your needs with precision.</p>
                        </div>
                        <div className="feature-container">
                            <div className="feature-icon mb-2">👁️</div>
                            <h5>Visuality</h5>
                            <p>Connect with people who share your interests in Viber Communities.</p>
                        </div>
                    </div>
                </div>
            </div>

            <section>
                <div className="container mt-5">
                    <div className="row mb-4">
                        <div className="demo col-12">
                            <div className="demo p-3 text-center">
                                <button className="custom-btn" onClick={handleDemoClick}>Demo</button>
                            </div>
                        </div>
                    </div>

                    {/* Custom Cards */}
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                        <div className="col">
                            <div className="custom-card h-100">
                                <img alt="General Package" className="card-img-top" src={package1} />
                                <div className="card-body text-center">
                                    <h5>General Package</h5>
                                    <p>NLP + Companionship</p>
                                    <button className="custom-button">Free</button>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="custom-card h-100">
                                <img alt="Visual Package" className="card-img-top" src={package2} />
                                <div className="card-body text-center">
                                    <h5>Visual Package</h5>
                                    <p>General package + Visuality</p>
                                    <button className="custom-button">Premium</button>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="custom-card h-100">
                                <img alt="Voice Package" className="card-img-top" src={package3} />
                                <div className="card-body text-center">
                                    <h5>Voice Package</h5>
                                    <p>General package + Voice</p>
                                    <button className="custom-button">Premium</button>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="custom-card h-100">
                                <img alt="Premium Package" className="card-img-top" src={package4} />
                                <div className="card-body text-center">
                                    <h5>Premium Package</h5>
                                    <p>General package + Visuality + Voice</p>
                                    <button className="custom-button">Premium</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
