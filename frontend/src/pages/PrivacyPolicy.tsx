function PrivacyPolicy() {
  return (
    <div className="w-full px-6 md:px-[20%] py-10 md:py-20 bg-white text-black">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-yellow-400">
        Privacy Policy
      </h1>
      <p className="text-base md:text-lg leading-relaxed mb-6">
        At Eventous, your privacy is very important to us. This policy outlines
        how we collect, use, and protect your information.
      </p>

      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">
          1. Information We Collect
        </h2>
        <p className="text-base leading-relaxed">
          We collect personal information you provide when creating an account,
          such as your name, email, and profile picture. We also gather
          event-related data and analytics to improve our services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">
          2. How We Use Your Information
        </h2>
        <p className="text-base leading-relaxed">
          We use your data to personalize your experience, provide event
          features, and send important updates. We do not sell your information
          to third parties.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">
          3. Data Security
        </h2>
        <p className="text-base leading-relaxed">
          We implement industry-standard security measures to protect your data.
          However, no system is 100% secure, and we recommend you take
          precautions with your account.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">
          4. Your Rights
        </h2>
        <p className="text-base leading-relaxed">
          You can request to view, update, or delete your information at any
          time. Contact us if you have any privacy concerns.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-semibold mb-2">
          5. Changes to This Policy
        </h2>
        <p className="text-base leading-relaxed">
          We may update our Privacy Policy from time to time. Changes will be
          posted here with a revised date.
        </p>
        <p className="mt-4 text-sm text-gray-500">Last updated: April 2025</p>
      </section>
    </div>
  );
}

export default PrivacyPolicy;
