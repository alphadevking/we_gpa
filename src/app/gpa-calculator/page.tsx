// "use client"
import { Metadata } from 'next';
import GPA from '../../pages/GPA';

export const metadata: Metadata = {
    title: 'GPA Calculator',
    description: 'GPA Calculator | weGPA is a dynamic GPA and CGPA calculator designed specifically for college students. It allows for seamless user experience and a feature to export GPA and CGPA result to PDF.'
}

export default function Page() {

    return (
        <>
            <GPA />
        </>
    )
}
