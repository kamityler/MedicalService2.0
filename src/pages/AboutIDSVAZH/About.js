import {Component} from 'react'

import './About.css';

class About extends Component{

    render(){
        return(
            <div className="about-container">
                <h2 className="about-heading">About Our Information and Diagnostic System</h2>
                <p className="about-description">Welcome to our innovative Information and Diagnostic System designed for assessing the quality of life. Our system is a comprehensive tool developed to gather, analyze, and interpret data related to various aspects of an individual's well-being.</p>

                <p className="feature-heading">Key Features:</p>
                <ul className="feature-list">
                    <li className="feature-item">Comprehensive Health Assessment: Our system includes advanced diagnostic tools to assess various health parameters, providing a holistic view of an individual's well-being.</li>
                    <li className="feature-item">Personalized Recommendations: Based on the gathered data, our system generates personalized recommendations for improving the overall quality of life, including health and lifestyle suggestions.</li>
                    <li className="feature-item">Data Security: We prioritize the security and privacy of user data, employing state-of-the-art encryption and security measures to ensure confidentiality.</li>
                    <li className="feature-item">User-Friendly Interface: Our intuitive interface makes it easy for users to navigate the system, view their assessments, and access valuable insights about their health and lifestyle choices.</li>
                </ul>

                <p className="about-summary">Our mission is to empower individuals with the knowledge and tools to make informed decisions about their well-being. Whether you are focused on improving your physical health, mental well-being, or overall lifestyle, our Information and Diagnostic System is here to support your journey to a healthier and happier life.</p>
            </div>
        );
    }
}

export default About