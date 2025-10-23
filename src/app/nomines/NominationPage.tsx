"use client";

import React, { useState } from 'react';
import { baseApiUrl } from "@/utils/ApiUtils";

export default function NominationForm() {
    const [activeSection, setActiveSection] = useState<
        'her-story-her-impact' | 'changemakers-award' | 'founders-story'
    >('her-story-her-impact');

    const [formData, setFormData] = useState({
        // Personal Information
        name: '',
        age: '',
        phoneNumber: '',
        email: '',
        address: '',
        currentOccupation: '',
        organizationName: '',
        linkdin: '',
        facebook: '',
        instagram: '',
        twitter: '',
        background: '',
        journey: '',
        impactArea: '',
        keyAchievements: '',
        challengesOvercome: '',
        recognitionReason: '',
        photos: null as FileList | null,
        videos: null as FileList | null,
        mediaCoverage: null as FileList | null,
        consent: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadError, setUploadError] = useState<string | null>(null);

    // File size limits
    const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB
    const MAX_PHOTO_SIZE = 10 * 1024 * 1024; // 10MB
    const MAX_DOC_SIZE = 10 * 1024 * 1024; // 10MB

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (type === 'file') {
            const files = (e.target as HTMLInputElement).files;

            // Validate file sizes before setting state
            if (files) {
                let isValid = true;

                if (name === 'videos') {
                    for (let i = 0; i < files.length; i++) {
                        if (files[i].size > MAX_VIDEO_SIZE) {
                            setUploadError(`Video ${files[i].name} exceeds 50MB limit`);
                            isValid = false;
                            break;
                        }
                    }
                }
                else if (name === 'photos') {
                    for (let i = 0; i < files.length; i++) {
                        if (files[i].size > MAX_PHOTO_SIZE) {
                            setUploadError(`Photo ${files[i].name} exceeds 10MB limit`);
                            isValid = false;
                            break;
                        }
                    }
                }
                else if (name === 'mediaCoverage') {
                    for (let i = 0; i < files.length; i++) {
                        if (files[i].size > MAX_DOC_SIZE) {
                            setUploadError(`Document ${files[i].name} exceeds 10MB limit`);
                            isValid = false;
                            break;
                        }
                    }
                }

                if (isValid) {
                    setUploadError(null);
                    setFormData(prev => ({ ...prev, [name]: files }));
                }
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const uploadFiles = async (files: FileList | null,) => {
        if (!files) return null;

        const uploadResults = await Promise.all(
            Array.from(files).map(async (file) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('folder', "nomination");

                return new Promise<string>((resolve, reject) => {
                    const xhr = new XMLHttpRequest();

                    xhr.upload.addEventListener('progress', (event) => {
                        if (event.lengthComputable) {
                            const percentComplete = Math.round((event.loaded / event.total) * 100);
                            setUploadProgress(prev => Math.max(prev, percentComplete));
                        }
                    });

                    xhr.onreadystatechange = () => {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200) {
                                const result = JSON.parse(xhr.responseText);
                                resolve(result.url);
                            } else {
                                reject(new Error(xhr.statusText || 'Upload failed'));
                            }
                        }
                    };

                    xhr.open('POST', `${baseApiUrl}upload`, true);
                    xhr.send(formData);
                });
            })
        );

        return uploadResults.join(',');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.consent) {
            alert('Please agree to the consent terms');
            return;
        }

        setIsSubmitting(true);
        setUploadProgress(0);
        setUploadError(null);

        try {
            // Upload files with progress tracking
            const [photos, videos, mediaCoverage] = await Promise.all([
                uploadFiles(formData.photos),
                uploadFiles(formData.videos),
                uploadFiles(formData.mediaCoverage),
            ]);

            // Prepare data for API
            const submissionData = {
                award: activeSection,
                name: formData.name,
                age: formData.age,
                phoneNumber: formData.phoneNumber,
                email: formData.email,
                address: formData.address,
                currentOccupation: formData.currentOccupation,
                organizationName: formData.organizationName,
                linkdin: formData.linkdin,
                facebook: formData.facebook,
                instagram: formData.instagram,
                twitter: formData.twitter,
                background: formData.background,
                journey: formData.journey,
                impactArea: formData.impactArea,
                keyAchievements: formData.keyAchievements,
                challengesOvercome: formData.challengesOvercome,
                recognitionReason: formData.recognitionReason,
                photos,
                videos,
                mediaCoverage,
                consent: formData.consent
            };

            // Submit to API route
            const response = await fetch(`${baseApiUrl}nominees/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            });

            if (!response.ok) {
                throw new Error('Submission failed');
            }

            const nominee = await response.json();
            alert(`${nominee.name} nomination form submitted successfully!`);

            // Reset form
            setFormData({
                name: '',
                age: '',
                phoneNumber: '',
                email: '',
                address: '',
                currentOccupation: '',
                organizationName: '',
                linkdin: '',
                facebook: '',
                instagram: '',
                twitter: '',
                background: '',
                journey: '',
                impactArea: '',
                keyAchievements: '',
                challengesOvercome: '',
                recognitionReason: '',
                photos: null,
                videos: null,
                mediaCoverage: null,
                consent: false
            });

        } catch (error) {
            console.error('Error submitting form:', error);
            setUploadError(error instanceof Error ? error.message : 'Error submitting form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const sectionDescriptions = {
        'her-story-her-impact': {
            title: "Her Story Her Impact",
            description: "This category celebrates woman who have overcome challenges and driven meaningful change through their work-whether in education, healthcare, business, social justice, or beyond.",
            submitText: "Submit Nomination"
        },
        'changemakers-award': {
            title: "The Changemakers Award",
            description: "Join our network of individuals driving social change. Whether you're an activist, volunteer, or community leader, this platform connects you with like-minded changemakers.",
            submitText: "Join Awards"
        },
        'founders-story': {
            title: "Founder's Connect",
            description: "Meet the vision behind the mission. Connect directly with our founder to share ideas, discuss challenges, or explore happens when passionate minds work together.",
            submitText: "Send Message"
        },
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Loading overlay */}
            {isSubmitting && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h3 className="text-lg font-medium mb-4">Submitting your nomination...</h3>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-primary h-2.5 rounded-full"
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                            {uploadProgress}% complete - Please don&apos;t close this window
                        </p>
                    </div>
                </div>
            )}

            {/* Error message */}
            {uploadError && (
                <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
                    <span className="block sm:inline">{uploadError}</span>
                    <button
                        className="absolute top-0 right-0 px-2 py-1"
                        onClick={() => setUploadError(null)}
                    >
                        ×
                    </button>
                </div>
            )}

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
                                onClick={() => setActiveSection(key as "her-story-her-impact" | "changemakers-award" | "founders-story")}
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
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                {sectionDescriptions[activeSection].title}
                            </h2>
                            <p className="text-lg text-gray-600">
                                {sectionDescriptions[activeSection].description}
                            </p>
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
                                            name="name"
                                            value={formData.name}
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
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-border outline-0 rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-border outline-0 rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
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
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Linkdin</label>
                                        <input
                                            type="text"
                                            name="linkdin"
                                            value={formData.linkdin}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-border outline-0 rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent"
                                            placeholder="LinkedIn"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                                        <input
                                            type="text"
                                            name="instagram"
                                            value={formData.instagram}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-border outline-0 rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent"
                                            placeholder="Instagram"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                                        <input
                                            type="text"
                                            name="twitter"
                                            value={formData.twitter}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-border outline-0 rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent"
                                            placeholder="Twitter"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                                        <input
                                            type="text"
                                            name="facebook"
                                            value={formData.facebook}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-border outline-0 rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent"
                                            placeholder="Facebook"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Story/Narrative Section */}
                            <div className="space-y-6 p-8">
                                <div className="flex items-center">
                                    <div className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full mr-4 text-lg font-bold">3</div>
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {activeSection === 'her-story-her-impact' ? "Story of Impact" : "Your Story"}
                                    </h3>
                                </div>
                                <div className="space-y-6">

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Background (Early life & challenges) (250 words) *</label>
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
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Journey (Key milestones & achievements) (250 words) *</label>
                                        <textarea
                                            name="journey"
                                            value={formData.journey}
                                            onChange={handleChange}
                                            rows={5}
                                            className="w-full px-4 py-3 border border-border outline-0 rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {activeSection === 'her-story-her-impact' ? "Impact Area (Education, Health, etc.) *" : "Area of Impact *"}
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
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Key Achievements (250 words) *</label>
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
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Challenges Overcome (250 words) *</label>
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
                                            {activeSection === 'her-story-her-impact' ? "Why You Deserve Recognition (250 words) *" : "Your Motivation (250 words) *"}
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

                            {/* Consent Section */}
                            <div className="space-y-6 p-8">
                                <div className="flex items-center">
                                    <div className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full mr-4 text-lg font-bold">
                                        {activeSection === 'her-story-her-impact' ? '5' : '4'}
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
                                    disabled={isSubmitting}
                                    className={`px-8 py-4 bg-primary text-white font-bold rounded-lg shadow-lg transition-all ${isSubmitting
                                            ? 'opacity-70 cursor-not-allowed'
                                            : 'hover:shadow-xl hover:scale-105'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : (
                                        sectionDescriptions[activeSection].submitText
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