const nodemailer = require("nodemailer");

const correoDeBienvenida = async (Email) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "arcadeworld2023@gmail.com",
                pass: "aqemmhzlcloqjixq",
            },
        });
    
        const mailOptions = {
        from: "arcadeworld2023@gmail.com",
        to: Email,
        subject: "WELCOME TO ARCADE WORLD",
        html: `<!DOCTYPE html>
<html>
<head>
    <title>Welcome to Arcade World: Your Destination to Buy Games</title>
</head>
<body>
    <table width="100%" bgcolor="#2a2a2a">
        <tr>
            <td>
                <table align="center" width="600" style="background-color: #1c1c1c; padding: 30px; margin-top: 20px; margin-bottom: 20px; border-radius: 10px; text-align: center;">
                    <tr>
                        <td>
                            <img src="https://tuurl.com/logo_VG.png" alt="Arcade World Logo" width="200">
                            <h1 style="color: #ffffff; font-family: Arial, sans-serif; font-size: 28px; margin-top: 20px;">Welcome to Arcade World!</h1>
                            <p style="color: #ffffff; font-family: Arial, sans-serif; font-size: 20px;">Your destination to shop and explore the thrilling world of video games.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p style="color: #ffffff; font-family: Arial, sans-serif; font-size: 20px;">In Arcade World, you are about to embark on an exciting journey through a vast world of video games.</p>
                            <p style="color: #ffffff; font-family: Arial, sans-serif; font-size: 20px;">As a member of our community, you will enjoy the following benefits:</p>
                            <ul style="color: #ffffff; font-family: Arial, sans-serif; font-size: 20px; margin-left: 20px;">
                                <li>Access to a wide selection of games for all platforms: PC, consoles, and mobile devices.</li>
                                <li>Special offers and exclusive discounts for our members.</li>
                                <li>Regular updates on the latest game releases and reviews.</li>
                                <li>The opportunity to be part of a community of passionate gamers.</li>
                            </ul>
                            <p style="color: #ffffff; font-family: Arial, sans-serif; font-size: 20px;">We welcome you aboard Arcade World! We hope you enjoy your experience on our platform and find the games that you are most passionate about.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p style="color: #ffffff; font-family: Arial, sans-serif; font-size: 20px;">If you need assistance or have any questions, our support team will be happy to help you at all times.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>

        `,
        };
    
        const response = await transporter.sendMail(mailOptions);
        return response.accepted[0] === Email
    } catch (error) {
        return false;
    }
}

const correoDeBaneo = async (Email) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "arcadeworld2023@gmail.com",
                pass: "aqemmhzlcloqjixq",
            },
        });
    
        const mailOptions = {
            from: "arcadeworld2023@gmail.com",
            to: Email,
            subject: "aviso de violacion de las normas de la comunidad",
            html: `<!DOCTYPE html>
<html>
<head>
    <title>Arcade World: Account Banned Notification</title>
</head>
<body>
    <table width="100%" bgcolor="#2a2a2a">
        <tr>
            <td>
                <table align="center" width="600" style="background-color: #1c1c1c; padding: 30px; margin-top: 20px; margin-bottom: 20px; border-radius: 10px; text-align: center;">
                    <tr>
                        <td>
                            <img src="https://tuurl.com/logo_VG.png" alt="Arcade World Logo" width="200">
                            <h1 style="color: #ffffff; font-family: Arial, sans-serif; font-size: 28px; margin-top: 20px;">Arcade World Account Banned</h1>
                            <p style="color: #ffffff; font-family: Arial, sans-serif; font-size: 20px;">We regret to inform you that your account has been banned from Arcade World.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p style="color: #ffffff; font-family: Arial, sans-serif; font-size: 20px;">Our decision is based on a violation of community rules and guidelines. Unfortunately, your access to our platform has been restricted.</p>
                            <p style="color: #ffffff; font-family: Arial, sans-serif; font-size: 20px;">If you believe this is an error or would like to appeal the decision, please contact our support team for further assistance.</p>
                            <p style="color: #ffffff; font-family: Arial, sans-serif; font-size: 20px;">Thank you for your understanding.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p style="color: #ffffff; font-family: Arial, sans-serif; font-size: 20px;">If you have any questions, our support team is available to assist you.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
            `,
        };

        const response = await transporter.sendMail(mailOptions);
        return response.accepted[0] === Email
    } catch (error) {
        return false
    }

}

const correoDeDesbaneo = async (Email) => {
    try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "arcadeworld2023@gmail.com",
            pass: "aqemmhzlcloqjixq",
          },
        });
        
        const mailOptions = {
          from: "arcadeworld2023@gmail.com",
          to: Email,
          subject: "Congratulations, your account has been unbanned",
          html: `<!DOCTYPE html>
<html>
<head>
    <title>Arcade World Unban Notification</title>
</head>
<body>
    <table width="100%" bgcolor="#2a2a2a">
        <tr>
            <td>
                <table align="center" width="600" style="background-color: #1c1c1c; padding: 30px; margin-top: 20px; margin-bottom: 20px; border-radius: 10px; text-align: center;">
                    <tr>
                        <td>
                            <img src="https://tuurl.com/logo_VG.png" alt="Arcade World Logo" width="200">
                            <h1 style="color: #ffffff; font-family: Arial, sans-serif; font-size: 28px; margin-top: 20px;">Arcade World Unban Notification</h1>
                            <p style="color: #ffffff; font-family: Arial, sans-serif; font-size: 20px;">We are delighted to inform you that your account on Arcade World has been unbanned.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p style="color: #ffffff; font-family: Arial, sans-serif; font-size: 20px;">You can now enjoy all the services and features of Arcade World again. However, we remind you that it is essential to respect and comply with the rules of our community.</p>
                            <p style="color: #ffffff; font-family: Arial, sans-serif; font-size: 20px;">Compliance with our rules is crucial to maintaining a safe and pleasant environment for all our members.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p style="color: #ffffff; font-family: Arial, sans-serif; font-size: 20px;">Thank you for being part of the Arcade World community, and we encourage you to enjoy video games and share your passion with other platform members.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>

          `,
        };

        const response = await transporter.sendMail(mailOptions);
        return response.accepted[0] === Email
    } catch (error) {
        return false
    }

}



const correoDeCambioDeContraseña = async (Email) => {
    try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "arcadeworld2023@gmail.com",
            pass: "aqemmhzlcloqjixq",
          },
        });
        
        const mailOptions = {
          from: "arcadeworld2023@gmail.com",
          to: Email,
          subject: "Request to change password",
          html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Password Change in ARCADE WORLD</title>
    <style>
        body {
            background-color: #171a21;
            font-family: Arial, Helvetica, sans-serif;
            color: #ffffff;
            text-align: center;
        }

        .container {
            width: 700px;
            margin: 0 auto;
            background: #1e222e;
            border: 5px solid #171a21;
            border-radius: 20px;
            padding: 20px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        }

        .logo {
            width: 150px;
            height: 150px;
            margin: 0 auto;
        }

        h1 {
            font-size: 36px;
            text-transform: uppercase;
        }

        p {
            font-size: 20px;
            line-height: 1.4;
        }

        .button-container {
            margin-top: 30px;
        }

        .button {
            display: inline-block;
            padding: 15px 40px;
            background: #2e86de;
            color: #ffffff;
            font-size: 24px;
            text-decoration: none;
            border: none;
            border-radius: 8px;
            transition: background-color 0.3s, color 0.3s;
        }

        .button:hover {
            background: #1f65b1;
        }

        .footer {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <img class="logo" src="https://your-game-image-url.png" alt="ARCADE WORLD Logo">
        <h1>Password Change in ARCADE WORLD</h1>
      
        <p>We have received a request to change your password in ARCADE WORLD. If you did not initiate this change, we recommend contacting our support team immediately.</p>
        <p>If you are the one who requested the change, you can do so by following the link below:</p>
        <div class="button-container">
            <a class="button" href="https://www.arcadeworld.com/change-password" target="_blank">Change Password</a>
        </div>
    </div>
    <div class="footer">
        &copy; Development Team of <a href="https://www.arcadeworld.com" target="_blank">ARCADE WORLD</a>
    </div>
</body>
</html>

        
          `,
        };

        const response = await transporter.sendMail(mailOptions);
        return response.accepted[0] === Email
    } catch (error) {
        return false
    }
}

module.exports = {
    correoDeBienvenida, 
    correoDeBaneo,
    correoDeDesbaneo,
    correoDeCambioDeContraseña
}
