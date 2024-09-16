import React from 'react'; // Import React library
import './index.css'; // Import CSS styles for the component

// Array of days in the week to be displayed in the calendar
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

// Generate an array of time slots for each hour of the day
const hours = Array.from({ length: 24 }, (_, i) => 
    `${i < 10 ? '0' : ''}${i}:00-${i < 9 ? '0' : ''}${i + 1}:00`
);

function Calendar({ selectedClasses, onTimeSelect, className }) {
    // Generate time slots for a given class based on its days and time
    const getTimeSlots = (cls) => {
        return cls.days.map(day => ({
            day, // The day of the class
            hour: cls.time // The time slot of the class
        }));
    };

    // Flatten the list of time slots for all selected classes
    const highlightedTimes = selectedClasses.flatMap(cls => getTimeSlots(cls));

    // Debug log to show selected classes and highlighted time slots
    console.log('Selected classes:', selectedClasses);
    console.log('Highlighted times:', highlightedTimes);

    // Handle click events on a time slot, triggering the onTimeSelect callback
    const handleTimeClick = (day, hour) => {
        onTimeSelect && onTimeSelect({ day, hour });
    };

    // Normalize time format to ensure consistent comparison
    const normalizeTime = (time) => {
        // Regular expression to match time slots in format 'HH:MM-HH:MM'
        const match = time.match(/(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})/);
        if (match) {
            const [_, startHour, startMinute, endHour, endMinute] = match;
            // Normalize hours and minutes to always be two digits
            const normalizedTime = `${startHour.padStart(2, '0')}:${startMinute}-${endHour.padStart(2, '0')}:${endMinute}`;
            console.log('Normalized time:', normalizedTime); // Debug log for normalized time
            return normalizedTime;
        }
        return time; // Return original time if it doesn't match the format
    };

    return (
        <div className={`calendar ${className}`}> {/* Container for the calendar with optional additional class */}
            <div className="header"> {/* Header section for day labels */}
                <div className="time-cell"></div> {/* Empty cell for time labels */}
                {days.map(day => 
                    <div key={day} className="day-cell">{day}</div> // Display day labels
                )}
            </div>
            {hours.map(hour => (
                <div key={hour} className="row"> {/* Row for each hour slot */}
                    <div className="time-cell">{hour}</div> {/* Display hour label */}
                    {days.map(day => {
                        // Check if the current time slot should be highlighted
                        const isSelected = highlightedTimes.some(t => {
                            const normalizedHour = normalizeTime(hour); // Normalize current hour
                            const normalizedTTime = normalizeTime(t.hour); // Normalize time slot hour
                            console.log(`Checking ${day} ${normalizedHour} against ${t.day} ${normalizedTTime}`); // Debug log for comparison
                            return t.day === day && normalizedTTime === normalizedHour;
                        });
                        return (
                            <div
                                key={`${day}-${hour}`} // Unique key for each time slot cell
                                className={`time-slot ${isSelected ? 'selected' : ''}`} // Apply 'selected' class if time slot is highlighted
                                onClick={() => handleTimeClick(day, hour)} // Handle click event for selecting time slot
                            >
                                {isSelected && <span>*</span>} {/* Display an asterisk if the time slot is selected */}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default Calendar; // Export the Calendar component to be used in other parts of the application
