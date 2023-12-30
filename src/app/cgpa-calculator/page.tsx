"use client"
import { Layout } from '@/components/Layout'
import { useMemo, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaGithubAlt, FaXTwitter } from 'react-icons/fa6';

type Course = {
    title: string,
    grade: string;
    no: number;
    unit: number;
};

const cgpaToast = (message: string) =>
    toast(`${message}`, {
        duration: 6000,
        position: "top-center",
        style: {
            borderRadius: '8px',
            marginTop: "30px",
            color: "white",
            backgroundColor: "#121010",
        },
    });

export default function Page() {

    const [courses, setCourses] = useState<Course[]>([]);
    const [noOfCourses, setNoOfCourses] = useState<number>(0);

    const countRef = useRef<HTMLInputElement>(null);

    useMemo(() => {
        let arr = [];
        for (let i = 0; i < noOfCourses; i++) {
            const course: Course = { no: i + 1, title: '', grade: "F", unit: 2 };
            arr.push(course);
        }
        setCourses(arr);
        // console.log({ arr, noOfCourses, courses });
    }, [noOfCourses]);

    const handleCourseInput = () => {
        setNoOfCourses(parseInt(countRef.current!.value));
    };

    const handleCourseTitleInput = (title: string, index: number) => {
        const newCourseItems = courses.map((course) =>
            course.no === index ? { ...course, title: title } : course
        );
        setCourses(newCourseItems);
    };

    const handleGradeInput = (grade: string, index: number) => {
        const newCourseItems = courses.map((course) =>
            course.no === index ? { ...course, grade: grade } : course
        );
        setCourses(newCourseItems);
    };

    const toggleUnit = (index: number, value: "increment" | "decrement") => {
        if (value === "increment") {
            const updatedcourses = courses.map((course) =>
                course.no === index ? { ...course, unit: course.unit + 1 } : course
            );
            setCourses(updatedcourses);
        } else if (value === "decrement") {
            const updatedcourses = courses.map((course) =>
                course.no === index && course.unit! > 1
                    ? { ...course, unit: course.unit - 1 }
                    : course
            );
            setCourses(updatedcourses);
        }
    };

    const handleGPCalculation = () => {
        let totalScore = 0;
        let totalGradePoints = 0;

        for (let i = 0; i < noOfCourses; i++) {
            switch (courses[i].grade.toUpperCase()) {
                case "A":
                    totalScore += 5 * courses[i].unit;
                    break;
                case "B":
                    totalScore += 4 * courses[i].unit;
                    break;
                case "C":
                    totalScore += 3 * courses[i].unit;
                    break;

                case "D":
                    totalScore += 2 * courses[i].unit;
                    break;
                case "E":
                    totalScore += 1 * courses[i].unit;
                    break;
                default:
                    totalScore += 0 * courses[i].unit;
                    break;
            }
        }

        for (let i = 0; i < noOfCourses; i++) {
            totalGradePoints += courses[i].unit;
        }

        const CGPA = totalScore / totalGradePoints;

        if (Number.isFinite(CGPA)) {
            cgpaToast(`Your CGPA is ${CGPA.toFixed(2)}.`);
        } else {
            cgpaToast(`Your CGPA is 0.00.`);
        }

    };

    // console.log(courses)

    return (
        <Layout navbar footer>
            <Toaster />
            <div className='max-w-xl mx-auto grid gap-5 text-center justify-items-center p-5'>

                <h1 className='text-3xl md:text-6xl font-bold'>CGPA Calculator.</h1>
                <p className="text-sm">
                    Enter the total number of courses you are offering here. Unreleased results will have a default
                    score of 0.
                </p>
                <p>
                    You are offering (
                    {Number.isNaN(noOfCourses) || noOfCourses === 0 ? 0 : noOfCourses})
                    courses.
                </p>
                <div className="bg-gray-50 mx-auto rounded-xl w-fit">
                    <input
                        type="number"
                        className="px-5 py-4 ring-1 ring-gray-50 hover:ring-gray-50 outline-none rounded-l-lg w-40 text-sm h-full"
                        placeholder="No Of Courses"
                        min={0}
                        max={20}
                        ref={countRef}
                    />
                    <button className='px-5 py-4 rounded-r-lg bg-gray-900 hover:bg-gray-800 duration-500 text-gray-50 text-sm' type="submit" onClick={handleCourseInput}>
                        Go
                    </button>
                </div>

                <h2>Grades & Course Units</h2>

                <div className='overflow-hidden w-full max-w-xl bg-gray-50 py-5 px-2 md:p-5 shadow-lg rounded-lg mx-auto text-xs'>
                    <div className='overflow-x-auto'>

                        <div className='grid grid-cols-5 text-gray-800 font-semibold uppercase'>
                            <div>S/N</div>
                            <div>Course</div>
                            <div>Grade</div>
                            <div>Units</div>
                            <div>Count</div>
                        </div>

                        {
                            courses.map((course, index) => (
                                <div key={index} className='grid grid-cols-5 items-center my-3'>
                                    <div key={index} className="text-gray-600">
                                        {index + 1}
                                    </div>

                                    <div className='w-fit pr-2'>
                                        <input className='w-full p-2 outline-none bg-transparent ring-1 ring-gray-300 rounded-md'
                                            type="text"
                                            name="ctitle"
                                            id="ctitle"
                                            placeholder='Course Title'
                                            onChange={
                                                (e) => handleCourseTitleInput(e.target.value, index + 1)
                                            }
                                        />
                                    </div>

                                    <select
                                        value={course.grade}
                                        className="outline-none bg-gray-100 border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-gray-500 focus:border-gray-400 duration-500 justify-center"
                                        onChange={(e) => handleGradeInput(e.target.value, index + 1)}
                                    >
                                        <option value="A">A(5)</option>
                                        <option value="B">B(4)</option>
                                        <option value="C">C(3)</option>
                                        <option value="D">D(2)</option>
                                        <option value="E">E(1)</option>
                                        <option value="F">F(0)</option>
                                    </select>

                                    <div className="text-gray-600">
                                        {course.unit}
                                    </div>

                                    <div className="flex mx-auto gap-1 text-lg">
                                        <button
                                            onClick={() => toggleUnit(index + 1, "increment")}
                                            className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-3 py-1 rounded-l-md duration-500"
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={() => toggleUnit(index + 1, "decrement")}
                                            className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-3 py-1 rounded-r-md duration-500"
                                        >
                                            -
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className='space-x-5'>
                    {
                        courses.length > 0 && (
                            <button className="w-fit px-5 py-4 rounded-lg bg-gray-900 hover:bg-gray-800 duration-500 text-gray-50 text-sm" onClick={handleGPCalculation}>
                                Calculate GP
                            </button>
                        )
                    }

                    {
                        courses.length > 0 && (
                            <button className="w-fit px-5 py-4 rounded-lg bg-gray-900 hover:bg-gray-800 duration-500 text-gray-50 text-sm" onClick={
                                () => setCourses([])
                            }>
                                Clear List
                            </button>
                        )
                    }
                </div>

            </div>
        </Layout>
    )
}