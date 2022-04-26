import React from 'react'
import { ReactComponent as Productive} from '../../assets/scene.svg'
import NavBar from '../../components/NavBar/NavBar'
import {ReactComponent as LinkedIn} from '../../assets/linkedin-130.svg'
const AboutPage = () => {
    const roomId = ''
    return (
        <div className='About'>
            <div className="flex flex-row justify-center items-start my-24 mx-28">
                <div className='mx - 5 w-2/4'>
                    <h1 className="text-indigo-400 text-3xl font-bold my-4">The HUDDL STORY</h1>
                    <div className="border-indigo-500 my-4 rounded-md border-2"/>
                    <p className='text-white text-xl tracking-wide'>
                        Since remote work is on the rise, although there are multiple applications that aim at real-time collaboration from anywhere in the world, 
                        we intend to reduce the number of applications you need to use for your collaboration needs. No more discord on one window, Google Docs in another window. 
                        We wanted to build an all in one feature-packed application that we didn’t want the users to be bugged about signing up and use it 
                        hassle-free with an amazing UI. We were inspired by real-time collaboration tools like Figma and  Google Docs and wanted to focus 
                        on the productivity aspect and document collaboration.

                    </p>
                    <div className="flex flex-col justify-start items-start" >
                    <h1 className="text-indigo-400 text-2xl font-bold my-4">Contact Us</h1>
                        <div className='my-5 flex'>
                            <LinkedIn className="h-7"/>
                            <span className="text-white"><a href='https://www.linkedin.com/in/sohankumar-t-r-126114209/'>Sohankumar T R</a></span>
                        </div>
                        <div className='my-5 flex'>
                            <LinkedIn className="h-7"/>
                            <span className="text-white"><a href="https://www.linkedin.com/in/siddharthvaddem/">Siddharth Vaddem</a></span>
                        </div>
                        <div className='my-5 flex'>
                            <LinkedIn className="h-7"/>
                            <span className="text-white"><a href='https://www.linkedin.com/in/vishal-hanuman-a478a0228/'>Vishal Hanuman</a></span>
                        </div>
                        <div className='my-5 flex'>
                            <LinkedIn className="h-7"/>
                            <span className="text-white"><a href='https://www.linkedin.com/in/syed-tabraiz/'>Syed Tabraiz</a></span>
                        </div>
                    </div>
                </div>
                <Productive className="h-128 mx-5 w-2/4" />
            </div>
        </div>
    )
}
export default AboutPage;