import React, { useState } from 'react';
import '.././index.css'

const LanguageSwitcherx = () => {
  // Initialize state to English
  const [language, setLanguage] = useState('English');

  // Define language options
  const languageOptions = [
    { label: 'ENGLISH', value: 'English' },
    { label: 'മലയാളം', value: 'Malayalam' },
    { label: 'हिंदी', value: 'Hindi' },
    { label: 'Français', value: 'French' },
  ];

  // Handle language change
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const [showLanguageSwitcher, setShowLanguageSwitcher] = useState(false);

  const toggleLanguageSwitcher = () => {
    setShowLanguageSwitcher(!showLanguageSwitcher);
  };

  return (
    <div className="language-switcher">
      {showLanguageSwitcher ? (
        <div>
          <select value={language} onChange={handleLanguageChange}>
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button onClick={toggleLanguageSwitcher}>𝓁𝑔</button>
        </div>
      ) : (
        <button onClick={toggleLanguageSwitcher}>诶𝒜</button>
      )}
    </div>
  );
};

export default LanguageSwitcherx;
