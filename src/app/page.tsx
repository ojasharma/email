"use client"; // This is needed because we are using client-side hooks like useState

import Head from "next/head"; // Still useful for title and meta tags
import React, { useState } from "react"; // Import useState

// --- Data: HOD Emails ---
const hods = [
  {
    department: "Aerospace Engineering",
    name: "Rakesh Kumar",
    email: "headaer@pec.edu.in",
  },
  {
    department: "Physics",
    name: "Sanjeev Kumar",
    email: "headphysics@pec.edu.in",
  },
  {
    department: "Chemistry",
    name: "Harminder Kaur",
    email: "headchemistry@pec.edu.in",
  },
  {
    department: "Mathematics",
    name: "Asha Gupta",
    email: "headmaths@pec.edu.in",
  },
  {
    department: "Civil Engineering",
    name: "S K Singh",
    email: "headcivil@pec.edu.in",
  },
  {
    department: "Computer Science & Engineering",
    name: "Trilok Chand",
    email: "headcse@pec.edu.in",
  },
  {
    department: "Electrical Engineering",
    name: "Rintu Khanna",
    email: "headelec@pec.edu.in",
  },
  {
    department: "Electronics Communication Engineering",
    name: "Arun Kumar Singh",
    email: "headec@pec.edu.in",
  },
  {
    department: "Mechanical Engineering",
    name: "Sanjeev Kumar",
    email: "headmech@pec.edu.in",
  },
  {
    department: "Metallurgical & Materials Engineering",
    name: "J. D. Sharma",
    email: "headmett@pec.edu.in",
  },
  {
    department: "Production & Industrial Engineering",
    name: "R.M. Belokar",
    email: "headprod@pec.edu.in",
  },
];

const fixedEmails = [
  "director@pec.edu.in",
  "deanaa@pec.edu.in",
  "deansw@pec.edu.in",
];

const fixedEmailsString = fixedEmails.join(", ");

// --- Data: Sample Email Content ---
const sampleEmailSubject =
  "Urgent Request for Reconsideration of Rescheduled End Term Exam Dates for 2nd and 3rd Year Students";
const sampleEmailBody = `To

The Dean Student Affairs

The Dean Academic Affairs

The DIrector
Punjab Engineering College (Deemed to be University)

Chandigarh
Subject: Urgent Request for Reconsideration of Rescheduled End Term Exam Dates for 2nd and 3rd Year Students
Respected Sir/Madam,
I am writing to express serious concern and disappointment regarding the sudden rescheduling of the End Term Examinations for 2nd and 3rd year students of the 24-25/2 semester.
As per the official Office Order dated 10 May 2025 (Ref: No. PEC/RG/Postponement of Examination/25/105), it was clearly stated that due to the prevailing national security situation—especially with the tension between India and Pakistan and Chandigarh being under red alert—the exams were postponed and would be held just before the commencement of the next semester in July 2025.
However, the recent circular issued on 15 May 2025 (Ref: PEC/Acad/1067) reschedules the exams to 27 May 2025, which is deeply unfair and impractical for students due to the following reasons:

Students had already left for their hometowns, some residing over 1000 to 2000 kilometers away, based on the official communication indicating July exams.
The unexpected change requires students to spend ₹10,000–₹15,000 or more on travel, a burden many are not prepared for at such short notice.
Peak summer travel season makes it extremely difficult to find affordable or even available flights or train tickets.
The extreme heat in many parts of the country makes long-distance travel especially strenuous and unsafe.
Many students had planned and committed to international or domestic research internships, including some who are currently living or interning abroad. Forcing them to return by 27 May is logistically and financially unfeasible.
Students also have pre-booked international trips and personal obligations that clash with the newly announced dates.
Preparing for exams while in transit or during travel is not viable, leading to academic stress and compromised performance.
The revised exam schedule is completely out of sync with the previously communicated plan, creating confusion and undermining students' ability to plan ahead responsibly.
In light of these reasons and the earlier official communication assuring exams would be held in July, we respectfully and firmly urge the administration to reconsider this sudden change and restore the original plan to conduct the exams just before the next semester begins.
This will not only bring clarity and relief to hundreds of students but also uphold the credibility and fairness of academic governance at PEC.
We hope you will consider our request and make a decision that is just, student-friendly, and consistent with your earlier assurance.
Thank you for your understanding and prompt attention.
Yours sincerely,

Name: ___________________________

Student ID: _______________________

Semester: _________________________

Branch: ___________________________

Year: _____________________________

Current Address: ____________________________________
`;

// --- Utility Function: Create Mailto Link ---
const createMailtoLink = (
  recipients: string[],
  subject: string,
  body: string
): string => {
  const to = recipients.join(",");
  const subjectEncoded = encodeURIComponent(subject);
  const bodyEncoded = encodeURIComponent(body);

  return `mailto:${to}?subject=${subjectEncoded}&body=${bodyEncoded}`;
};

// --- Local Component: Copy Button ---
const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Hide "Copied!" after 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
      // Optionally show an error message
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
};

// --- Main Page Component ---
export default function Home() {
  const mailtoLink = createMailtoLink(
    fixedEmails,
    sampleEmailSubject,
    sampleEmailBody
  );

  const [selectedHod, setSelectedHod] = useState("");
  const [selectedHodEmail, setSelectedHodEmail] = useState("");

  const handleHodSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDept = event.target.value;
    setSelectedHod(selectedDept);
    const hod = hods.find((h) => h.department === selectedDept);
    setSelectedHodEmail(hod ? hod.email : "");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>PEC Exam Reschedule Email Helper</title>
        <meta
          name="description"
          content="Easily draft emails to PEC authorities regarding the sudden exam schedule change."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-8">
          Email PEC Authorities about Exam Changes
        </h1>

        {/* --- Mail Draft Button --- */}
        <div className="text-center mb-8">
          <a
            href={mailtoLink}
            className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
          >
            Click to create a mail draft (please add your credentials)
          </a>
          <p className="mt-4 text-gray-400">
            or write a personalized email using the details below.
          </p>
        </div>

        {/* --- Fixed Emails Box --- */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-gray-200 mb-3">
            Key Authorities Emails
          </h3>
          <div className="flex items-center justify-between flex-wrap">
            <p className="text-gray-300 break-all mr-2">{fixedEmailsString}</p>
            <CopyButton textToCopy={fixedEmailsString} />
          </div>
        </div>

        {/* --- HOD Dropdown --- */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-gray-200 mb-3">
            Email by Department (HOD)
          </h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <select
              value={selectedHod}
              onChange={handleHodSelectChange}
              className="mb-3 sm:mb-0 sm:mr-4 px-3 py-2 bg-gray-700 text-gray-300 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
            >
              <option value="">Select Department</option>
              {hods.map((hod) => (
                <option key={hod.department} value={hod.department}>
                  {hod.department} ({hod.name})
                </option>
              ))}
            </select>
            {selectedHodEmail && (
              <div className="flex items-center justify-between w-full sm:w-auto">
                <p className="text-gray-300 break-all mr-2">
                  {selectedHodEmail}
                </p>
                <CopyButton textToCopy={selectedHodEmail} />
              </div>
            )}
          </div>
        </div>

        {/* --- Sample Email Section --- */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-gray-200 mb-3">
            Sample Email Draft
          </h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            {" "}
            {/* Use flex-col for mobile, flex-row for larger screens */}
            <textarea
              readOnly
              value={sampleEmailBody}
              className="flex-grow w-full sm:w-auto h-96 bg-gray-900 text-gray-300 p-3 rounded-md border border-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-2 sm:mb-0 sm:mr-2" // Added margin-bottom for mobile, margin-right for sm+
            />
            {/* Position the copy button nicely */}
            <div className="w-full sm:w-auto flex justify-end sm:justify-start">
              {" "}
              {/* Make copy button align right on mobile, left on sm+ */}
              <CopyButton textToCopy={sampleEmailBody} />
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>
            &copy; 2025 PEC Student Helper. Built with Next.js & Tailwind CSS.
          </p>
        </footer>
      </main>
    </div>
  );
}
