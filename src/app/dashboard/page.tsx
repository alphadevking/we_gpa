// "use client"
import { Dashboard } from '@/components/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'User Dashboard | weGPA is a dynamic GPA and CGPA calculator designed specifically for college students. It allows for seamless user experience and a feature to export GPA and CGPA result to PDF.'
}

export default function Page() {

    return (
        <>
            <Dashboard />
        </>
    )
}
