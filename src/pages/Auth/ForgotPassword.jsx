import React, { useEffect, useState } from 'react';
import AuthLayout from './components/AuthLayout';
import svg from '../../assets/svg';
import regex from '../../services/regex';
import { MdEmail } from 'react-icons/md';
import { CgSpinner } from 'react-icons/cg';
import { userAuth } from '../../services/api';
import Alerts from '../../components/Alerts';
import ErrorMessage from '../../components/Alerts/ErrorMessage';

const { email: EMAIL_REGEX } = regex;

const ForgotPassword = () => {
  const [fields, setFields] = useState({});
  const [alerts, setAlerts] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [failMessage, setFailMessage] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(fields.email));
  }, [fields.email]);

  function handleChange(e) {
    e.preventDefault();
    setFields({
      ...fields,
      [e.target.getAttribute('name')]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    await userAuth
      .post('/reset-password', fields, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setAlerts(true);
        setIsLoading(false);
      })
      .catch((e) => {
        setAlertFail(true);
        setFailMessage(e.response.data.message);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setTimeout(() => {
      if (alerts || alertFail === true) setAlertFail(false) || setAlerts(false);
    }, 5000);
  }, [alertFail, alerts]);

  return (
    <>
      <AuthLayout
        images={svg.loginPage}
        altImages="woman-and-password-laptop"
      >
        {alerts && (
          <Alerts
            state="true"
            background="bg-green-100"
            textColor="text-green-600"
            textContent="Email telah dikirim! Silahkan reset password anda"
          />
        )}
        {alertFail && (
          <Alerts
            state="true"
            background="bg-red-100"
            textColor="text-red-600"
            textContent={`${failMessage}`}
            closeButton="true"
          />
        )}
        <div className="w-full p-6 xs:p-12 2md:p-0 rounded-2xl shadow-[0_4px_20px_0_#00000029] 2md:shadow-none">
          <h3 className="mb-2">Lupa Kata Sandi</h3>
          <p className="mb-7">
            Kami akan mengirim link ke email Anda untuk mengubah kata sandi
          </p>
          <form
            className="flex flex-col"
            onSubmit={handleSubmit}
          >
            <div className="relative w-full flex flex-col mb-6">
              <input
                type="email"
                placeholder="Email"
                name="email"
                required
                autoComplete="on"
                onChange={handleChange}
                className={`input-field ${
                  fields.email && !validEmail && 'field-error'
                }`}
                aria-invalid={validEmail ? 'false' : 'true'}
                aria-describedby="emailField"
              />
              <MdEmail className="absolute text-xl top-4 left-4 fill-secondary-800" />
              {fields.email && !validEmail && (
                <ErrorMessage
                  referenceId="emailField"
                  message="Mohon masukkan email dengan benar."
                  isPasswordField={false}
                />
              )}
            </div>
            <button
              className={`button-fill transition-200 flex items-center justify-center ${
                isLoading ? '!bg-primary-600' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <CgSpinner className="animate-spin text-xl mr-2 icon-white" />
                  Kirim Email
                </>
              ) : (
                <>Kirim Email</>
              )}
            </button>
          </form>
        </div>
      </AuthLayout>
    </>
  );
};

export default ForgotPassword;
