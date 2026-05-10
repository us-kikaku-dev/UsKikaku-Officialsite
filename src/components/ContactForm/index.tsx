import { useForm } from 'react-hook-form';
import { ContactFormInputs } from './types';
import { ContactFormStyles } from './styles';
import { StepIndicator } from './StepIndicator';
import { Step1Input } from './Step1Input';
import { Step2Confirm } from './Step2Confirm';
import { Step3Complete } from './Step3Complete';
import { useContactSubmit } from './useContactSubmit';

export const ContactForm = () => {
    const {
        register,
        watch,
        trigger,
        getValues,
        formState: { errors }
    } = useForm<ContactFormInputs>({
        mode: 'onBlur',
        // defaultValues removed to enforce validation
    });

    const inquiryType = watch('inquiryType');

    const {
        step,
        isSending,
        sendError,
        recaptchaToken,
        setRecaptchaToken,
        recaptchaRef,
        handleConfirm,
        handleBack,
        handleFinalSubmit,
    } = useContactSubmit({ getValues, trigger });

    return (
        <div className="w-full max-w-2xl mx-auto" style={{ paddingTop: '0', paddingBottom: '160px' }}>
            {/* Step Indicator */}
            <StepIndicator step={step} />

            {/* Global Styles for Contact Form - Restored */}
            <ContactFormStyles />

            {/* Error Message */}
            {sendError && (
                <div className="mb-8 p-4 bg-red-50 text-red-600 text-sm tracking-wide">
                    {sendError}
                </div>
            )}

            {/* --- STEP 1: INPUT --- */}
            {step === 1 && (
                <Step1Input
                    register={register}
                    errors={errors}
                    inquiryType={inquiryType}
                    onConfirm={handleConfirm}
                />
            )}

            {/* --- STEP 2: CONFIRM --- */}
            {step === 2 && (
                <Step2Confirm
                    getValues={getValues}
                    inquiryType={inquiryType}
                    recaptchaRef={recaptchaRef}
                    recaptchaToken={recaptchaToken}
                    setRecaptchaToken={setRecaptchaToken}
                    isSending={isSending}
                    onBack={handleBack}
                    onFinalSubmit={handleFinalSubmit}
                />
            )}

            {/* --- STEP 3: COMPLETE --- */}
            {step === 3 && <Step3Complete />}

        </div>
    );
};
