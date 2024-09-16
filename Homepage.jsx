import React, { useState } from 'react'; // Import React and useState hook for state management
import Calendar from './Calendar'; // Import Calendar component
import Classes from './Classes'; // Import Classes component
import './index.css'; // Import CSS file for styling

function Homepage() {
    // State variables
    const [classesVisible, setClassesVisible] = useState(false); // Controls visibility of the class selection modal
    const [selectedClasses, setSelectedClasses] = useState([]); // Stores the list of selected classes
    const [errorMessage, setErrorMessage] = useState(''); // Stores error messages
    const [popupVisible, setPopupVisible] = useState(false); // Controls visibility of the class selection confirmation popup
    const [selectedClass, setSelectedClass] = useState(null); // Stores the currently selected class for the popup
    const [notificationMessage, setNotificationMessage] = useState(''); // Stores notifications messages

    // Handler for when the "Select Classes" button is clicked
    const handleSelectClassesClick = () => {
        setClassesVisible(true); // Show the class selection modal
    };

    // Handler for selecting a class
    const handleClassSelect = (cls) => {
        console.log('Selected class:', cls); // Log selected class for debugging
        setSelectedClass(cls); // Set the currently selected class
        setPopupVisible(true); // Show the confirmation popup
    };

    // Handler for confirming the action in the popup (add or remove class)
    const handlePopupConfirm = (action) => {
        if (action === 'add') {
            // Check if class is already selected or if there are any time slot overlaps
            const newTimeSlots = getTimeSlots(selectedClass);
            const isDuplicate = selectedClasses.some(cls => cls.name === selectedClass.name);
            const isOverlapping = newTimeSlots.some(slot =>
                selectedClasses.flatMap(cls => getTimeSlots(cls))
                .some(existingSlot => existingSlot.day === slot.day && existingSlot.hour === slot.hour)
            );
    
            if (isDuplicate) {
                setNotificationMessage(`Class '${selectedClass.name}' is already added.`); // Show notification if class is already added
            } else if (isOverlapping) {
                setNotificationMessage(`Unable to add, '${selectedClass.name}' overlaps with another class.`); // Show notification if there is a time overlap
            } else {
                setSelectedClasses([...selectedClasses, selectedClass]); // Add the class to the selected classes list
                setNotificationMessage(''); // Clear notification message
            }
        } else if (action === 'remove') {
            // Remove the class from the selected classes list
            const updatedClasses = selectedClasses.filter(cls => cls.name !== selectedClass.name);
            setSelectedClasses(updatedClasses); // Update the selected classes list
            setNotificationMessage(`Class '${selectedClass.name}' has been removed.`); // Show notification about removal
        }
    
        setPopupVisible(false); // Hide the popup
        setSelectedClass(null); // Clear the currently selected class
    };    

    // Handler for closing the class selection modal
    const handleClassesClose = () => {
        setClassesVisible(false); // Hide the class selection modal
        setErrorMessage(''); // Clear any error messages
    };

    return (
        <div className="homepage">
            <div className="classes-section">
                <h1 style={{ fontFamily: 'Arial, sans-serif' }}>Welcome "Name"</h1> {/* Welcome message */}
                <h2>Fall 2024 Classes</h2> {/* Heading for the classes section */}

                {/* Holds and Enrollment Dates Sections */}
                <div className="student-info">
                    <div className="holds">
                        <h3>Holds</h3>
                        <p>No holds on your account.</p> {/* Placeholder text for account holds */}
                    </div>
                    <div className="enrollment-dates">
                        <h3>Enrollment Dates</h3>
                        <p>Enrollment begins: August 20, 2024</p> {/* Placeholder text for enrollment dates */}
                    </div>
                </div>

                {selectedClasses.length === 0 ? (
                    <p>Empty</p> // Show if no classes are selected
                ) : (
                    <ul>
                        {selectedClasses.map((cls, index) => (
                            <li key={index}>
                                {cls.name} ({cls.days.join(', ')} {cls.time}) {/* Display selected classes */}
                            </li>
                        ))}
                    </ul>
                )}
                <button onClick={handleSelectClassesClick}>Select Classes</button> {/* Button to open class selection modal */}
                {classesVisible && (
                    <div className="modal-background">
                        <div className="modal">
                            <button className="close-button" onClick={handleClassesClose}>Close</button> {/* Button to close class selection modal */}
                            <div className="classes-content">
                                <Classes onClassSelect={handleClassSelect} /> {/* Render the Classes component */}
                            </div>
                        </div>
                        <div className="calendar-container">
                            <Calendar
                                selectedClasses={selectedClasses}
                                className="calendar-mini"
                            /> {/* Render mini calendar */}
                        </div>
                    </div>
                )}
            </div>
            <div className="calendar-container">
                <Calendar
                    selectedClasses={selectedClasses}
                /> {/* Render main calendar */}
            </div>
            {popupVisible && (
                <div className="modal-background">
                    <div className="modal">
                        <p>Would you like to add or remove {selectedClass?.name}?</p> {/* Confirmation message */}
                        <button onClick={() => handlePopupConfirm('add')}>Add</button> {/* Button to add class */}
                        <button onClick={() => handlePopupConfirm('remove')}>Remove</button> {/* Button to remove class */}
                        <button onClick={() => handlePopupConfirm(null)}>Cancel</button> {/* Button to cancel action */}
                    </div>
                </div>
            )}
            {notificationMessage && (
                <div className="notification-box">
                    <p>{notificationMessage}</p> {/* Display notification message */}
                    <button onClick={() => setNotificationMessage('')}>Close</button> {/* Button to close notification */}
                </div>
            )}
            {errorMessage && (
                <div className="error-message">
                    <p>{errorMessage}</p> {/* Display error message */}
                </div>
            )}
        </div>
    );
}

// Helper function to generate time slots for a class
function getTimeSlots(cls) {
    console.log('Generating time slots for class:', cls); // Log class for debugging
    const timeSlots = cls.days.map(day => ({
        day,
        hour: cls.time
    }));
    console.log('Generated time slots:', timeSlots); // Log generated time slots
    return timeSlots;
}

export default Homepage; // Export the Homepage component
