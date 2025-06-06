"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REASON_TEXT = exports.DIRECTORY_DENIAL_EMAIL = exports.SIGN_OFF_HTML = exports.RECIPIENT_TEXT = exports.DIRECTORY_APPROVAL_EMAIL = void 0;
const RECIPIENT_TEXT = "[Recipient]";
exports.RECIPIENT_TEXT = RECIPIENT_TEXT;
const REASON_TEXT = "[Reason]";
exports.REASON_TEXT = REASON_TEXT;
const SIGN_OFF_HTML = `
<p style="margin-bottom: 20px;"> <strong> This is an automated email. Please do not reply to this email. For any inquiries contact us at <a href="mailto:info@splagen.org" style="color: blue;">info@splagen.org</a> </strong> </p>

<p style="margin-bottom: 20px;"> Sincerely, </p>

<p style="margin-bottom: 20px;"> The Latin American Professional Society for Genetic Counseling (SPLAGen) </p>

<p style="font-size: 10px;">
   <strong>Latin American Professional Society of Genetic Counseling</strong><br>
   Sociedad Profesional Latinoamericana de Asesoramiento Genético<br>
   Sociedade Profissional Latino-americana de Aconselhamento Genético<br>
   <a href="https://www.splagen.org/" style="color: blue;">https://www.splagen.org</a> | 
   <a href="mailto:info@splagen.org" style="color: blue;">info@splagen.org</a>
</p>
<img src="cid:splagen_logo.png" alt="SPLAGen Logo" width="120" height="120" />`;
exports.SIGN_OFF_HTML = SIGN_OFF_HTML;
const DIRECTORY_APPROVAL_EMAIL = `
<p style="margin-bottom: 20px;">Dear [Recipient],</p> 

<p style="margin-bottom: 20px;"> We are delighted to inform you that you have been added to the Latin American Professional Society for Genetic Counseling (SPLAGen) directory. </p>

<p style="margin-bottom: 20px;"> You can view the information posted in our directory here: <a href="https://www.splagen.org/en/en/directory">https://www.splagen.org/en/en/directory</a> </p>

<p style="margin-bottom: 20px;"> Your information for the directory can always be edited by going to the membership portal and clicking your profile picture in the top right corner. </p>

<p style="margin-bottom: 20px;"> If you have any questions, please don't hesitate to contact us at <a href="mailto:info@splagen.org" style="color: blue;">info@splagen.org</a>. </p>

<p style="margin-bottom: 20px;"> We look forward to your active participation in SPLAGen!</p>
`;
exports.DIRECTORY_APPROVAL_EMAIL = DIRECTORY_APPROVAL_EMAIL;
const DIRECTORY_DENIAL_EMAIL = `
<p style="margin-bottom: 20px;">Dear [Recipient],</p>

<p style="margin-bottom: 20px;">Thank you for your interest in joining the Latin American Professional Society for Genetic Counseling (SPLAGen) directory. We appreciate you taking the time to apply.</p>

<p style="margin-bottom: 20px;">After careful review of your application, we regret to inform you that we are unable to offer you membership at this time due to the following reason: </p>

<p style="margin-bottom: 20px;">[Reason]</p>

<p style="margin-bottom: 20px;">If you believe there has been a misunderstanding or if you have questions about the application process, please don't hesitate to contact us at <a href="mailto:info@splagen.org" style="color: blue;">info@splagen.org</a>.</p>

<p style="margin-bottom: 20px;">We appreciate your understanding and we look forward to your active participation in SPLAGen! </p>
`;
exports.DIRECTORY_DENIAL_EMAIL = DIRECTORY_DENIAL_EMAIL;
