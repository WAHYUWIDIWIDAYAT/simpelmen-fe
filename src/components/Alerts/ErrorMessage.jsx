import React from 'react';
import { useState } from 'react';
import { BsExclamationCircleFill } from 'react-icons/bs';

function ErrorMessage({ referenceId, message, isPasswordField }) {
  const [tooltip, showTooltip] = useState(true);

  return (
    <p
      id={referenceId}
      className="ml-1 mt-1"
    >
      <BsExclamationCircleFill className="inline-block text-base mr-2 fill-red-500" />
      <span className="error-inputs">
        {isPasswordField ? (
          <>
            <span className="error-inputs mr-1">
              Mohon masukkan kata sandi dengan benar.
            </span>
            <span
              className="error-inputs underline underline-offset-1 cursor-pointer inline-block relative"
              onMouseEnter={() => showTooltip(true)}
              onMouseLeave={() => showTooltip(false)}
            >
              Tips
              {tooltip && (
                <span className="absolute p-3 bg-dark text-white top-7 right-0 z-50 w-52 rounded-lg translate-x-1/2">
                  <span className="text-white bg-dark !text-center">
                    Berisikan 8 sampai dengan 24 karakter.
                    <br />
                    Harus mengandung huruf besar, huruf kecil, angka, dan
                    karakter khusus.
                    <br />
                    Karakter khusus yang diperbolehkan adalah:
                    <br />
                    <span
                      className="text-sm text-red-500"
                      aria-label="exclamation mark"
                    >
                      !
                    </span>{' '}
                    <span
                      className="text-sm text-red-500"
                      aria-label="at symbol"
                    >
                      @
                    </span>{' '}
                    <span
                      className="text-sm text-red-500"
                      aria-label="hashtag"
                    >
                      #
                    </span>{' '}
                    <span
                      className="text-sm text-red-500"
                      aria-label="dollar sign"
                    >
                      $
                    </span>{' '}
                    <span
                      className="text-sm text-red-500"
                      aria-label="percent"
                    >
                      %
                    </span>
                  </span>
                </span>
              )}
            </span>
          </>
        ) : (
          <>{message}</>
        )}
      </span>
    </p>
  );
}

export default ErrorMessage;
