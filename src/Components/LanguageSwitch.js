import e from 'cors';
import { useState } from 'react';

const LanguageSwitch = () => {
  const [selectedLang, setSelectedLang] = useState('ENG'); // default language is ENG

  const handleLangChange = (lang) => {
    setSelectedLang(lang);
    const selectedLang = e.target.checked ? 'MAL' : 'ENG';
    localStorage.setItem('selectedLang', selectedLang);
    // you can add logic here to switch the language of your app
  };

 

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selectedLang}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li>
          <button
            className="dropdown-item"
            onClick={() => handleLangChange('ENG')}
          >
            ENG
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => handleLangChange('MAL')}
          >
            MAL
          </button>
        </li>
      </ul>
    </div>
  );
};
export default LanguageSwitch
