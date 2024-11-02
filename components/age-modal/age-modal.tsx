'use client';
import { BrandAccentedHeadings } from 'components/typography';
import React, { useEffect } from 'react';
import { useAgeConfirmation } from './context/age-modal-context';

const AgeConfirmationModal: React.FC = () => {
  const { ageConfirmed, confirmAge } = useAgeConfirmation();

  useEffect(() => {
    if (!ageConfirmed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [ageConfirmed]);

  if (ageConfirmed) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <BrandAccentedHeadings
          headingCopy="Confirm Your Age"
          headingLevel={2}
          variant="AccentFirstAndLast"
        />
        <button
          className="mt-6 rounded-md border-2 border-theme-primary/50 px-5 py-2 text-theme-primary shadow-md hover:bg-theme-primary hover:text-neutral-100"
          onClick={confirmAge}
        >
          I am 21 or older
        </button>
      </div>
    </div>
  );
};

export default AgeConfirmationModal;
