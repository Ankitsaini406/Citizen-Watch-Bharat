"use client";

import { useState } from 'react';

export default function Page() {
    const [activeSection, setActiveSection] = useState<'her-story' | 'changemakers' | 'founders-story'>('her-story');
    const [formData, setFormData] = useState({
        // Personal Information
        fullName: '',
        age: '',
        contactNumber: '',
        emailAddress: '',
        cityState: '',

        // Professional/Social Identity
        currentOccupation: '',
        organizationName: '',
        socialMediaHandles: '',

        // Story of Impact
        background: '',
        journey: '',
        impactArea: '',
        keyAchievements: '',
        challengesOvercome: '',

        // Why Deserves Recognition
        recognitionReason: '',

        // Supporting Evidence
        photos: null as FileList | null,
        videos: null as FileList | null,
        mediaCoverage: null as FileList | null,

        // Consent
        consent: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (type === 'file') {
            const files = (e.target as HTMLInputElement).files;
            setFormData(prev => ({ ...prev, [name]: files }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Form submitted successfully!');
    };

    const sectionDescriptions = {
        'her-story': {
            title: "Her Story Her Impact",
            description: "This category celebrates woman who have overcome challenges and driven meaningful change through their work-whether in education, healthcare, business, social justice, or beyond.",
            submitText: "Submit Nomination"
        },
        'changemakers': {
            title: "The Changemakers Award",
            description: "Join our network of individuals driving social change. Whether you're an activist, volunteer, or community leader, this platform connects you with like-minded changemakers.",
            submitText: "Join Awards"
        },
        'founders-story': {
            title: "The Founder's Story",
            description: "Meet the vision behind the mission. Connect directly with our founder to share ideas, discuss challenges, or explore happens when passionate minds work together.",
            submitText: "Send Message"
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-primary py-16 text-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                        Citizen Watch Bharat Impact Platform
                    </h1>
                    <p className="text-xl max-w-3xl">
                        Celebrating and connecting changemakers driving positive impact across India.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                {/* Form Selection */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Category</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Object.entries(sectionDescriptions).map(([key, { title, description }]) => (
                            <div 
                                key={key}
                                onClick={() => setActiveSection(key as "her-story" | "changemakers" | "founders-story")}
                                className={`p-6 rounded-xl cursor-pointer transition-all ${activeSection === key ? 'bg-white shadow-lg border-2 border-primary' : 'bg-gray-100 hover:bg-gray-200'}`}
                            >
                                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                                <p className="text-gray-600">{description}</p>
                                <div className="mt-4">
                                    <span className={`inline-block px-4 py-2 rounded-md ${activeSection === key ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}>
                                        {activeSection === key ? 'Selected' : 'Select'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-8">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">{sectionDescriptions[activeSection].title}</h2>
                            <p className="text-lg text-gray-600">{sectionDescriptions[activeSection].description}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Personal Information Section */}
                            <div className="space-y-6 p-8">
                                <div className="flex items-center">
                                    <div className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full mr-4 text-lg font-bold">1</div>
                                    <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-border outline-0 rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                                        <input
                                            type="text"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-border outline-0 rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number *</label>
                                        <input
                                            type="tel"
                                            name="contactNumber"
                                            value={formData.contactNumber}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-border outline-0 rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                        <input
                                            type="email"
                                            name="emailAddress"
                                            value={formData.emailAddress}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-border outline-0 rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">City & State *</label>
                                        <input
                                            type="text"
                                            name="cityState"
                                            value={formData.cityState}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-border outline-0 rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Professional Information Section */}
                            <div className="space-y-6 p-8">
                                <div className="flex items-center">
                                    <div className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full mr-4 text-lg font-bold">2</div>
                                    <h3 className="text-xl font-semibold text-gray-800">Professional Information</h3>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Occupation/Role *</label>
                                        <input
                                            type="text"
                                            name="currentOccupation"
                                            value={formData.currentOccupation}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-border outline-0 rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Organization/Initiative Name</label>
                                        <input
                                            type="text"
                                            name="organizationName"
                                            value={formData.organizationName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-border outline-0 rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Social Media Handles</label>
                                        <input
                                            type="text"
                                            name="socialMediaHandles"
                                            value={formData.socialMediaHandles}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-border outline-0 rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent"
                                            placeholder="LinkedIn, Instagram, Twitter, etc."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Story/Narrative Section */}
                            <div className="space-y-6 p-8">
                                <div className="flex items-center">
                                    <div className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full mr-4 text-lg font-bold">3</div>
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {activeSection === 'her-story' ? "Story of Impact" : "Your Story"}
                                    </h3>
                                </div>
                                <div className="space-y-6">
                                    {activeSection === 'her-story' && (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Background (Early life & challenges) *</label>
                                                <textarea
                                                    name="background"
                                                    value={formData.background}
                                                    onChange={handleChange}
                                                    rows={5}
                                                    className="w-full px-4 py-3 border border-border outline-0 rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Journey (Key milestones & achievements) *</label>
                                                <textarea
                                                    name="journey"
                                                    value={formData.journey}
                                                    onChange={handleChange}
                                                    rows={5}
                                                    className="w-full px-4 py-3 border border-border outline-0 rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent"
                                                    required
                                                />
                                            </div>
                                        </>
                                    )}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {activeSection === 'her-story' ? "Impact Area (Education, health, etc.) *" : "Area of Impact *"}
                                        </label>
                                        <input
                                            type="text"
                                            name="impactArea"
                                            value={formData.impactArea}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-border outline-0 rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Key Achievements *</label>
                                        <textarea
                                            name="keyAchievements"
                                            value={formData.keyAchievements}
                                            onChange={handleChange}
                                            rows={5}
                                            className="w-full px-4 py-3 border border-border outline-0 rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Challenges Overcome *</label>
                                        <textarea
                                            name="challengesOvercome"
                                            value={formData.challengesOvercome}
                                            onChange={handleChange}
                                            rows={5}
                                            className="w-full px-4 py-3 border border-border outline-0 rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {activeSection === 'her-story' ? "Why You Deserve Recognition (250-500 words) *" : "Your Motivation *"}
                                        </label>
                                        <textarea
                                            name="recognitionReason"
                                            value={formData.recognitionReason}
                                            onChange={handleChange}
                                            rows={8}
                                            className="w-full px-4 py-3 border border-border outline-0 rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Supporting Documents Section - Only for Her Story */}
                            {activeSection === 'her-story' && (
                                <div className="space-y-6 p-8 ">
                                    <div className="flex items-center">
                                        <div className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full mr-4 text-lg font-bold">4</div>
                                        <h3 className="text-xl font-semibold text-gray-800">Supporting Documents</h3>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Photos (Professional/Work-in-action)</label>
                                            <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-gray-300 border-dashed rounded-lg">
                                                <div className="space-y-2 text-center">
                                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    <div className="flex text-sm text-gray-600 justify-center">
                                                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none">
                                                            <span>Upload files</span>
                                                            <input
                                                                type="file"
                                                                name="photos"
                                                                onChange={handleChange}
                                                                className="sr-only"
                                                                multiple
                                                                accept="image/*"
                                                            />
                                                        </label>
                                                        <p className="pl-1">or drag and drop</p>
                                                    </div>
                                                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Videos (if available)</label>
                                            <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-gray-300 border-dashed rounded-lg">
                                                <div className="space-y-2 text-center">
                                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                        <path d="M16 16v16h16V16H16z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M4 20v8a4 4 0 004 4h12m16-12v8a4 4 0 01-4 4H16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    <div className="flex text-sm text-gray-600 justify-center">
                                                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none">
                                                            <span>Upload files</span>
                                                            <input
                                                                type="file"
                                                                name="videos"
                                                                onChange={handleChange}
                                                                className="sr-only"
                                                                multiple
                                                                accept="video/*"
                                                            />
                                                        </label>
                                                        <p className="pl-1">or drag and drop</p>
                                                    </div>
                                                    <p className="text-xs text-gray-500">MP4, MOV up to 50MB</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Media Coverage or Testimonials (optional)</label>
                                            <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-gray-300 border-dashed rounded-lg">
                                                <div className="space-y-2 text-center">
                                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    <div className="flex text-sm text-gray-600 justify-center">
                                                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none">
                                                            <span>Upload files</span>
                                                            <input
                                                                type="file"
                                                                name="mediaCoverage"
                                                                onChange={handleChange}
                                                                className="sr-only"
                                                                multiple
                                                            />
                                                        </label>
                                                        <p className="pl-1">or drag and drop</p>
                                                    </div>
                                                    <p className="text-xs text-gray-500">PDF, DOCX up to 10MB</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Consent Section */}
                            <div className="space-y-6 p-8">
                                <div className="flex items-center">
                                    <div className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full mr-4 text-lg font-bold">
                                        {activeSection === 'her-story' ? '5' : '4'}
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800">Consent & Verification</h3>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5 mt-1">
                                        <input
                                            type="checkbox"
                                            name="consent"
                                            checked={formData.consent}
                                            onChange={handleChange}
                                            className="focus:ring-primary h-5 w-5 text-primary border-gray-300 rounded"
                                            required
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label className="font-medium text-gray-700">
                                            I declare that the information provided is true and correct to the best of my knowledge.
                                            I consent to the use of my story, photos, and videos for the purpose of publication
                                            and broadcast by Citizen Watch Bharat.
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-primary text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 transform"
                                >
                                    {sectionDescriptions[activeSection].submitText}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-800 text-white py-8">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-xl font-bold">Citizen Watch Bharat</h3>
                            <p className="text-gray-400">Celebrating Impact, Inspiring Change</p>
                        </div>
                        <div className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Citizen Watch Bharat. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}