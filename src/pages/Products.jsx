import React, { useState } from 'react';
import './LikertTest.css';
import { ToastContainer, toast } from 'react-toastify';



const questions = [
  "How do you usually travel to school? (e.g., bus, metro, car, bike, walk, etc.)",
  "How far is your home from school (in minutes)?",
  "What time do you usually leave home for school?",
  "Do you feel safe during your daily commute?",
  "Is public transport available in your area?",
  "Have you ever been late to school due to transport problems?",
  "How often does traffic or delay affect your school attendance?",
  "Do transport issues affect your academic performance or concentration?",
  "Do you skip classes because of transportation challenges?",
  "Do you think your school should provide transport services?",
  "How much do you spend on transportation weekly?",
  "Is transportation a financial burden for you or your family?",
  "Do you usually travel to school alone or with someone else?",
  "Is it easy to find transportation when school finishes?",
  "Do you carry heavy items (like books or bags) that make travel harder?",
  "Have you ever felt unwell or sick during your trip to school?",
  "Do your parents or guardians worry about your trip to school?",
  "Would you like to have a resting or waiting area near your school for transport?",
  "Have you ever had to walk a long distance because no transport was available?",
  "Does your commute make you feel tired before school starts?",
  "Have you ever lost money or belongings while traveling to school?",
  "Do you think school should adjust start times based on how far students live?",
];


const LikertTest = () => {
  const [answers, setAnswers] = useState({});

  const handleChange = (qIndex, value) => {
    setAnswers({ ...answers, [qIndex]: value });
  };

  const answeredCount = Object.values(answers).filter((v) => v.trim() !== "").length;
  const totalQuestions = questions.length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div className="container py-5">
      <h4 className="text-center mb-4 fw-bold">
        Choose how accurately each statement reflects you.
      </h4>
  
      <div className="progress-container d-flex align-items-center justify-content-center gap-3 mb-4">
  <span className="progress-percent-text">{progressPercent}%</span>
  <div className="progress" style={{ height: "25px", width: "80%" }}>
    <div
      className="progress-bar custom-progress-bar"
      role="progressbar"
      style={{
        width: `${progressPercent}%`
      }}
      aria-valuenow={progressPercent}
      aria-valuemin="0"
      aria-valuemax="100"
    />
  </div>
</div>





      {/* Questions */}
      {questions.map((q, qIndex) => (
  <div
    key={qIndex}
    className="question-box"
    style={{
      width: "80%",
      //center the box
      margin: "0 auto",
      marginBottom: "20px",
      padding: "15px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    }}
  >
    <p style={{ fontWeight: "bold", marginBottom: "10px" }}>{q}</p>
    <div className="d-flex justify-content-center">
      <input
        type="text"
        className="form-control w-75"
        style={{
          height: "40px",
          fontSize: "14px",
          borderRadius: "5px",
          padding: "8px",
        }}
        value={answers[qIndex] || ""}
        onChange={(e) => handleChange(qIndex, e.target.value)}
        placeholder="Your answer"
      />
    </div>
  </div>
))}


      <div className="text-center mt-4">
        <button
          className="btn btn-primary  violetColor-100 text-white" 
          style={{
            backgroundColor: "#0d6efd",
            border: "none",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
          }}
          
          onClick={() => {
            if (
              Object.keys(answers).length === totalQuestions &&
              Object.values(answers).every((a) => a.trim() !== "")
            ) {
              toast.success("Thank you for your responses!");
            } else {
              toast.error("Please answer all questions before submitting.");
            }
          }}
        >
          Submit
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LikertTest;
