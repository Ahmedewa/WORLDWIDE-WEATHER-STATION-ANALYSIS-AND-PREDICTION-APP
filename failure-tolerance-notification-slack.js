
   FAILURE TOLERANCE -NOTIFICATION[via 'SLACK']

#### **User Notification Systems**
- Use **PagerDuty**, **Slack**, or email for alerts.
-  with **Slack**:
   ```javascript
   const { WebClient } = require("@slack/web-api");
   const slack = new WebClient("SLACK_API_TOKEN");

   await slack.chat.postMessage({
       channel: "#alerts",
       text: "High error rate detected on API /login",
   });
   ```

