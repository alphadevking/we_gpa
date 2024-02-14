import React, { useEffect, useState } from 'react';
import { Layout } from '../Layout';
import { FadeInAnimation } from '../animations/Fade';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import Link from 'next/link';
import { RiCloseCircleFill } from 'react-icons/ri';
import { PiTrashDuotone } from 'react-icons/pi';
import { VscSync } from 'react-icons/vsc';

interface Course {
    courseTitle: string;
    courseUnit: number;
    courseGrade: number;
};

interface Semester {
    semester: string;
    courses: Course[];
};

export interface SessionEntry {
    numberOfSessions: number;
    sessions: { [key: string]: Semester[] };
};

export const CGPA = () => {
    const [selectedSemester, setSelectedSemester] = useState<string>('');
    const [selectedSession, setSelectedSession] = useState<string>('');

    const [sessionEntry, setSessionEntry] = useState({
        numberOfSessions: 0,
        sessions: {} as { [key: string]: Semester[] },
    });

    useEffect(() => {
        const fetch = () => {
            setSessionEntryLoading(true);
            try {
                setSessionEntry(prev => {
                    const storedValue = localStorage.getItem("sessionEntry");
                    if (storedValue) {
                        const parsedValue = JSON.parse(storedValue); // Parse once
                        setSessionEntry(parsedValue);
                        setSessionEntryLoading(false);
                    }
                    return prev;
                })
                setSessionEntryLoading(false);
            } catch (error) {
                console.error("Error parsing sessionEntry from localStorage", error);
                setSessionEntryLoading(false);
                setSessionEntry({} as SessionEntry); // Fallback to default state
            }
        }
        fetch();
    }, []);

    const [sessionEntryLoading, setSessionEntryLoading] = useState<boolean>(false);

    // Function to manually sync the state with localStorage
    const syncWithLocalStorage = () => {
        setSessionEntryLoading(true);
        try {
            setSessionEntry(prev => {
                const storedValue = localStorage.getItem("sessionEntry");
                if (storedValue) {
                    const parsedValue = JSON.parse(storedValue); // Parse once
                    setSessionEntry(parsedValue);
                    setSessionEntryLoading(false);
                }
                return prev;
            })
            setSessionEntryLoading(false);
        } catch (error) {
            console.error("Error parsing sessionEntry from localStorage", error);
            setSessionEntryLoading(false);
            setSessionEntry({} as SessionEntry); // Fallback to default state
        }
    };

    const [newSession, setNewSession] = useState<string>('');

    const [isSessionEntryAvailable, setIsSessionEntryAvailable] = useState<boolean>(false);

    useEffect(() => {
        // Function to check the presence of 'sessionEntry' in localStorage
        const checkSessionEntry = () => {
            const sessionEntry = localStorage.getItem("sessionEntry");
            setIsSessionEntryAvailable(!!sessionEntry);
        };

        // Check 'sessionEntry' presence initially and set up an interval to keep checking
        checkSessionEntry();
        const intervalId = setInterval(checkSessionEntry, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    // Function to clear 'sessionEntry' from localStorage
    const clearSessionEntry = () => {
        localStorage.removeItem("sessionEntry");
        setIsSessionEntryAvailable(false); // Update state to reflect the removal
    };

    // console.log(sessionEntry.numberOfSessions);

    const handleAddSession = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newSession.match(/^\d{4}\/\d{4}$/)) {
            // Define default semesters to be added with each new session
            const defaultSemesters: Semester[] = [
                {
                    semester: 'First Semester',
                    courses: /* [{ courseTitle: '', courseUnit: 0, courseGrade: 0 }] */[] as Course[],
                },
                {
                    semester: 'Second Semester',
                    courses: /* [{ courseTitle: '', courseUnit: 0, courseGrade: 0 }] */[] as Course[],
                },
            ];

            setSessionEntry({
                ...sessionEntry,
                numberOfSessions: sessionEntry.numberOfSessions + 1,
                sessions: { ...sessionEntry.sessions, [newSession]: defaultSemesters },
            });
            setNewSession('');
        } else {
            alert("Invalid session format. Please use the format 'YYYY/YYYY'.");
        }
    };

    const handleCourseChange = (index: number, field: keyof Course, value: string | number) => {
        // Create a copy of sessions
        const updatedSessions = { ...sessionEntry.sessions };
        // Safely attempt to find the selected semester
        const semesterIndex = updatedSessions[selectedSession]?.findIndex(s => s.semester === selectedSemester);
        if (semesterIndex !== -1 && updatedSessions[selectedSession]) {
            // Clone the courses array from the found semester
            const updatedCourses = [...updatedSessions[selectedSession][semesterIndex].courses];
            // Create an updated course object
            const updatedCourse = { ...updatedCourses[index], [field]: value };
            // Update the course in the cloned courses array
            updatedCourses[index] = updatedCourse;
            // Update the courses array in the cloned semester object
            updatedSessions[selectedSession][semesterIndex].courses = updatedCourses;
            // Update the sessionEntry state with the updated sessions
            setSessionEntry({ ...sessionEntry, sessions: updatedSessions });
        }
    };

    const handleSaveCourse = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSelectedSemester('');
        // console.log(JSON.stringify(sessionEntry));
        localStorage.setItem("sessionEntry", JSON.stringify(sessionEntry));
    };

    const handleSaveAndContinue = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault(); // Prevent the default form submission behavior
        const newCourse: Course = { courseTitle: '', courseUnit: 0, courseGrade: 0 };
        const updatedSessions = { ...sessionEntry.sessions };
        const semester = updatedSessions[selectedSession].find(s => s.semester === selectedSemester);
        if (semester) {
            semester.courses.push(newCourse);
        }
        setSessionEntry({ ...sessionEntry, sessions: updatedSessions });
    }

    const handleRemoveCourse = (index: number) => {
        // Make a deep copy of sessions to avoid mutating the state directly
        const updatedSessions = { ...sessionEntry.sessions };
        const semester = updatedSessions[selectedSession].find(s => s.semester === selectedSemester);

        if (semester && index >= 0 && index < semester.courses.length) {
            // Remove the course at the specified index
            semester.courses.splice(index, 1);

            // Update the state with the modified sessions
            setSessionEntry({ ...sessionEntry, sessions: updatedSessions });
        }
    };

    const renderCourseForm = () => {
        const semester = sessionEntry.sessions[selectedSession]?.find(
            (s) => s.semester === selectedSemester
        );

        return (
            <FadeInAnimation>
                <form onSubmit={(e) => handleSaveCourse(e)}>
                    <div className="p-4 grid gap-2">
                        <div>
                            {semester?.semester} {selectedSession}
                        </div>
                        {
                            semester?.courses.map((course, index) => {
                                return (
                                    <div key={index} className="my-4 grid md:flex items-start gap-2">
                                        <RiCloseCircleFill className='text-lg cursor-pointer justify-end' onClick={() => handleRemoveCourse(index)}/>
                                        <label className="text-sm font-medium space-y-1">
                                            Course Title
                                            <input
                                                type="text"
                                                className="p-2 text-sm border border-gray-300 rounded focus:ring-emerald-500 bg-transparent w-full mt-1 uppercase"
                                                value={course?.courseTitle}
                                                onChange={(e) =>
                                                    handleCourseChange(index, 'courseTitle', e.target.value)
                                                }
                                                required
                                                aria-required
                                            />
                                        </label>
                                        <label className="text-sm font-medium space-y-1">
                                            Course Unit
                                            <input
                                                type="number"
                                                className="p-2 text-sm border border-gray-300 rounded focus:ring-emerald-500 bg-transparent w-full mt-1"
                                                value={course?.courseUnit}
                                                onChange={(e) =>
                                                    handleCourseChange(index, 'courseUnit', parseInt(e.target.value))
                                                }
                                                min={0}
                                                max={20}
                                                required
                                                aria-required
                                            />
                                        </label>
                                        <label className="text-sm font-medium space-y-1">
                                            Course Grade
                                            <select
                                                className="p-2 text-sm border border-gray-300 rounded focus:ring-emerald-500 bg-transparent w-full mt-1"
                                                value={course?.courseGrade}
                                                onChange={(e) =>
                                                    handleCourseChange(index, 'courseGrade', parseInt(e.target.value))
                                                }
                                                required
                                                aria-required
                                            >
                                                <option className='text-gray-700' value={5}>A</option>
                                                <option className='text-gray-700' value={4}>B</option>
                                                <option className='text-gray-700' value={3}>C</option>
                                                <option className='text-gray-700' value={2}>D</option>
                                                <option className='text-gray-700' value={1}>E</option>
                                                <option className='text-gray-700' value={0}>F</option>
                                            </select>
                                        </label>
                                    </div>
                                )
                            })
                        }

                        <div className='flex items-center gap-5 justify-between'>
                            <button
                                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none focus:ring focus:ring-emerald-300"
                                onClick={() => setSelectedSemester('')}
                            >
                                <FaLongArrowAltLeft className='inline-block' />{" "}Back
                            </button>

                            <button type="submit" onClick={(e) => handleSaveAndContinue(e)} className="px-4 py-2 text-sm text-white bg-emerald-500 rounded hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-emerald-300">
                                Add New Course
                            </button>

                            <button className="px-4 py-2 text-sm text-white bg-emerald-500 rounded hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-emerald-300">
                                Save
                            </button>
                        </div>

                    </div>
                </form>
            </FadeInAnimation>
        );
    };

    const renderSemesterSelection = () => {
        return (
            <FadeInAnimation>
                <div className="p-4">
                    <div className="space-x-2">
                        {sessionEntry.sessions[selectedSession]?.map((s, index) => (
                            <button
                                key={index}
                                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none focus:ring focus:ring-emerald-300"
                                onClick={() => setSelectedSemester(s.semester)}
                            >
                                {s.semester}
                            </button>
                        ))}
                    </div>
                    <button
                        className="px-4 py-2 mt-4 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none focus:ring focus:ring-emerald-300"
                        onClick={() => setSelectedSession('')}
                    >
                        <FaLongArrowAltLeft className='inline-block'/>{" "}Back to Sessions
                    </button>
                </div>
            </FadeInAnimation>
        );
    };

    const renderSessionSelection = () => {
        return (
            <FadeInAnimation>
                <div className="p-4">
                    <div className='flex flex-wrap w-fit gap-2 items-center p-2'>
                        {Object.keys(sessionEntry.sessions || {}).map((sessionKey) => (
                            <button
                                key={sessionKey}
                                className="px-4 py-2 m-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none focus:ring focus:ring-emerald-300"
                                onClick={() => setSelectedSession(sessionKey)}
                            >
                                {sessionKey}
                            </button>
                        ))}
                        {isSessionEntryAvailable && (
                            <button
                                onClick={clearSessionEntry}
                                className="px-4 py-2 m-2 text-white text-[11px] bg-orange-500 hover:bg-orange-700 rounded"
                            >
                                Clear{" "}<PiTrashDuotone className='inline-block text-lg'/>
                            </button>
                        )}
                        <button onClick={syncWithLocalStorage} className="px-4 py-2 text-white text-[11px] bg-emerald-500 hover:bg-emerald-700 rounded disabled:opacity-50" disabled={sessionEntryLoading} aria-disabled={sessionEntryLoading}>
                            {/* Sync{" "} */}
                            <VscSync className={`inline-block text-lg ${sessionEntryLoading && 'animate-spin'}`} />
                        </button>
                    </div>
                    
                    <form onSubmit={handleAddSession} className="p-4">
                        <div className="mb-4 grid gap-2">
                            <label className="text-sm font-medium space-y-1">
                                Add New Session
                                <input
                                    type="text"
                                    className="p-2 text-sm border border-gray-300 rounded focus:ring-emerald-500 bg-transparent w-full mt-1"
                                    value={newSession}
                                    onChange={(e) => setNewSession(e.target.value)}
                                    placeholder={`YYYY/YYYY E.g ${new Date().getFullYear() - 1}/${new Date().getFullYear()}`}
                                    pattern="\d{4}/\d{4}"
                                    required
                                />
                            </label>
                        </div>
                        <div className='flex justify-between'>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm text-white bg-emerald-500 rounded hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-emerald-300"
                            >
                                Add Session
                            </button>
                            {
                                sessionEntry.numberOfSessions > 0 && (
                                    <Link href={'/course-form-preview'} target='_blank' className="px-4 py-2 text-sm text-white bg-emerald-500 rounded hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-emerald-300" >Preview Course Forms</Link>
                                )
                            }
                        </div>
                    </form>
                </div>
            </FadeInAnimation>
        );
    };

    return (
        <Layout className="" navbar footer>
            <div className="flex justify-center">
                <div className="w-full max-w-2xl p-4 mx-2 my-4">
                    {!selectedSession && renderSessionSelection()}
                    {selectedSession && !selectedSemester && renderSemesterSelection()}
                    {selectedSession && selectedSemester && renderCourseForm()}
                </div>
            </div>
        </Layout>
    );
};
