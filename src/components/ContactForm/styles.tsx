// グローバルスタイル（ContactForm用）
export const ContactFormStyles = () => (
    <style>{`
        .force-btn-style {
            display: inline-block !important;
            border: 1px solid #C5A065 !important;
            padding: 18px 80px !important;
            background-color: transparent !important;
            color: #C5A065 !important;
            font-weight: bold !important;
            font-size: 16px !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            text-align: center !important;
            line-height: normal !important;
            min-width: 200px !important;
        }
        .force-btn-style:hover {
            background-color: #C5A065 !important;
            color: #fff !important;
        }
        .force-label-style {
            font-size: 15px !important;
            font-weight: 700 !important;
            color: #333 !important;
            margin-bottom: 8px !important;
            display: block !important;
            letter-spacing: 0.05em !important;
        }
        .force-input-style {
            background-color: #F7F7F7 !important;
            border: 1px solid #E5E5E5 !important;
            padding: 12px 16px !important;
            border-radius: 4px !important;
            width: 100% !important;
            box-sizing: border-box !important;
            font-size: 16px !important;
            color: #050A14 !important;
            transition: border-color 0.3s ease !important;
        }
        .force-input-style:focus {
            border-color: #C5A065 !important;
            outline: none !important;
        }
        .force-textarea-style {
            resize: vertical !important;
            min-height: 160px !important;
        }
        .force-required-mark {
            color: #E02424 !important;
            font-size: 12px !important;
            margin-left: 8px !important;
            vertical-align: middle !important;
            font-weight: normal !important;
        }
        .force-error-message {
            color: #E02424 !important;
            font-size: 13px !important;
            margin-top: 8px !important;
            font-weight: normal !important;
            display: block !important;
        }
        .force-btn-secondary {
            display: inline-block !important;
            border: 1px solid #E5E5E5 !important;
            padding: 18px 0 !important; /* Fixed width via width prop or min-width */
            background-color: transparent !important;
            color: #888 !important;
            font-size: 14px !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            text-align: center !important;
            text-decoration: none !important;
            min-width: 200px !important;
        }
        .force-btn-secondary:hover {
            border-color: #050A14 !important;
            color: #050A14 !important;
        }
        .force-link-btn-style {
            display: inline-block !important;
            border: 1px solid #C5A065 !important;
            color: #C5A065 !important;
            padding: 18px 80px !important;
            background: transparent !important;
            font-weight: bold !important;
            text-decoration: none !important;
            transition: all 0.3s ease !important;
            font-size: 16px !important;
        }
        .force-link-btn-style:hover {
            background-color: #C5A065 !important;
            color: #fff !important;
        }
    `}</style>
);
