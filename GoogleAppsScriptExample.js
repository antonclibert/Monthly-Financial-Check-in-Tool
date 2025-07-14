
/**
 * Example Google Apps Script function to create an email with a personalized setup link
 * This is just a demonstration - adjust according to your actual implementation
 */
function sendReminderSetupEmail() {
  // Example data - replace with your actual data source
  const recipient = "client@example.com";
  const clientName = "John Smith";
  const clientBirthDate = new Date(1980, 0, 15); // January 15, 1980
  
  // Format the birth date as YYYY-MM-DD for the URL parameter
  const birthDateFormatted = formatDateForURL(clientBirthDate);
  
  // Your Lovable app URL - replace with your actual deployed URL
  const baseUrl = "https://yourapp.lovable.app/setup-reminder"; 
  
  // Create the URL with only the birthDate parameter
  const setupUrl = `${baseUrl}?birthDate=${birthDateFormatted}`;
  
  // Create email content with the button and embedded script
  const htmlBody = `
    <p>Hello ${clientName},</p>
    <p>We'd like to help you set up your monthly financial check-in reminders.</p>
    <p>Click the button below to get started - we've pre-filled your information to make it quick and easy.</p>
    <table cellspacing="0" cellpadding="0">
      <tr>
        <td style="border-radius: 4px; background: #4f46e5;">
          <a href="${setupUrl}" 
             style="padding: 12px 24px; color: #ffffff; text-decoration: none; display: inline-block; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold;" 
             target="_blank">
             Set Up My Reminders
          </a>
        </td>
      </tr>
    </table>
    <p>If the button doesn't work, copy and paste this link into your browser:</p>
    <p>${setupUrl}</p>
    
    <!-- Add iframe embedding option with postMessage support -->
    <p>Or use our embedded setup tool:</p>
    <iframe id="setupFrame" src="${baseUrl}" width="100%" height="600" frameborder="0"></iframe>
    <script>
      // Send birth date to the embedded iframe after it loads
      document.getElementById('setupFrame').onload = function() {
        const birthDateData = {
          type: 'SETUP_DATA',
          birthDate: '${birthDateFormatted}'
        };
        document.getElementById('setupFrame').contentWindow.postMessage(
          birthDateData,
          '*' // In production, specify exact target origin for security
        );
      };
    </script>
  `;
  
  // Send the email
  MailApp.sendEmail({
    to: recipient,
    subject: "Set up your monthly financial check-in reminders",
    htmlBody: htmlBody
  });
}

/**
 * Helper function to format a date as YYYY-MM-DD
 */
function formatDateForURL(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
