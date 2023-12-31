// "use client"
import { Metadata } from 'next'
import CGPA from '../../pages/CGPA'

export const metadata: Metadata = {
    title: 'CGPA Calculator',
    description: 'CGPA Calculator | weGPA is a dynamic GPA and CGPA calculator designed specifically for college students. It allows for seamless user experience and a feature to export GPA and CGPA result to PDF.'
}

export default function Page() {

    return (
        <>
            <CGPA />
        </>
    )
}
