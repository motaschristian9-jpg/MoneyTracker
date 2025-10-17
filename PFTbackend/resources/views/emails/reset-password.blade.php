<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        /* Reset styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', 'Helvetica', Arial, sans-serif;
            background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
            min-height: 100vh;
            padding: 60px 20px;
            position: relative;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            position: relative;
        }

        /* Elegant card with subtle depth */
        .email-card {
            position: relative;
            background: #ffffff;
            border-radius: 24px;
            border: 1px solid #e2e8f0;
            box-shadow:
                0 20px 50px rgba(0, 0, 0, 0.08),
                0 1px 3px rgba(0, 0, 0, 0.05);
            padding: 60px 50px;
            overflow: hidden;
        }

        /* Subtle top accent line */
        .email-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #10B981, #34D399, #10B981);
        }

        /* Header */
        .header {
            text-align: center;
            margin-bottom: 48px;
            padding-bottom: 32px;
            border-bottom: 1px solid #e2e8f0;
        }

        .logo-text {
            color: #10B981;
            font-size: 32px;
            font-weight: 800;
            margin: 0;
            letter-spacing: -0.5px;
        }

        /* Content section */
        .content {
            padding: 0 10px;
        }

        .title {
            color: #0f172a;
            font-size: 28px;
            font-weight: 700;
            margin: 0 0 16px 0;
            text-align: center;
            letter-spacing: -0.5px;
        }

        .subtitle {
            color: #475569;
            font-size: 16px;
            font-weight: 400;
            margin: 0 0 40px 0;
            text-align: center;
            line-height: 1.7;
        }

        /* Reset button - elegant and prominent */
        .reset-button-container {
            text-align: center;
            margin: 48px 0;
        }

        .reset-button {
            display: inline-block;
            position: relative;
            background: linear-gradient(135deg, #10B981 0%, #059669 100%);
            color: #ffffff;
            text-decoration: none;
            padding: 18px 48px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            letter-spacing: 0.3px;
            box-shadow:
                0 4px 6px rgba(0, 0, 0, 0.07),
                0 10px 30px rgba(16, 185, 129, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        /* Security notice - clean and informative */
        .security-notice {
            background: #eff6ff;
            border-left: 3px solid #3B82F6;
            padding: 20px 24px;
            margin: 40px 0;
            border-radius: 0 8px 8px 0;
        }

        .security-notice p {
            color: #1e40af;
            font-size: 14px;
            margin: 0;
            line-height: 1.7;
        }

        .security-notice strong {
            color: #1e3a8a;
            font-weight: 600;
        }

        /* Fallback URL section */
        .fallback-section {
            background: #f1f5f9;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 28px;
            margin: 40px 0;
            text-align: center;
        }

        .fallback-text {
            color: #475569;
            font-size: 14px;
            margin-bottom: 16px;
            line-height: 1.6;
        }

        .fallback-url {
            color: #059669;
            text-decoration: none;
            word-break: break-all;
            font-weight: 500;
            padding: 12px 16px;
            background: #d1fae5;
            border-radius: 8px;
            display: inline-block;
            border: 1px solid #a7f3d0;
            font-size: 13px;
        }

        /* Footer - minimal and professional */
        .footer {
            border-top: 1px solid #e2e8f0;
            padding-top: 36px;
            margin-top: 48px;
            text-align: center;
        }

        .footer-text {
            color: #64748b;
            font-size: 13px;
            line-height: 1.8;
            margin: 0;
        }

        .footer-text strong {
            color: #475569;
            font-weight: 600;
        }

        .footer-brand {
            background: linear-gradient(135deg, #10B981, #059669);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 700;
        }

        /* Responsive design */
        @media (max-width: 640px) {
            body {
                padding: 30px 15px;
            }

            .email-card {
                padding: 40px 30px;
                border-radius: 20px;
            }

            .title {
                font-size: 24px;
            }

            .subtitle {
                font-size: 15px;
            }

            .logo-text {
                font-size: 28px;
            }

            .reset-button {
                padding: 16px 40px;
                font-size: 15px;
            }

            .content {
                padding: 0;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="email-card">
            <!-- Header -->
            <div class="header">
                <h1 class="logo-text">MoneyTracker</h1>
            </div>

            <!-- Content -->
            <div class="content">
                <h2 class="title">Reset Your Password</h2>
                <p class="subtitle">
                    You requested a password reset for your MoneyTracker account. Click the button below to create a new
                    password and regain access to your financial dashboard.
                </p>

                <!-- Reset Button -->
                <div class="reset-button-container">
                    <a href="{{ $url }}" class="reset-button" target="_blank">
                        Reset Password
                    </a>
                </div>

                <!-- Security Notice -->
                <div class="security-notice">
                    <p>
                        🔒 <strong>Security Notice:</strong> This link will expire in 60 minutes for your security. If
                        you
                        didn't request this password reset, please ignore this email.
                    </p>
                </div>

                <!-- Fallback URL -->
                <div class="fallback-section">
                    <p class="fallback-text">
                        Button not working? Copy and paste this link into your browser:
                    </p>
                    <a href="{{ $url }}" class="fallback-url">{{ $url }}</a>
                </div>
            </div>

            <!-- Footer -->
            <div class="footer">
                <p class="footer-text">
                    If you have any questions, feel free to contact our support team.<br>
                    Thank you for using <span class="footer-brand">MoneyTracker</span><br><br>
                    <strong>The MoneyTracker Team</strong>
                </p>
            </div>
        </div>
    </div>
</body>

</html>