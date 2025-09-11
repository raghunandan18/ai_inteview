import { getRandomInterviewCover } from '@/lib/utils';
import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import DisplayTechIcons from './DisplayTechIcons';

const InterviewCard = ({ interviewId, userId, role, type, techstack, createdAt }:InterviewCardProps) => {
    const feedback = null as Feedback | null;
    const normalizedType = /mix/gi.test(type) ? 'mixed' : type;
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM, D, YYYY');
    return (
         <div className = "card-border w-[360px] max-sm:w-full min-h-96 ">
            <div className="card-interview">
                <div>
                    <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-gradient-to-br from-purple-600 to-blue-600 text-white text-sm font-medium  '>
                        <p className="badge-text">{ normalizedType } </p>
                    </div>
                    <Image src ={getRandomInterviewCover()} alt="interview cover" width={90} height={90} className="rounded-full object-fit size-[90px] rounded-t-lg"/>
                    <h3 className="text-lg font-semibold mt-4">
                        { role }Interview
                    </h3>
                    <div className="flex flex-row gap-5 mt-2">
                        <div className='flex flex-row gap-2'> 
                            <Image src ="/calendar.svg" alt="calendar" width={22} height={22} />
                            <p className="text-sm">{ formattedDate }</p>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <Image src ="/star.svg" alt="star" width={22} height={22} />
                            <p className="text-sm">{ feedback ?.totalScore ||'---' }/100</p> 
                        </div>
                    </div>
                </div>
                <p className="line-clamp -2 mt-5">
                { feedback ?.finalAssessment || "you haven't taken this interview yet. Take it now to improve your skills!" }
                </p>
            </div>
                <div className="flex flex-row justify-between items-center p-4">
                <DisplayTechIcons techStack={techstack} />
                <Button className="btn-primary">
                    <Link href={feedback ? `/interview/${interviewId}/review` : `/interview/${interviewId}`}>
                    { feedback ? 'Review' : 'Take Interview' }
                    </Link>
                </Button>
                </div>
                           
        </div>
    )
}
export default InterviewCard