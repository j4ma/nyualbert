import React, { useState } from 'react'; // Import React and useState hook from React library
import './index.css'; // Import CSS styles for the component

// The Classes component displays and handles the selection of classes
function Classes({ onClassSelect }) {
    // State to track the currently selected subject, initially set to null
    const [selectedSubject, setSelectedSubject] = useState(null);

    // List of subjects, each with a list of associated classes
    const subjects = [
        // Subject: Language with its classes
        {
            name: 'Language',
            classes: [
                { name: 'French 101', days: ['Monday', 'Wednesday'], time: '09:00-10:00' },
                { name: 'Spanish 102', days: ['Tuesday', 'Thursday'], time: '10:00-11:00' },
                { name: 'German 201', days: ['Monday', 'Wednesday'], time: '11:00-12:00' },
                { name: 'Italian 301', days: ['Tuesday', 'Thursday'], time: '13:00-14:00' },
                { name: 'Latin 401', days: ['Monday'], time: '14:00-15:00' }
            ]
        },
        // Subject: Math with its classes
        {
            name: 'Math',
            classes: [
                { name: 'Calculus I', days: ['Tuesday', 'Thursday'], time: '10:00-11:00' },
                { name: 'Calculus II', days: ['Monday', 'Wednesday'], time: '11:00-12:00' },
                { name: 'Algebra', days: ['Tuesday'], time: '13:00-14:00' },
                { name: 'Geometry', days: ['Thursday'], time: '14:00-15:00' },
                { name: 'Statistics', days: ['Monday', 'Wednesday'], time: '09:00-10:00' }
            ]
        },
        // Subject: English with its classes
        {
            name: 'English',
            classes: [
                { name: 'Literature 201', days: ['Monday', 'Wednesday'], time: '11:00-12:00' },
                { name: 'Creative Writing', days: ['Tuesday', 'Thursday'], time: '09:00-10:00' },
                { name: 'American Literature', days: ['Monday'], time: '13:00-14:00' },
                { name: 'British Literature', days: ['Wednesday'], time: '14:00-15:00' },
                { name: 'Poetry', days: ['Tuesday', 'Thursday'], time: '10:00-11:00' }
            ]
        },
        // Subject: History with its classes
        {
            name: 'History',
            classes: [
                { name: 'Modern History', days: ['Tuesday', 'Thursday'], time: '13:00-14:00' },
                { name: 'Ancient History', days: ['Monday', 'Wednesday'], time: '09:00-10:00' },
                { name: 'European History', days: ['Tuesday'], time: '10:00-11:00' },
                { name: 'American History', days: ['Thursday'], time: '11:00-12:00' },
                { name: 'World History', days: ['Monday'], time: '14:00-15:00' }
            ]
        },
        // Subject: Computer Science with its classes
        {
            name: 'Computer Science',
            classes: [
                { name: 'Intro to CS', days: ['Monday', 'Wednesday'], time: '14:00-15:00' },
                { name: 'Data Structures', days: ['Tuesday', 'Thursday'], time: '09:00-10:00' },
                { name: 'Algorithms', days: ['Monday'], time: '11:00-12:00' },
                { name: 'Web Development', days: ['Wednesday'], time: '13:00-14:00' },
                { name: 'Database Systems', days: ['Tuesday', 'Thursday'], time: '14:00-15:00' }
            ]
        },
        // Subject: Electives with its classes
        {
            name: 'Electives',
            classes: [
                { name: 'Piano', days: ['Monday', 'Wednesday'], time: '08:00-09:00' },
                { name: 'Painting', days: ['Tuesday', 'Thursday'], time: '10:00-11:00' },
                { name: 'Dance', days: ['Monday'], time: '11:00-12:00' },
                { name: 'Photography', days: ['Wednesday'], time: '13:00-14:00' },
                { name: 'Theater', days: ['Tuesday', 'Thursday'], time: '14:00-15:00' }
            ]
        },
        // Subject: Science with its classes
        {
            name: 'Science',
            classes: [
                { name: 'Physics 101', days: ['Tuesday', 'Thursday'], time: '09:00-10:00' },
                { name: 'Biology 102', days: ['Monday', 'Wednesday'], time: '11:00-12:00' },
                { name: 'Chemistry 201', days: ['Tuesday'], time: '13:00-14:00' },
                { name: 'Earth Science', days: ['Thursday'], time: '14:00-15:00' },
                { name: 'Astronomy', days: ['Monday'], time: '15:00-16:00' }
            ]
        }
    ];

    // Function to handle when a subject is clicked
    const handleSubjectClick = (subject) => {
        setSelectedSubject(subject); // Set the selected subject state to the clicked subject
    };

    // Function to handle when a class is selected
    const handleClassSelect = (cls) => {
        console.log('Selected class:', cls); // Debug log to check which class was selected
        onClassSelect(cls); // Call the onClassSelect callback function from parent with the selected class
    };

    return (
        <div className="classes"> {/* Container for the classes component */}
            {selectedSubject ? (
                <div>
                    <h3>Classes for {selectedSubject.name}</h3> {/* Display the selected subject's name */}
                    {selectedSubject.classes.map((cls, index) => ( // Iterate over the classes of the selected subject
                        <div
                            key={index} // Unique key for each class item
                            className="class-cell" // CSS class for styling each class item
                            onClick={() => handleClassSelect(cls)} // Handle class item click
                        >
                            {cls.name} ({cls.days.join(', ')} {cls.time}) {/* Display class details */}
                        </div>
                    ))}
                    <button onClick={() => setSelectedSubject(null)}>Back to Subjects</button> {/* Button to go back to the list of subjects */}
                </div>
            ) : (
                subjects.map((subject, index) => ( // Iterate over the list of subjects
                    <div key={index}> {/* Unique key for each subject item */}
                        <h3
                            className="subject-cell" // CSS class for styling each subject item
                            onClick={() => handleSubjectClick(subject)} // Handle subject item click
                        >
                            {subject.name} {/* Display subject name */}
                        </h3>
                    </div>
                ))
            )}
        </div>
    );
}

export default Classes; // Export the Classes component to be used in other parts of the application
