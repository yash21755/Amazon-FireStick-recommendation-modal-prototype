import React from "react";
const PersonalDetails = () => {
  return (
    <div className="bg-gray-800 p-3 rounded-lg shadow-lg max-w-2xl mx-auto text-white ">
      {/* Profile Image & Basic Info */}
      <div className="flex flex-col items-center">
        <img
          src="https://randomuser.me/api/portraits/women/12.jpg"
          alt="Profile"
          className="rounded-full w-32 h-32 mb-4 border-4 border-gray-600"
        />
        <h2 className="text-2xl font-bold">Casey Doe</h2>
        <p className="text-gray-400 text-sm">caseydoe@example.com</p>
        <p className="text-gray-500 text-xs">Username: casey_d</p>
      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-700" />

      {/* Account Information */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
        <p><span className="font-semibold text-white">Phone:</span> +91-9876543210</p>
        <p><span className="font-semibold text-white">Location:</span> Bangalore, India</p>
        <p><span className="font-semibold text-white">Language:</span> English</p>
        <p><span className="font-semibold text-white">Date of Birth:</span> Jan 15, 1995</p>
        <p><span className="font-semibold text-white">Account Type:</span> Premium</p>
        <p><span className="font-semibold text-white">Subscription Since:</span> Jan 2023</p>
        <p><span className="font-semibold text-white">Membership Level:</span> Platinum</p>
        <p><span className="font-semibold text-white">Next Billing Date:</span> July 01, 2025</p>
      </div>

      {/* Preferences */}
      <div className="mt-6 text-sm text-gray-300">
        <p><span className="font-semibold text-white">Preferred Genres:</span> Sci-Fi, Thriller, Documentaries</p>
        <p><span className="font-semibold text-white">Favorite Actor:</span> Cillian Murphy</p>
        <p><span className="font-semibold text-white">Watch Language:</span> English, Hindi</p>
      </div>

      {/* Social Logins */}
      <div className="mt-6 text-sm text-gray-300">
        <p><span className="font-semibold text-white">Linked Accounts:</span></p>
        <ul className="list-disc list-inside ml-4 mt-1">
          <li>Google - caseydoe@gmail.com</li>
          <li>Facebook - casey D</li>
        </ul>
      </div>

      {/* Bio */}
      <div className="mt-6 text-sm text-gray-300">
        <p><span className="font-semibold text-white">Bio:</span> Passionate about sci-fi shows, crime documentaries, and binge-watching new releases every weekend. Software engineer by day, couch critic by night.</p>
      </div>
    </div>
  );
};

export default PersonalDetails;
