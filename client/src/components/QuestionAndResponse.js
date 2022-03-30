import React, { useState } from 'react';
import axios from 'axios';

function QuestionAndResponse({ questionObject, onAddAnswer }) {
    const defaultFormData = {
        answer: "",
        user_id: 8,
        question_id: ""
    };
    const [formData, setFormData] = useState(defaultFormData);

    function answerReponse() {
        const answerChoices = questionObject.answer_choices;

        if (answerChoices !== undefined) {
            if (answerChoices === null) {
                return (<>
                    "Response:"
                    <input type="text" name="response" placeholder="Please, write your answer here" onChange = { handleChange } required/>
                </>);
            } else {
                const answerChoicesArray = answerChoices.split("|");
                const radioButtons = answerChoicesArray.map( answerChoice =>
                    <div key = { answerChoice } >                     
                        <input  
                            type = "radio" 
                            name = "answer-choice" 
                            value = { answerChoice } 
                        /> { answerChoice } 
                    </div>
                );
                return <div onChange = { handleChange }> { radioButtons } </div>;
            }
        }
    }

    function handleChange(e) {
        setFormData({
            ...formData,
            answer: e.target.value,
            question_id: questionObject.id
        });
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        console.log("formdata - ", formData);

        axios.post('/user_answers', formData)
            .then(res => { onAddAnswer(res.data) })
            .catch(function(error){
                if(error.response) {
                    console.log(error.response.data.errors);
                }
            });

        e.target.reset();
        setFormData(defaultFormData)
    }

    return (<>
        <div id="question">Question: { questionObject.question }</div> 
        <form onSubmit = { handleSubmit } >
        { answerReponse() }
        <button type="submit"> Submit Your Answer </button>
        </form>
    </>);
}

export default QuestionAndResponse