import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function sendConfirmationEmailDev(email) {
    try {
        // Détails du transporteur
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_EMAIL, 
                pass: process.env.GMAIL_PASSWORD,  // Utilisez un mot de passe d'application si l'authentification 2FA est activée
            }
        });

        // Options de l'email
        
        const mailOptions = {
            from: process.env.GMAIL_EMAIL,   // Email de l'expéditeur
            to: email,  // Email du destinataire
            subject: 'Confirmation Email',  // Sujet de l'email
            html: `<!DOCTYPE html>
            <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="fr">
            
            <head>
                <title></title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
                <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet" type="text/css"><!--<![endif]-->
                <style>
                    * {
                        box-sizing: border-box;
                    }
            
                    body {
                        margin: 0;
                        padding: 0;
                    }
            
                    a[x-apple-data-detectors] {
                        color: inherit !important;
                        text-decoration: inherit !important;
                    }
            
                    #MessageViewBody a {
                        color: inherit;
                        text-decoration: none;
                    }
            
                    p {
                        line-height: inherit
                    }
            
                    .desktop_hide,
                    .desktop_hide table {
                        mso-hide: all;
                        display: none;
                        max-height: 0px;
                        overflow: hidden;
                    }
            
                    .image_block img+div {
                        display: none;
                    }
            
                    sup,
                    sub {
                        font-size: 75%;
                        line-height: 0;
                    }
            
                    @media (max-width:700px) {
                        .desktop_hide table.icons-outer {
                            display: inline-table !important;
                        }
            
                        .social_block.desktop_hide .social-table {
                            display: inline-block !important;
                        }
            
                        .image_block div.fullWidth {
                            max-width: 100% !important;
                        }
            
                        .mobile_hide {
                            display: none;
                        }
            
                        .row-content {
                            width: 100% !important;
                        }
            
                        .stack .column {
                            width: 100%;
                            display: block;
                        }
            
                        .mobile_hide {
                            min-height: 0;
                            max-height: 0;
                            max-width: 0;
                            overflow: hidden;
                            font-size: 0px;
                        }
            
                        .desktop_hide,
                        .desktop_hide table {
                            display: table !important;
                            max-height: none !important;
                        }
                    }
                </style><!--[if mso ]><style>sup, sub { font-size: 100% !important; } sup { mso-text-raise:10% } sub { mso-text-raise:-10% }</style> <![endif]-->
            </head>
            
            <body class="body" style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
                <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
                    <tbody>
                        <tr>
                            <td>
                                <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fffaf7; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/6786/bg_pet.png'); background-position: top center; background-repeat: repeat;">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-bottom: 1px solid transparent; border-left: 1px solid transparent; border-right: 1px solid transparent; border-top: 1px solid transparent; color: #000000; width: 680px; margin: 0 auto;" width="680">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column column-1" width="16.666666666666668%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                <div class="spacer_block block-1" style="height:1px;line-height:1px;font-size:1px;">&#8202;</div>
                                                            </td>
                                                            <td class="column column-2" width="66.66666666666667%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                <div class="spacer_block block-1" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
                                                                <table class="icons_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center; line-height: 0;">
                                                                    <tr>
                                                                        <td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; text-align: center;">
                                                                            <table class="icons-outer" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-table;">
                                                                                <tr>
                                                                                    <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 5px;"><img class="icon" src="https://d15k2d11r6t6rl.cloudfront.net/pub/bfra/i8tzhiib/kp3/yda/fpl/logo_name.png" alt="company logo" height="auto" width="238" align="center" style="display: block; height: auto; margin: 0 auto; border: 0;"></td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <div class="spacer_block block-3" style="height:15px;line-height:15px;font-size:1px;">&#8202;</div>
                                                                <table class="heading_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad" style="text-align:center;width:100%;">
                                                                            <h1 style="margin: 0; color: #011627; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 42px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 50.4px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Merci pour votre inscription !</span></h1>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="button_block block-5" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad">
                                                                            <div class="alignment" align="center"><a href="www.example.com" target="_blank" style="color:#ffffff;"><!--[if mso]>
            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="www.example.com"  style="height:38px;width:248px;v-text-anchor:middle;" arcsize="0%" fillcolor="#f67d22">
            <v:stroke dashstyle="Solid" weight="1px" color="#011627"/>
            <w:anchorlock/>
            <v:textbox inset="0px,0px,0px,5px">
            <center dir="false" style="color:#ffffff;font-family:sans-serif;font-size:16px">
            <![endif]-->
                                                                                    <div style="background-color:#f67d22;border-bottom:1px solid #011627;border-left:1px solid #011627;border-radius:0px;border-right:1px solid #011627;border-top:1px solid #011627;color:#ffffff;display:inline-block;font-family:Source Sans Pro, Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:400;mso-border-alt:none;padding-bottom:5px;padding-top:0px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;"><span style="word-break: break-word; padding-left: 30px; padding-right: 30px; font-size: 16px; display: inline-block; letter-spacing: normal;"><span style="word-break: break-word; line-height: 32px;">CONFIRMER VOTRE COMPTE</span></span></div><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                                </a></div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            <div class="spacer_block block-6" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
                                                                <table class="image_block block-7" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                                                            <div class="alignment" align="center" style="line-height:10px">
                                                                                <div class="fullWidth" style="max-width: 361.6px;"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/6786/dog_with_banana.png" style="display: block; height: auto; border: 0; width: 100%;" width="361.6" alt="Dog wearing jacket" title="Dog wearing jacket" height="auto"></div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                           </td>
                                                            <td class="column column-3" width="16.666666666666668%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                <div class="spacer_block block-1" style="height:1px;line-height:1px;font-size:1px;">&#8202;</div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #005247;">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px; margin: 0 auto;" width="680">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column column-1" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                <table class="icons_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: left; line-height: 0;">
                                                                    <tr>
                                                                        <td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; text-align: left;">
                                                                            <table class="icons-outer" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-table;">
                                                                                <tr>
                                                                                    <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 5px;"><img class="icon" src="https://d15k2d11r6t6rl.cloudfront.net/pub/bfra/i8tzhiib/kp3/yda/fpl/logo_name.png" alt="company logo" height="auto" width="238" align="center" style="display: block; height: auto; margin: 0 auto; border: 0;"></td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="paragraph_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad">
                                                                            <div style="color:#ffffff;font-family:Source Sans Pro, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:200%;text-align:left;mso-line-height-alt:28px;">
                                                                                <p style="margin: 0; word-break: break-word;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit,&nbsp;</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td class="column column-2" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad" style="padding-left:20px;text-align:center;width:100%;">
                                                                            <h1 style="margin: 0; color: #ffffff; direction: ltr; font-family: Source Sans Pro, Tahoma, Verdana, Segoe, sans-serif; font-size: 18px; font-weight: normal; line-height: 200%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 36px;"><strong>Links</strong></h1>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                                                            <div style="color:#a9a9a9;font-family:Source Sans Pro, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
                                                                                <p style="margin: 0; word-break: break-word;"><a href="http://www.example.com" target="_blank" style="text-decoration: none; color: #ffffff;" rel="noopener">Book time</a></p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                                                            <div style="color:#a9a9a9;font-family:Source Sans Pro, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
                                                                                <p style="margin: 0; word-break: break-word;"><a href="http://www.example.com" target="_blank" style="text-decoration: none; color: #ffffff;" rel="noopener">Daycare</a></p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="paragraph_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                                                            <div style="color:#a9a9a9;font-family:Source Sans Pro, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
                                                                                <p style="margin: 0; word-break: break-word;"><a href="http://www.example.com" target="_blank" style="text-decoration: none; color: #ffffff;" rel="noopener">Pet toys</a></p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="paragraph_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                                                            <div style="color:#a9a9a9;font-family:Source Sans Pro, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
                                                                                <p style="margin: 0; word-break: break-word;"><a href="http://www.example.com" target="_blank" style="text-decoration: none; color: #ffffff;" rel="noopener">Unsubscribe</a></p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td class="column column-3" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad" style="padding-left:20px;text-align:center;width:100%;">
                                                                            <h1 style="margin: 0; color: #ffffff; direction: ltr; font-family: Source Sans Pro, Tahoma, Verdana, Segoe, sans-serif; font-size: 18px; font-weight: normal; line-height: 200%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 36px;"><strong>Contact</strong></h1>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                                                            <div style="color:#a9a9a9;font-family:Source Sans Pro, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
                                                                                <p style="margin: 0; word-break: break-word;"><a href="http://www.example.com" target="_blank" style="text-decoration: none; color: #ffffff;" rel="noopener">Info@company.com</a></p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                                                            <div style="color:#a9a9a9;font-family:Source Sans Pro, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
                                                                                <p style="margin: 0; word-break: break-word;"><a href="http://www.example.com" target="_blank" style="text-decoration: none; color: #ffffff;" rel="noopener">Help Center</a></p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="social_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:10px;padding-top:10px;text-align:left;">
                                                                            <div class="alignment" align="left">
                                                                                <table class="social-table" width="144px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
                                                                                    <tr>
                                                                                        <td style="padding:0 4px 0 0;"><a href="https://www.facebook.com" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/facebook@2x.png" width="32" height="auto" alt="Facebook" title="facebook" style="display: block; height: auto; border: 0;"></a></td>
                                                                                        <td style="padding:0 4px 0 0;"><a href="https://www.twitter.com" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/twitter@2x.png" width="32" height="auto" alt="Twitter" title="twitter" style="display: block; height: auto; border: 0;"></a></td>
                                                                                        <td style="padding:0 4px 0 0;"><a href="https://www.linkedin.com" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/linkedin@2x.png" width="32" height="auto" alt="Linkedin" title="linkedin" style="display: block; height: auto; border: 0;"></a></td>
                                                                                        <td style="padding:0 4px 0 0;"><a href="https://www.instagram.com" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/instagram@2x.png" width="32" height="auto" alt="Instagram" title="instagram" style="display: block; height: auto; border: 0;"></a></td>
                                                                                    </tr>
                                                                                </table>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px; margin: 0 auto;" width="680">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                <table class="empty_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad">
                                                                            <div></div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table><!-- End -->
            </body>
            
            </html>`
        }
        

        // Envoi de l'email et résultats
        const info = await transporter.sendMail(mailOptions);
        console.log('Email envoyé:', info.response);  // Affichage de la réponse

        // Résultat de l'envoi
        return { success: true, message: 'Email envoyé avec succès' };
    } catch (error) {
        console.error("Erreur lors de l'envoi du mail:", error);  // Gestion des erreurs
        console.error("Détails de l'erreur:", error.response);  // Détails supplémentaires de l'erreur
        return { success: false, message: `Erreur: ${error.message}` };
    }
}

export { sendConfirmationEmailDev };