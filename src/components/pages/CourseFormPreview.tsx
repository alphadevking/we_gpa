// "use client"
import { Layout } from '@/components/Layout'
import { useEffect, useState } from 'react';
import { SessionEntry } from './CGPA';
import { RiDownload2Fill } from 'react-icons/ri';
import { VscSync } from 'react-icons/vsc';

const gradeMap = new Map<number, string>([
    [0, 'F'],
    [1, 'E'],
    [2, 'D'],
    [3, 'C'],
    [4, 'B'],
    [5, 'A']
]);

export const CourseFormPreview = () => {

    const [sessionEntry, setSessionEntry] = useState<SessionEntry>({} as SessionEntry);
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

    useEffect(() => {
        const intervalId = setInterval(syncWithLocalStorage, 1000);

        return () => clearInterval(intervalId);
    }, []);

    // console.log(sessionEntry.sessions);

    return (
        <Layout navbar footer>
            <div className='max-w-2xl mx-auto grid gap-5 text-center justify-items-center p-5'>
                <h1 className='text-3xl md:text-6xl font-bold'>Course Forms Preview.</h1>
                {
                    sessionEntry?.numberOfSessions >= 1 && (
                        <div>
                            {sessionEntry?.numberOfSessions} Session{sessionEntry?.numberOfSessions !== 1 && 's'} available
                        </div>
                    )
                }
                <div className='px-4 flex w-fit gap-2 items-center'>
                    <button
                        onClick={() => {
                            if (typeof window !== "undefined") {
                                window.print();
                            }
                        }}
                        className={`grid grid-flow-col w-fit gap-2 items-end text-xs italic disabled:opacity-15 ${sessionEntry.numberOfSessions === 0 && 'hidden'}`}
                        disabled={sessionEntry.numberOfSessions === 0}>
                        <span>Save As File</span>
                        <RiDownload2Fill className='text-xl inline-block' />
                    </button>
                    <button onClick={syncWithLocalStorage} className="px-4 py-2 text-white text-[11px] bg-emerald-500 hover:bg-emerald-700 rounded disabled:opacity-50" disabled={sessionEntryLoading} aria-disabled={sessionEntryLoading}>
                        {/* Sync{" "} */}
                        <VscSync className={`inline-block text-lg ${sessionEntryLoading && 'animate-spin'}`} />
                    </button>
                </div>
                {
                    Object.entries(sessionEntry.sessions || {}).map(([session, semesters]) => (
                        semesters.map((semester, _semesterIndex) => (
                            <div key={`${session}-${semester.semester}`} className="block overflow-x-auto w-full my-5">
                                <h2 className="text-xl font-semibold">{session} - {semester.semester}</h2>
                                <table className="min-w-full divide-y divide-gray-200 mt-3">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-[11px] md:text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                S/N
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-[11px] md:text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Course Title
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-[11px] md:text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Course Unit
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-[11px] md:text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Course Grade
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {semester.courses.map((course, courseIndex) => (
                                            <tr key={`${session}-${semester.semester}-${courseIndex}`}>
                                                <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 uppercase">{courseIndex + 1}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 uppercase">{course.courseTitle}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">{course.courseUnit}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">{gradeMap.get(course.courseGrade)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))
                    ))
                    ||
                    <div className='text-sm italic opacity-75'>
                        Course form is empty...
                    </div>
                }
            </div>
        </Layout>
    )
}
