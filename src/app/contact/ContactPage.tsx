"use client";

import { LocateFixed, Mail, MessageSquare, Newspaper, Send } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            if (!result.success) {
                alert('Somthing Wrong');
                return null;
            }
            alert('Thank you for your message! Our editorial team will review it shortly.');
                setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen py-6 md:py-12 px-4 sm:px-6 lg:px-8">
            <div className='relative w-full h-[20vh] md:h-[25vh] lg:h-[30vh] xl:h-[40vh] mb-10'>
                <Image src='/cover.webp' alt='Cover Photo' fill />
            </div>
            <div className="max-w-7xl mx-auto">
                {/* Page Header with News Theme */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <Newspaper className="text-red-600 h-12 w-12" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Citizen Watch Bharat</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Your voice matters to us. Reach our editorial team with news tips, corrections, or feedback.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* News-Specific Contact Information */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <MessageSquare className="text-red-600" />
                                News Desk Contacts
                            </h2>

                            <div className="space-y-6">
                                {/* <div className="flex items-start gap-4">
                                    <div className="bg-red-100 p-3 rounded-full">
                                        <Phone className="text-red-600 text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">News Tips Hotline</h3>
                                        <p className="text-gray-600">
                                            <a href="tel:+918058885858" className="text-red-600 hover:underline">
                                                +91 8058885858 (24/7)
                                            </a>
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">For urgent news tips and leads</p>
                                    </div>
                                </div> */}

                                <div className="flex items-start gap-4">
                                    <div className="bg-red-100 p-3 rounded-full">
                                        <Mail className="text-red-600 text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">Editorial Email</h3>
                                        <p className="text-gray-600">
                                            <a href="mailto:info@citizenwatchbharat.com" className="text-red-600 hover:underline">
                                                info@citizenwatchbharat.com
                                            </a>
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">For story submissions and editorial inquiries</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-red-100 p-3 rounded-full">
                                        <LocateFixed className="text-red-600 text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">Newsroom Address</h3>
                                        <p className="text-gray-600">WeBrain Tech Academy Complex</p>
                                        <p className="text-gray-600">Opp. Mangal Transport, Near Chandpole Gate</p>
                                        <p className="text-gray-600">Sikar (Raj.) - 332001</p>
                                        <p className="text-sm text-gray-500 mt-1">Visits by appointment only</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Editorial Guidelines */}
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Editorial Guidelines</h2>
                            <div className="space-y-4">
                                <p className="text-gray-600">
                                    We welcome news tips from the public. Please note that all submissions are subject to verification by our editorial team.
                                </p>
                                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                    <li>Include verifiable sources whenever possible</li>
                                    <li>Provide contact information for follow-up</li>
                                    <li>Clearly mark any confidential information</li>
                                    <li>Allow 1-3 business days for response</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form with News Focus */}
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">News Tip Submission</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Your Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                                    placeholder="Full Name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                    Subject <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                                >
                                    <option value="">Select a category</option>
                                    <option value="News Tip">News Tip</option>
                                    <option value="Correction">Citizen FIR</option>
                                    <option value="Feedback">General Feedback</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                    Your Message <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                                    placeholder="Please include all relevant details you can provide..."
                                ></textarea>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                >
                                    {isSubmitting ? (
                                        'Submitting...'
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-5 w-5" />
                                            Submit
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}