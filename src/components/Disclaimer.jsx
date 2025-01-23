import './landingPage.css';
import { useNavigate } from 'react-router-dom';

const Disclaimer = () => {
    const navigate = useNavigate();
    const handleReturn = () => {
        navigate('/start');
    }
    return (
        <div className='min-h-screen bg-startBG text-white font-ibm-plex-mono text-disclaimerTextBG md:px-20 md:py-14 mobile-s:px-4 mobile-s:py-4 '>
            <span className='flex flex-row align-center justify-between'>
                <h1 className='mobile-s:text-2xl md:text-4xl font-semibold'>
                    Disclaimer
                </h1>
                <img src='./x.svg' alt='x' className='cursor-pointer mobile-s:w-8 md:w-10' onClick={handleReturn} />
            </span>
            <div className='space-y-4 mt-6'>
                <h3 className='mobile-s:text-base md:text-xl font-bold'>
                    Terms and Conditions
                </h3>
                <p className='mobile-s:text-sm md:base'>
                    Welcome to the Product Maturity Assessment App ("the App," "we," "our," or "us"). The Product Maturity Assessment app helps evaluate product development maturity across key dimensions such as strategy, processes, technology, and culture, through targeted series of questions, and providing a detailed summary of strengths, weaknesses, and actionable recommendations to improve product development strategies and processes.
                    By accessing or using our App, you agree to comply with and be bound by the following Terms and Conditions ("Terms"). If you do not agree to these Terms, you may not use the App.
                </p>
                <h3 className='mobile-s:text-base md:text-xl font-bold'>
                    1. Acceptance of Terms
                </h3>
                <p className='mobile-s:text-sm md:base'>
                    By using the App, you agree to be bound by these Terms and any future updates or modifications. We reserve the right to modify, update, or change these Terms at any time. Any changes will be effective immediately upon posting on this page, and your continued use of the App signifies your acceptance of those changes.
                </p>
                <h3 className='mobile-s:text-base md:text-xl font-bold'>
                    2. Use of Personal Data
                </h3>
                <p className='mobile-s:text-sm md:base'>
                    We collect only your email address for the purpose of communication. Your email address will not be shared with third parties unless required by law or for providing the service you requested.
                    By using the App, you consent to the collection and processing of your email address in accordance with our Privacy Policy.
                </p>
                <h3 className='mobile-s:text-base md:text-xl font-bold'>
                    4. OpenAI Integration
                </h3>
                <p className='mobile-s:text-sm md:base'>
                    The App uses OpenAI’s technology (such as GPT models) to analyze responses and provide real-time feedback. This analysis is generated based on the input you provide within the App. We do not store or use your email address in connection with the generation of answers. OpenAI’s models operate independently of any personally identifiable information you provide, but your usage may be subject to OpenAI’s terms of service and privacy policy.
                </p>
                <h3 className='mobile-s:text-base md:text-xl font-bold'>
                    5. User Responsibilities
                </h3>
                <p className='mobile-s:text-sm md:base'>
                    You agree not to use the App for any unlawful purpose or in a way that violates these Terms.
                    <br />
                    You agree not to:
                    <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                        <li>Engage in any activity that disrupts or interferes with the functioning of the App.</li>
                        <li>Use the App to generate or share content that is illegal, harmful, or violates the rights of others.</li>
                        <li>Use the App to collect personal data from other users.</li>
                    </ul>
                </p>
                <h3 className='mobile-s:text-base md:text-xl font-bold'>
                    6. Intellectual Property
                </h3>
                <p className='mobile-s:text-sm md:base'>
                    The content, features, and functionality of the App, including all text, images, software, and designs, are owned by Modus Create LLC or licensed to us and are protected by copyright, trademark, and other intellectual property laws.
                    <br />
                    You may not reproduce, distribute, or otherwise use any part of the App without our express written consent
                </p>
                <h3 className='mobile-s:text-base md:text-xl font-bold'>
                    7. Limitation of Liability
                </h3>
                <p className='mobile-s:text-sm md:base'>
                    To the fullest extent permitted by applicable law, Modus Create LLC and its affiliates, directors, employees, or agents shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the App, including but not limited to, any errors or omissions in the content generated by OpenAI.
                </p>
                <h3 className='mobile-s:text-base md:text-xl font-bold'>
                    8. Disclaimers
                </h3>
                <p className='mobile-s:text-sm md:base'>
                    The App is provided "as is" and "as available" without any warranties or representations, express or implied, including but not limited to, the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not guarantee the accuracy, completeness, or reliability of the information generated by the App.
                </p>
                <h3 className='mobile-s:text-base md:text-xl font-bold'>
                    9. Privacy Policy
                </h3>
                <p className='mobile-s:text-sm md:base'>
                    Your use of the App is also governed by our Privacy Policy, which can be found at https://moduscreate.com/privacy-policy/. Please read it carefully to understand how we collect, use, and protect your personal information.
                </p>
                <h3 className='mobile-s:text-base md:text-xl font-bold'>
                    10. Termination
                </h3>
                <p className='mobile-s:text-sm md:base'>
                    We reserve the right to suspend or terminate your access to the App at any time, with or without cause, without prior notice.
                </p>
                <h3 className='mobile-s:text-base md:text-xl font-bold'>
                    11. Governing Law
                </h3>
                <p className='mobile-s:text-sm md:base'>
                    These terms shall be governed by the laws of the Commonwealth of Virginia, without regard to its choice of law provisions, and the Parties agree that any litigation arising hereunder or with relation hereto shall be brought in the courts of the Commonwealth of Virginia, County of Fairfax.
                </p>
                <h3 className='mobile-s:text-base md:text-xl font-bold'>
                    12. Contact Us
                </h3>
                <p className='mobile-s:text-sm md:base'>
                    If you have any questions about these Terms and Conditions, please contact us at email: dataprotection@moduscreate.com.
                </p>
                <h3 className='mobile-s:text-base md:text-xl font-bold'>
                    13. Severability
                </h3>
                <p className='mobile-s:text-sm md:base'>
                    If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.
                </p>
                <h3 className='mobile-s:text-base md:text-xl font-bold'>
                    14. Entire Agreement
                </h3>
                <p className='mobile-s:text-sm md:base'>
                    These Terms represent the entire agreement between you and Modus Create LLC concerning the use of the App and supersede all prior or contemporaneous agreements, understandings, and communications.
                    <br />
                    By using the App, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                </p>
            </div>
        </div>
    );
};

export default Disclaimer;
