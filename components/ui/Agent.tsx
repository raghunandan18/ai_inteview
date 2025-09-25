import React from 'react'
import Image from 'next/image';
import { cn } from '@/lib/utils';


enum CallStatus {
    INACTIVE = 'INACTIVE',
    ACTIVE = 'ACTIVE',
    CONNECTING = 'CONNECTING',
    DISCONNECTED = 'DISCONNECTED'
}

const Agent = ({userName}: AgentProps) => {
    const callStatus: CallStatus = CallStatus.DISCONNECTED;
    const isSpeaking = true; 
    const messages = [
        'whats your name?',
        'My name is Arya, nice to meet you!'
    ];

    const lastMessage = messages[messages.length -1];

    return (
        <>
        <div className="call-view">
            <div className = "card-interviewer">
                <div className = "avatar">
                    <Image src= "/ai-avatar.png" alt="vapi" width={65} height={54} className="object-cover"/> 
                    {isSpeaking && <span className= "animate-speak"/>}

                </div>
                <h3> AI Interview</h3>
            </div>

            <div className="card-border">
                <div className="card-content">
                    <Image src="/user-avatar.png" alt="user avatar" width={540} height={540} className="rounded-full object-cover size-[120px]"/>
                    <h3>{userName}</h3>

                </div>
            </div>
        </div>
            {messages.length > 0 && (
                <div className="transcript-border">
                    <div className="transcript">
                        <p key = {lastMessage} className ={cn('transition-opacity duration-500 opacity-0', 'animate fadeIn opacity-100')}>
                            {lastMessage}

                        </p>
                    </div>
                </div>
            )}

            <div className="w-full flex justify-center mt-4 ">
                {(callStatus as CallStatus) !== CallStatus.ACTIVE ? (
                    <button className="relative btn-call">
                        <span className={cn(
                            "absolute left-0 top-0 w-full h-full opacity-75 rounded-full animate-ping",
                            (callStatus as CallStatus) !== CallStatus.CONNECTING && "hidden"
                        )} />
                        <span>{
                            (callStatus as CallStatus) === CallStatus.INACTIVE || (callStatus as CallStatus) === CallStatus.DISCONNECTED
                                ? 'Call'
                                : 'Connecting...'
                        }</span>
                    </button>
                ) : (
                    <button className="">End Call</button>
                )}
            </div>
        </>
    )
}
export default Agent; 