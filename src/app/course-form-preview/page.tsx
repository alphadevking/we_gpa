// "use client"
import { CourseFormPreview } from '@/components/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Preview Course Forms',
    description: 'weGPA is a dynamic GPA and CGPA calculator designed specifically for college students. It allows for seamless user experience and a feature to export GPA and CGPA result to PDF.'
}

export default function Page() {

    return (
        <>
            <CourseFormPreview />
        </>
    )
}
