import './Main.css';
import axios from 'axios';



function MainPage() {
  

  return (
    
    <div className="main-page">
      <div className='news-contsiner'>
        <article className='article-container'>
          <h2>Advancing Medical Expertise: New Continuing Education Courses Empower Physicians</h2>
          <p>In a dynamic era of healthcare, continuous learning is paramount for medical professionals to stay abreast of advancements and deliver optimal patient care. Recognizing this need, a comprehensive set of continuing education courses tailored for physicians has been introduced, aiming to enhance their skills and knowledge.</p>
          <p>These specialized courses cover a wide array of medical disciplines, ranging from cutting-edge treatment modalities to the latest technological innovations in healthcare. Participants have the opportunity to delve into interactive sessions, workshops, and hands-on training, fostering a collaborative environment conducive to skill development.</p>
          <p>As the field of medicine continues to evolve, investing in continuous education becomes imperative. These advanced courses not only empower physicians with the latest knowledge and skills but also contribute to a collaborative and forward-thinking medical community. By embracing lifelong learning, healthcare professionals are better positioned to navigate the complexities of modern medicine and, ultimately, provide superior care to their patients.</p>
        </article>
          
        <article className='article-container'>
          <h2>Specialized courses cover a wide array of medical disciplines</h2>
          <p>As the field of medicine continues to evolve, investing in continuous education becomes imperative. These advanced courses not only empower physicians with the latest knowledge and skills but also contribute to a collaborative and forward-thinking medical community. By embracing lifelong learning, healthcare professionals are better positioned to navigate the complexities of modern medicine and, ultimately, provide superior care to their patients1.</p>
          <p>In the dynamic era of healthcare, continuous learning is paramount for medical professionals to stay abreast of advancements and deliver optimal patient care. Recognizing this need, a comprehensive set of continuing education courses tailored for physicians has been introduced, aiming to enhance their skills and knowledge1. These specialized courses cover a wide array of medical disciplines, ranging from cutting-edge treatment modalities to the latest technological innovations in healthcare12. Participants have the opportunity to delve into interactive sessions, workshops, and hands-on training, fostering a collaborative environment conducive to skill development1.</p>
        </article>

        <article className='article-container'>
          <h2>Field of medicine continues to evolve</h2>
          <p>These specialized courses cover a wide array of medical disciplines, ranging from cutting-edge treatment modalities to the latest technological innovations in healthcare. Participants have the opportunity to delve into interactive sessions, workshops, and hands-on training, fostering a collaborative environment conducive to skill development.</p>
          <p>In a dynamic era of healthcare, continuous learning is paramount for medical professionals to stay abreast of advancements and deliver optimal patient care. Recognizing this need, a comprehensive set of continuing education courses tailored for physicians has been introduced, aiming to enhance their skills and knowledge.</p>
          <p>As the field of medicine continues to evolve, investing in continuous education becomes imperative. These advanced courses not only empower physicians with the latest knowledge and skills but also contribute to a collaborative and forward-thinking medical community. By embracing lifelong learning, healthcare professionals are better positioned to navigate the complexities of modern medicine and, ultimately, provide superior care to their patients.</p>
        </article>
             
      </div>
      <div className="second-container">
        <article className='article-container'>
          <h2>Statistics for today</h2>
          <p>Doctors quantity: 1</p>
          <p>Patients quantity: 14</p>
        </article>  

        <article className='article-container'>
          <h2>Statistics for yesterday</h2>
          <p>Doctors quantity: 1</p>
          <p>Patients quantity: 13</p>
        </article>  
        
        <article className='article-container'>
          <h2>Statistics for 16.11.2023</h2>
          <p>Doctors quantity: 1</p>
          <p>Patients quantity: 12</p>
        </article>  

        <article className='article-container'>
          <h2>Statistics for 15.11.2023</h2>
          <p>Doctors quantity: 1</p>
          <p>Patients quantity: 13</p>
        </article>
      </div>
    </div>
  );
}


export default MainPage